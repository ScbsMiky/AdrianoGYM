import { useContext, useState } from "react";
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import Frame from "../../../components/frame";
import Input from "../../../components/input";
import Button from "../../../components/button";
import Payments from "./payment";
import clientsContext from "../../../globals/contexts/clientsContext";
import Dialog from "../../../components/dialog";
import ActivityIndicator from "../../../components/activityIndicator";
import { ChangePaymentDialog } from "./dialogs";
import BaseClientInputs from "../basic";

export default function ClientEditRouter({ }) {
  const clients = useContext(clientsContext);
  const navigator = useNavigate( );

  const [year, setYear] = useState(new Date( ).getFullYear( ));

  const [client, setClient] = useState({ });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [clientError, setClientError] = useState("");
  const [clientLoading, setClientLoading] = useState(true);

  const [selectedPayment, setSelectedPayment] = useState(undefined);

  const [openDialog, setOpenDialog] = useState(false);
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);

  const [client_id, setClientId] = useState("");

  const handleTogglePayment = ({ payment, index }) => {
    if(!payment) {
      payment = clients.getClientByID(client_id);

      payment.payments.push({
        price: 70,
        open: false,
        date: new Date(year, index, 1).toISOString( )
      });

      payment = payment.payments[payment.payments.length - 1];
      
      clients.saveClients( );
    };

    setSelectedPayment(payment);
    setOpenPaymentDialog(true);

    setClient({ ...client });
  };

  const handleDelete = ( ) => {
    clients.removeClient(client_id);

    navigator("/home");
  };

  const handleChange = (data) => {
    setClient({ ...data });
  };

  const handleSave = ( ) => {
    setLoading(true);
    setError("");

    console.log(client);

    const r = clients.editClient(client_id, client);

    if(typeof r == "string") {
      setLoading(false);
      return setError(r);
    };

    setLoading(false);
  };

  const handleDeletePayment = ( ) => {
    console.log(selectedPayment);

    const payment = client.payments.findIndex((payment) => JSON.stringify(payment) == JSON.stringify(selectedPayment));

    if(payment >= 0) {
      client.payments.splice(payment, 1);
      clients.saveClients( );
    };
  };

  const handlePayment = ( ) => {
    const value = prompt("Insira o valor do pagamento", 50) || 50;

    clients.addClientPayment(client_id, Number(value));
    clients.saveClients( );

    setClient({ ...client });
  };

  const changeDate = ( ) => {
    let [first, last] = clients.getFirstAndLastDay(selectedPayment.date);

    let v = prompt(`Insira o dia do pagamento (${first.getDate( )} ate ${last.getDate( )})`, 1);
    
    if(!v || isNaN(v)) return;

    v = Number(v);

    if(v >= first.getDate( ) && v <= last.getDate( )) {
      selectedPayment.date = new Date(selectedPayment.date);
      selectedPayment.date.setDate(v);
      selectedPayment.date = selectedPayment.date.toISOString( );
      
      setSelectedPayment({ ...selectedPayment });
    };
  };

  useEffect(( ) => {
    let id = new URLSearchParams(window.location.search).get("id");

    setClientId(id);

    const findedClient = clients.getClientByID(id);
    
    if(!findedClient) {
      return setClientError("Nenhum usuario encontrado");
    };
    
    setClient(findedClient);
    
    setClientLoading(false);
  }, [ ]);

  if(clientError) {
    return (<Frame  title="Editar" selected="register"><span>{clientError}</span></Frame>)
  }

  if(clientLoading) {
    return (<Frame  title="Editar" selected="register"><ActivityIndicator /></Frame>)
  };

  return (
    <Frame title="Editar" selected="register">
      <div>
        <h1>Dados pessoais</h1>

        <BaseClientInputs onChange={handleChange} client={client} />

        <br />

        <h1>Pagamentos</h1>

        <Payments onClick={handleTogglePayment} payments={client.payments} year={year} />

        <br />

        <div style={{ textAlign: "center" }}>
          <span onClick={( ) => setYear(year - 1)} style={{ color: "#8b8b8b" }}>{year - 1}</span>
          <span style={{ margin: "0 1rem" }}>{year}</span>
          <span onClick={( ) => setYear(year + 1)} style={{ color: "#8b8b8b" }}>{year + 1}</span>
        </div>

        <br />

        <Button onClick={( ) => setOpenDialog(true)} style={{ background: "#eb3737", color: "#ffffff" }} title="Deletar" />
      </div>

      <div>
        <br />

        {error ? <span style={{ display: "block", textAlign: "center", marginBottom: ".5rem" }}>{error}</span> : <></>}

        <Button onClick={handleSave} isLoading={loading} title="Salvar" />
      </div>

      <Dialog
        open={openPaymentDialog && (!!selectedPayment)}
        title="Pagamento"
        actions={[{ name: "Salvar", callback: handleSave }, { name: "Deletar", callback: handleDeletePayment }]}
        onClose={( ) => { setOpenPaymentDialog(false); setSelectedPayment(undefined); }}
      >
        <p>Dados do pagamento</p>

        <br />

        <div onClick={( ) => { selectedPayment.open = !selectedPayment.open; setSelectedPayment({ ...selectedPayment }); }} style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Status</span>
          <span>{(selectedPayment || { }).open ? "Atrasado" : "Pago"}</span>
        </div>

        <div onClick={( ) => { let v = prompt("Insira o valor do pagamento", selectedPayment.price); if(!v || isNaN(v)) return; selectedPayment.price = Number(v); setSelectedPayment({ ...selectedPayment });  }} style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Preço</span>
          <span>{((selectedPayment || { }).price || 0).toLocaleString("pt-br", { currency: "brl", style: "currency" })}</span>
        </div>

        <div onClick={changeDate} style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Data</span>
          <span>{new Date((selectedPayment || { }).date).toLocaleDateString( )}</span>
        </div>

        <br />

        <Button onClick={( ) => { selectedPayment.open = !selectedPayment.open; setSelectedPayment({ ...selectedPayment }); }} title={`Definir como ${(selectedPayment || { }).open ? "Pago" : "Atrasado"}`} />
      </Dialog>

      <Dialog
        open={openDialog}
        title="Deletar cliente"
        actions={[{ name: "Sim", callback: handleDelete, style: { background: "#eb3737", color: "#ffffff" }}, { name: "Não" }]}
        onClose={( ) => setOpenDialog(false)}
      >
        <p>Você realmente deseja deletar esse usuario ?</p>
        <br />
        <p>Tenha em mente que se confirmar deletar esse cliente, todos os dados salvos sobre o mesmo serão perdidos</p>
      </Dialog>
    </Frame>
  );
};