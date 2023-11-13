import { useContext, useEffect, useRef, useState } from "react";

import Frame from "../../components/frame";
import Chart from "./subcomponents/chart";
import clientsContext from "../../globals/contexts/clientsContext";
import PieChart from "../../components/chart";

export default function HomeScreen(props) {
  const clients = useContext(clientsContext);

  const canvasRef = useRef( );

  const [date, setDate] = useState(clients.getFirstAndLastDay(Date.now( )));
  const [infos, setInfos] = useState(clients.getDashboardInfos(date[0], date[1]));

  const changeDate = ( ) => {
    let input = document.createElement("input");

    input.type = "date";
    input.showPicker( );

    input.onchange = ( ) => {
      let value = clients.getFirstAndLastDay(input.value);
      setInfos(clients.getDashboardInfos(value[0], value[1]));
      setDate(value);

      input = undefined;
    };
  };

  const style = {
    display: "flex",
    justifyContent: "space-between"
  };

  return (
    <Frame title="Dashboard" selected="home">
      <div>
        <p onClick={changeDate} style={{ textAlign: "center" }}>
          Esses dados são relativos a data <b>{date[0].toLocaleDateString( )}</b> ate <b>{date[1].toLocaleDateString( )}</b><b />
          . Toque para alterar esse data
        </p>

        <br />

        <div style={{ display: "flex", justifyContent: "center" }}>
          <PieChart
            scale={140}
            data={[
              { value: infos.availablePayments, color: "#234faf", view: true },
              { value: infos.unavailablePayments, color: "transparent" }
            ]}
          />
        </div>

        <br />

        <div>
          <h1>Pagamentos</h1>

          <div style={style}>
            <span>Pagamentos realizados</span>
            <span>{infos.availableBalance.toLocaleString("pt-br", { style: "currency", currency: "brl" })}</span>
          </div>

          <div style={style}>
            <span>Pagamentos não realizados</span>
            <span>{infos.unavailableBalance.toLocaleString("pt-br", { style: "currency", currency: "brl" })}</span>
          </div>

          <div style={style}>
            <span>Total</span>
            <span>{infos.totalBalance.toLocaleString("pt-br", { style: "currency", currency: "brl" })}</span>
          </div>
        </div>

        <br />

        <div>
          <h1>Clients</h1>

          <div style={style}>
            <span>Novos clientes</span>
            <span>{infos.newClients}</span>
          </div>

          <div style={style}>
            <span>Total</span>
            <span>{infos.totalClients}</span>
          </div>
        </div>
      </div>
    </Frame>
  );
};