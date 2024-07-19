import { useRef, useState } from "react";
import CustumerField from "../../components/CustumerField/CustumerField";
import Frame from "../../components/Frame/Frame";
import useRequest from "../../hooks/useFetch";
import { Global } from "../../libs/global";
import Button from "../../components/Button/Button";
import Loading from "../../components/Loading/Loading";
import { useNavigate } from "react-router-dom";

export default function CustumerEditorScreen( ) {
  const nav = useNavigate( );
  const ref = useRef<HTMLDivElement>(null);

  const custumerID = new URLSearchParams(window.location.search).get("id");

  const fetcher = useRequest<{ error?: string; custumer?: Global.CustumerProps }>({
    method: "POST",
    url: `${Global.API}/api/custumers/find`,
    autoFetch: true,
    initializer: { },
    body: { custumerID },
    headers: { authorization: Global.GetAuthorization( ) },
  });
  
  const paymentsFetcher = useRequest<{ error?: string; custumer?: Global.CustumerProps }>({
    method: "POST",
    url: `${Global.API}/api/payments/update`,
    initializer: { },
    headers: { authorization: Global.GetAuthorization( ) },
  });

  const [payments, setPayments] = useState([ ] as Global.PaymentProps[ ]);

  const handleSubmit = ( ) => {
    if(!ref.current || fetcher.loading) return;

    const fields = Array.from(ref.current.querySelectorAll("input")).reduce((fields, input) => {
      fields[input.name] = (input.name == "phone" || input.name == "cpf") ? input.value.replace(/\D/g, "") : input.value;

      return fields;
    }, { } as { [key: string]: string });

    fetcher.setLoading(true);

    Promise.all([
      paymentsFetcher.fetch({
        body: {
          custumerID,
          payments
        }
      }),
      fetcher.fetch({
        url: `${Global.API}/api/custumers/update`,
        body: {
          custumerID,
          data: fields
        }
      })
    ]).then(( ) => {
      if(fetcher.error || paymentsFetcher.error) {
        fetcher.error = fetcher.error || paymentsFetcher.error;

        fetcher.setLoading(false);

        return;
      };

      nav(0);
    });
  };

  const handlePaymentSubmit = (payments: Global.PaymentProps[ ]) => {
    setPayments(payments);
  };

  return (
    <Frame title="Editar cliente" page="custumers">
      {
        fetcher.loading
        ? <Loading />
        : fetcher.error
        ? <div><span>{fetcher.error}</span></div>
        : <CustumerField
            ref={ref}
            // @ts-ignore
            custumer={fetcher.data.custumer}
            // @ts-ignore
            onChange={handlePaymentSubmit}
          />
      }

      <div>
        <span style={{ display: "block", textAlign: "center", color: "#ff4040", marginBottom: ".75rem" }}>{fetcher.error}</span>

        <Button onClick={handleSubmit} center>
          <span>Salvar</span>
        </Button>
      </div>
    </Frame>
  );
};