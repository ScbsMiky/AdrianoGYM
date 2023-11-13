import { useNavigate, useSearchParams } from "react-router-dom";
import Frame from "../../../components/frame";
import { useContext, useState } from "react";
import { useEffect } from "react";
import Button from "../../../components/button";
import { Container } from "../edit/payment/styles";
import clientsContext, { clients as lib } from "../../../globals/contexts/clientsContext";

function ClientsViewRouter({ }) {
  const navigator = useNavigate( );

  const clients = useContext(clientsContext);

  const [searchedClients, setSearchedClients] = useState([ ]);
  const [searchContent, setSearchContent] = useState(new URLSearchParams(window.location.search).get("search"));

  useEffect(( ) => {
    setSearchedClients(searchContent ? clients.search(searchContent) : clients.array);
  }, [window.location.search, searchContent]);
  
  return (
    <Frame onHeaderChange={(content) => setSearchedClients(clients.search(content))} title="Clientes" selected="register">
      <div>
        {
        searchedClients.length
          ? <ClientsViewRouter.Clients onClick={(id) => navigator(`/edit-client?id=${id}`)} clients={searchedClients} />
          : <span>Nenhum usuario cadastrado ainda</span>
        }
      </div>

      <div>
        <Button onClick={( ) => navigator("/register")} title="Cadastrar cliente" />
      </div>
    </Frame>
  );
};

ClientsViewRouter.Clients = function({ onClick, clients }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", padding: ".25rem", background: "#ffffff", margin: ".25rem 0" }}>
        <span>Nome</span>
        <span>Telefone</span>
        <span>Status</span>
      </div>

      {clients.map((client) => {
        const payment = lib.getClientMonthPayment(client.id, Date.now( ), Date.now( ));

        return (
          <div onClick={( ) => onClick(client.id)} style={{ display: "flex", justifyContent: "space-between", padding: ".25rem", background: "#ffffff", margin: ".25rem 0" }} key={client.id}>
            <span style={{ width: "33%", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{client.username}</span>
            <span style={{ width: "33%" }}>{client.phone}</span>
            <span style={{ width: "33%", textAlign: "end" }}>{(payment && typeof payment !== "string" && payment.open == false) ? "Pago" : "Devendo"}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ClientsViewRouter;