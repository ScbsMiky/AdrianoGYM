import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomeScreen from "./screens/home";

import { Container, GlobalStyle } from "./globals/styles/styles";
import ClientCreateRouter from "./screens/client/create";
import ClientEditRouter from "./screens/client/edit";
import ClientsViewRouter from "./screens/client/view";
import { useContext, useEffect, useState } from "react";

import Clients, { clients } from "./globals/contexts/clientsContext";

function verifyClients(clients) {
  let value = 0;
  let payments = 0;

  let initial = new Date( );

  initial = new Date(initial.getFullYear( ), initial.getMonth( ), initial.getDate( ));

  let debit = clients.filter((client) => {
    let total = client.payments.reduce((total, { price, open, date }) => {
      if(open) {
        total += 1;
        payments += 1;
        value += price;
      };

      return total;
    }, 0);

    return !!total;
  });

  return (
    `Existem <b>${debit.length}</b> clientes em debito` +
    `<br />Existem <b>${payments}</b> contas em aberto` +
    `<br />A divida de seus clientes e de <b>${value.toLocaleString("pt-br", { currency: "brl", style: "currency" })}</b>`
  );
};

export default function App( ) {
  const [myClients] = useState(clients);

  const [welcomeMessage, setWelcomeMessage] = useState({
    message: "",
    closed: false
  });

  useEffect(( ) => {
    setWelcomeMessage({
      message: verifyClients(myClients.array),
      closed: welcomeMessage.closed
    });
  }, [ ]);

  return (
    <Clients.Provider value={myClients}>
      <Container>
        <GlobalStyle />

        {/* <div data-closed={welcomeMessage.closed} className="welcome-back">
          <div>
            <h1>Bem vindo de volta</h1>

            <p dangerouslySetInnerHTML={{ __html: welcomeMessage.message }}></p>

            <div onClick={( ) => setWelcomeMessage({ message: welcomeMessage.message, closed: true })} className="buttons">
              <span>Fechar</span>
            </div>
          </div>
        </div> */}

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/clients" element={<ClientsViewRouter />} />
            <Route path="/register" element={<ClientCreateRouter />} />
            <Route path="/edit-client" element={<ClientEditRouter />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </Clients.Provider>
  );
};