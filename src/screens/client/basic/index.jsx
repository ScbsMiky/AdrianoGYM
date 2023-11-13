import { useEffect, useState } from "react";
import { Container } from "./styles";
import { Telphone } from "../../../components/input";

export default function BaseClientInputs({ onChange, client }) {
  const [data, setData] = useState({
    cpf: (client && client.cpf) ? client.cpf : "",
    phone: (client && client.phone) ? client.phone : "",
    username: (client && client.username) ? client.username : "",

    born_at: (client && client.born_at) ? client.born_at : Date.now( ),
    created_at: (client && client.created_at) ? client.created_at : Date.now( ),
  });

  useEffect(( ) => {
    setData({ ...data });
  }, [ ]);
  
  const handleChange = (name, content) => {
    setData({ ...data, [name]: content });

    if(typeof onChange == "function") {
      onChange({ ...data, [name]: content });
    };
  };

  return (
    <Container>
      <span>Nome</span>
      <input
        value={data.username}
        type="text"
        placeholder="Digite o nome"
        onChange={({ target: { value } }) => handleChange("username", value)}
      />

      <span>Telefone</span>
      <Telphone
        value={(data.phone)}
        placeholder="Digite o telefone"
        onChange={(value) => handleChange("phone", value)}
      />

      <span>CPF <b>(opcional)</b></span>
      <input
        value={(data.cpf)}
        type="number"
        placeholder="Digite o CPF"
        onChange={({ target: { value } }) => handleChange("cpf", value)}
      />

      <span>Data de nascimento</span>
      <input
        value={new Date(data.born_at).toLocaleDateString( ).split("/").reverse().join("-")}
        type="date"
        onChange={({ target: { value } }) => handleChange("born_at", value)}
      />

      <span>Data de entrada</span>
      <input
        value={new Date(data.created_at).toLocaleDateString( ).split("/").reverse().join("-")}
        type="date"
        onChange={({ target: { value } }) => handleChange("created_at", value)}
      />
    </Container>
  );
};