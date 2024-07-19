import { useEffect, useRef } from "react";

import Frame from "../../components/Frame/Frame";
import Button from "../../components/Button/Button";
import CustumerField from "../../components/CustumerField/CustumerField";
import useRequest from "../../hooks/useFetch";
import { Global } from "../../libs/global";
import { useNavigate } from "react-router-dom";

export default function CustumerCreatorScreen( ) {
  const nav = useNavigate( );
  const ref = useRef<HTMLDivElement>(null);

  const fetcher = useRequest<{ error?: string; custumer?: Global.CustumerProps }>({
    method: "POST",
    url: `${Global.API}/api/custumers/create`,
    initializer: { },
    headers: { authorization: Global.GetAuthorization( ) },
  });

  const handleSubmit = ( ) => {
    if(!ref.current) return;

    const fields = Array.from(ref.current.querySelectorAll("input")).reduce((fields, input) => {
      fields[input.name] = (input.name == "phone" || input.name == "cpf") ? input.value.replace(/\D/g, "") : input.value;

      return fields;
    }, { } as { [key: string]: string });

    fetcher.fetch({ body: fields });
  };

  useEffect(( ) => {
    if(fetcher.data.custumer) {
      return nav(`/custumers/editor?id=${fetcher.data.custumer.id}`);
    };
  }, [fetcher]);

  return (
    <Frame title="Novo cliente" page="custumers">
      <CustumerField ref={ref} />

      <div>
        <span style={{ display: "block", textAlign: "center", color: "#ff4040", marginBottom: ".75rem" }}>{fetcher.error}</span>

        <Button onClick={handleSubmit} center>
          <span>Criar</span>
        </Button>
      </div>
    </Frame>
  );
};