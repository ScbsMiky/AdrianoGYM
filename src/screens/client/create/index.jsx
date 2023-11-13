import { useContext, useState } from "react";

import Frame from "../../../components/frame";
import Input from "../../../components/input";
import Button from "../../../components/button";
import { useNavigate } from "react-router-dom";
import clientsContext from "../../../globals/contexts/clientsContext";
import BaseClientInputs from "../basic";

export default function ClientCreateRouter({ }) {
  const clients = useContext(clientsContext);

  const navigator = useNavigate( );

  const [data, setData] = useState({ });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = ( ) => {
    setError("");
    
    const r = clients.createClient(data);

    if(typeof r == "string") return setError(r);

    navigator(`/edit-client?id=${r.id}`);
  };

  return (
    <Frame title="Cadastrar" selected="register">
      <div>
        <h1>Dados pessoais</h1>

        <BaseClientInputs onChange={(d) => setData(d)} />
      </div>

      <div>
        {error ? <span style={{ display: "block", textAlign: "center", marginBottom: ".5rem" }}>{error}</span> : <></>}

        <Button onClick={handleSubmit} isLoading={loading} title="Cadastrar" />
      </div>
    </Frame>
  );
};