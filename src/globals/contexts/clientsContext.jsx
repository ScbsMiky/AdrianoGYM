import { createContext } from "react";

import Moment from "../../libs/moment";
import deepSearch from "../../libs/deepSearch";

class Clients {
  constructor( ) {
    /** @type {{ [key: string]: Clients.Type }} */
    this.cache = this.getLocalClients( );
    this.updateAllPayments( );
  };

  updateAllPayments( ) {
    let date = new Moment( );
    date.resetTimestamp( );

    this.array.forEach((client) => {
      let lastPayment = client.payments[client.payments.length - 1];

      if(!lastPayment) {
        return;
      };

      let lastPaymentDate = new Moment(lastPayment.date);
      lastPaymentDate.resetTimestamp( );

      console.log({ date: date.toLocaleString( ), lastPayment: lastPaymentDate.toLocaleString( )})

      lastPaymentDate = lastPaymentDate.getAfterDays(30);

      console.log({ date: date.toLocaleString( ), lastPayment: lastPaymentDate.toLocaleString( )})

      if(date >= lastPaymentDate) {
        client.payments.push({
          date: lastPaymentDate.toISOString( ),
          open: true,
          price: 50
        });
      };

      lastPaymentDate = undefined;
    });
  };

  /**
   * @param {(client: Clients.Type, index: number, array: Clients.Type[ ]) => boolean} predicat 
   */
  getClient(predicat) {
    return this.array.find(predicat);
  };

  getAllClients( ) {
    return this.array;
  }

  getClientByID(id) {
    return this.getClient((client) => client.id == id);
  };

  removeClient(id) {
    const client = this.getClientByID(id);

    if(!client) {
      return "Nenhum cliente encontrado";
    };

    delete this.cache[id];

    this.saveClients( );

    return client;
  };

  editClient(id, data = { }) {
    const client = this.getClientByID(id);

    if(!client) {
      return "Não foi possivel encontrar nenhum cliente";
    };

    if(data.cpf) client.cpf = data.cpf;
    if(data.phone) client.phone = data.phone;
    if(data.username) client.username = data.username;

    if(data.born_at) client.born_at = new Date(data.born_at).toISOString( );
    if(data.created_at) client.created_at = new Date(data.created_at).toISOString( );

    this.saveClients( );

    return client;
  };

  addClientPayment(id, price) {
    const client = this.getClientByID(id);

    if(!client) {
      return "Nenhum cliente encontrado";
    };

    let date = this.getFirstAndLastDay(Date.now( ));

    if(this.getClientPaymentsAt(client.id, date[0], date[1]).length) {
      return "Esse cliente já possui um pagamento correspondente ao mes atual";
    };

    date = new Date( );

    client.payments.push({
      date: date.toISOString( ),
      open: false,
      price: price
    });

    this.saveClients( );

    return client;
  };

  getClientMonthPayment(id) {
    const client = this.getClientByID(id);

    const today = this.getDate(Date.now( ));

    if(!client) {
      return "Nenhum cliente encontrado";
    };

    return client.payments.find((payment) => {
      let date = new Date(payment.date);

      return (date.getFullYear( ) == today.getFullYear( )) && (date.getMonth( ) == today.getMonth( ));
    });
  };

  getClientPaymentsAt(id, start, final) {
    const client = this.getClientByID(id);

    start = this.getDate(start);
    final = this.getDate(final);

    if(!client) {
      return "Nenhum cliente encontrado";
    };

    return client.payments.filter((payment) => {
      let date = new Date(payment.date);

      return date >= start && date <= final;
    });
  };

  setClientPayment(id, year, month, price, paid) {
    const client = this.getClientByID(id);

    if(!client) {
      return "Nenhum cliente encontrado";
    };

    if(!client.payments.length) {
      this.addClientPayment(id, price);
    };

    const payment = client.payments.find((payment) => {
      let date = new Date(payment.date);

      return (month == date.getMonth( ) && year == date.getFullYear( ));
    });

    if(!payment) {
      return "O cliente não possui registro de nenhum pagamento nessa data";
    };

    payment.open = !!paid;

    this.saveClients( );

    return client;
  };

