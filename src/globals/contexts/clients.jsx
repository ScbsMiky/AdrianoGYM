import Moment from "../../libs/moment";

class ClientManager {
  constructor( ) {
    /** @type {{ [key: string]: ClientManager.Client }} */
    this.clients = { };
  };

  getClient(id) {
    return this.clients[id] ? new ClientManager.clients(this.clients[id]) : undefined;
  };

  fetchClients( ) {
    return new Promise((resolve, reject) => {
      let local = localStorage.getItem("users") || "{ }";

      this.clients = JSON.parse(local);

      local = undefined;

      resolve(this.clients);
    });
  };
};

ClientManager.Client = class Client {
  constructor(data) {
    this.id = data.id || "";
    this.cpf = data.cpf || "";
    this.name = data.name || "";
    this.email = data.email || "";
    this.phone = data.phone || "";
    this.address = data.address || "";

    /** @type {{ value: number, date: string, status: boolean }[ ]} */
    this.payments = data.payments || [ ];
  };

  hasPayment(date) {
    return !!this.getPayment(date);
  };

  getPayment(date) {
    date = (date instanceof Date) ? date.toISOString( ) : date;

    return this.payments.find((payment) => payment.date == date);
  };

  addPayment({ value, date, status } = { }) {
    if(this.hasPayment(date)) {
      return {
        error: "Já existe um pagamento existente na date " + (date)
      };
    };

    this.payments.push({
      date,
      value,
      status
    });

    this.save( );

    return {
      message: "Pagamento adicionado com sucesso"
    };
  };

  editPayment({ oldDate, value, date, status } = { }) {
    let payment = this.getPayment(oldDate);

    if(!payment) {
      return {
        error: "Não existe nenhum pagamento na data " + (oldDate)
      };
    };

    payment.date = date || payment.date;
    payment.value = value || payment.value;
    payment.status = status || payment.status;

    this.save( );

    return {
      message: "Pagamento editado com sucesso"
    };
  };

  removePayment(date) {
    let payment = this.getPayment(date);

    if(!payment) {
      return {
        error: "Não existe nenhum pagamento na data " + (date)
      };
    };

    let index = this.payments.indexOf(payment);

    this.payments.splice(index, 1);

    this.save( );

    index = undefined;

    return {
      message: "Pagamento removido com sucesso"
    };
  };

  getPaymentsFromDate(start, final) {
    start = new Moment(start);
    final = new Moment(final);

    start.resetTimestamp( );
    final.resetTimestamp( );

    let payments = this.payments.filter((payment) => {
      let date = new Moment(payment.date);
      
      date.resetTimestamp( );

      let has = (date >= start) && (date <= final);

      date = undefined;

      return has;
    });

    start = undefined;
    final = undefined;

    return payments;
  };

  toString( ) {
    return JSON.stringify({
      id: this.id,
      cpf: this.cpf,
      name: this.name,
      email: this.email,
      phone: this.phone,
      address: this.address
    });
  };

  save( ) {
    let local = localStorage.getItem("users") || "{ }";
    local[this.id] = this.toString( );
    localStorage.setItem("users", JSON.stringify(local));
    local = undefined;
  };
};