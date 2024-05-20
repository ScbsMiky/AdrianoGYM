import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomeScreen from "./screens/home";

import { Container, GlobalStyle } from "./globals/styles/styles";
import ClientCreateRouter from "./screens/client/create";
import ClientEditRouter from "./screens/client/edit";
import ClientsViewRouter from "./screens/client/view";
import { useContext, useEffect, useState } from "react";

import Clients, { clients } from "./globals/contexts/clientsContext";

export default function App( ) {
  const [isLoading, setIsLoading] = useState(true);
  const [myClients, setMyClients] = useState(clients);

  const [welcomeMessage, setWelcomeMessage] = useState({
    message: "",
    closed: false
  });
  
  useEffect(( ) => {
    clients.fetchCustumers( )
        .then((custumers) => {
          setMyClients(clients);
        });
  }, [ ]);
  
  if(isLoading) {
    return (
      <Container>
        <GlobalStyle />

        <div class="main-loading"></div>
      </Container>
    );
  };

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