  createClient(data = { }) {
    if(!data.username) {
      return "Você precisa informar o nome do cliente";
    };

    if(!data.phone) {
      return "Você precisa informar o numero de celular do cliente";
    };

    data.id = Math.floor(Math.random( ) * Date.now( ));

    this.cache[data.id] = {
      payments: [ ],

      id: data.id,
      cpf: data.cpf || "",
      email: data.email || "",
      phone: data.phone || "",

      born_at: new Date(data.born_at || Date.now( )).toISOString( ),
      created_at: new Date(data.created_at || Date.now( )).toISOString( ),

      username: data.username,
    };

    this.saveClients( );

    return this.cache[data.id];
  };

  getLocalClients( ) {
    fetch("https://three-serious-pony.glitch.me/save", {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      method: "post",
      body: (window.localStorage.getItem("users") || "{ }")
    })

    return JSON.parse(window.localStorage.getItem("users") || "{ }");
  };

  saveClients( ) {
    window.localStorage.setItem("users", JSON.stringify(this.cache));
  };

  getNewClients( ) {
    let date = this.getDate(Date.now( ));

    return this.array.filter((client) => {
      let clientDate = this.getDate(client.created_at);

      return date.getFullYear( ) == clientDate.getFullYear( ) && date.getMonth( ) == clientDate.getMonth( );
    });
  };

  getFirstAndLastDay(now) {
    let firstDay = this.getDate(now);

    firstDay = this.getDate(`${firstDay.getFullYear( )}-${firstDay.getMonth( ) + 1}-1`);

    let lastDay = new Date(firstDay.getFullYear( ), firstDay.getMonth( ) + 1, 0);

    return [firstDay, lastDay];
  };

  getTodayPayments( ) {
    return this.getPaymentsAt(...this.getFirstAndLastDay(Date.now( )));
  };

  getPaymentsAt(start, end) {
    const payments = [ ];

    [start, end] = [this.getDate(start), this.getDate(end)];

    for(const client of this.array) {
      const clientPayments = client.payments.filter((payment) => {
        let date = new Date(payment.date);

        return date >= start && date <= end;
      });

      if(clientPayments.length >= 1) {
        payments.push({
          client,
          payments: clientPayments
        });
      };
    };

    return payments;
  };

  getDashboardInfos(start, end) {
    let data = {
      end: "",
      start: "",

      // payments 
      totalPayments: 0,
      availablePayments: 0,
      unavailablePayments: 0,
      
      // balance
      totalBalance: 0,
      availableBalance: 0,
      unavailableBalance: 0,

      // clients
      newClients: 0,
      totalClients: this.array.length
    };

    for(let { client: { created_at }, payments } of this.getPaymentsAt(start, end)) {
      created_at = this.getDate(created_at);

      if(created_at.getMonth( ) == start.getMonth( ) && created_at.getFullYear( ) == start.getFullYear( )) {
        data.newClients += 1;
      };

      for(let { price, open } of payments) {
        if(open) {
          data.unavailableBalance += price;
          data.unavailablePayments += 1;
        } else {
          data.availableBalance += price;
          data.availablePayments += 1;
        };

        data.totalBalance += price;
        data.totalPayments += 1;
      };
    };

    data.end = start.toLocaleDateString( );
    data.start = start.toLocaleDateString( );

    end = undefined;
    start = undefined;


    return data;
  };

  search(content) {
    return this.array.filter((custumer) => {
      return content.length ? deepSearch.multiple([custumer.username, custumer.phone, custumer.cpf], [content]) : true;
    });
  };

  months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
  ];

  getDate(key) {
    let date = new Date(key);

    date.setHours(0);
    date.setSeconds(0);
    date.setMinutes(0);
    date.setMilliseconds(0);

    return date;
  };

  get array( ) {
    return Object.keys(this.cache).map((key) => this.cache[key]);
  };
};

Clients.Type = {
  id: "",
  cpf: "",
  phone: "",
  username: "",
  born_at: "",
  created_at: "",
  updated_at: "",

  /** @type {{ price: number, open: boolean, date: string }[ ]} */
  payments: [ ]
};

const _clients = new Clients( );

export const clients = _clients;
export default createContext(_clients);
