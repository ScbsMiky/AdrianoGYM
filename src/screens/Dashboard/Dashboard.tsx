import { useEffect, useState } from "react";
import Frame from "../../components/Frame/Frame";
import Loading from "../../components/Loading/Loading";
import useRequest from "../../hooks/useFetch";
import { Global } from "../../libs/global";

import { DashboardStyled } from "./styles";
import Button from "../../components/Button/Button";
import { Calendar } from "../../libs/calendar";

export default function DashboardScreen( ) {
  const [year, setYear] = useState(new Date( ).getFullYear( ));
  const [month, setMonth] = useState(new Date( ).getMonth( ));

  const fetcher = useRequest({
    url: `${Global.API}/api/statistics/from`,
    initializer: {
      custumers: {
        old: 0,
        new: 0,
        total: 0,
        droped: 0,
        same: 0,
      },
      
      payments: {
        total: 0,
        payied: 0,
        unpayied: 0,
        totalValue: 0,
        payiedValue: 0,
        unpayiedValue: 0,
      }
    },
    body: { at: new Date( ).toISOString( ) },
    headers: { authorization: Global.GetAuthorization( ) }
  });

  useEffect(( ) => {
    fetcher.fetch({
      body: {
        at: new Date(year, month, 1).toISOString( )
      }
    }).then(( ) => console.log(fetcher.data));
  }, [year, month]);

  return (
    <Frame title="Painel" page="dashboard">
      <DashboardStyled>
        {
          fetcher.loading
          ? <Loading />
          : fetcher.error
          ? <span>{fetcher.error}</span>
          : <>
              <div className="filters">
                <Button onClick={( ) => setYear(year - 2)} slim><span>{year - 2}</span></Button>
                <Button onClick={( ) => setYear(year - 1)} slim><span>{year - 1}</span></Button>
                <Button slim disabled><span>{year}</span></Button>
                <Button onClick={( ) => setYear(year + 1)} slim><span>{year + 1}</span></Button>
                <Button onClick={( ) => setYear(year + 2)} slim><span>{year + 2}</span></Button>
              </div>

              <div className="filters">
                {Calendar.MonthNames.map((name, index) => <Button onClick={( ) => setMonth(index)} key={name} disabled={month == index} slim><span>{name}</span></Button>)}
              </div>

              <div className="boxes">
                <h1>Clientes</h1>

                <div>
                  <span>Novos</span>
                  <span>{fetcher.data.custumers.new}</span>
                </div>

                <div>
                  <span>Desistentes</span>
                  <span>{fetcher.data.custumers.droped}</span>
                </div>

                {/* <div>
                  <span>Inativos</span>
                  <span>0</span>
                </div> */}

                <div>
                  <span>Retidos</span>
                  <span>{fetcher.data.custumers.same}</span>
                </div>

                <div>
                  <span>Total</span>
                  <span>{fetcher.data.custumers.total}</span>
                </div>

                <br />

                <h1>Pagamentos</h1>

                <div>
                  <span>Em dia</span>
                  <span>{fetcher.data.payments.payiedValue.toLocaleString("pt-br", { currency: "brl", style: "currency" })}</span>
                </div>

                <div>
                  <span>Atrasado</span>
                  <span>{fetcher.data.payments.unpayied.toLocaleString("pt-br", { currency: "brl", style: "currency" })}</span>
                </div>

                <div>
                  <span>Total</span>
                  <span>{fetcher.data.payments.totalValue.toLocaleString("pt-br", { currency: "brl", style: "currency" })}</span>
                </div>
              </div>
            </>
        }
      </DashboardStyled>
    </Frame>
  );
};