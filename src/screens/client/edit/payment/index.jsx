import { useState } from "react";
import { Container } from "./styles";
import { clients } from "../../../../globals/contexts/clientsContext";

export default function Payments({ onClick, payments, year }) {
  const [months] = useState([...clients.months]);

  const setZero = (num) => {
    num = Number(num) ?? 0;
    return num < 10 ? `0${num}` : num;
  }

  return (
    <Container>

      {months.map((month, index) => {
        const status = (payments || [ ]).find((payment) => {
          let pd = new Date(payment.date);

          return pd.getFullYear( ) == year && pd.getMonth( ) == index;
        });

        return (
          <div onClick={( ) => onClick({ month, payment: status, index })} key={index} className={status ? status.open ? "open" : "close" : "undefined"}>
            <span>{month}</span>
            <span>{status ? setZero(new Date(status.date).getDate( )) : "00"}</span>
          </div>
        )
      })}
    </Container>
  )
};