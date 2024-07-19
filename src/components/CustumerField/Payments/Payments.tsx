import { useState } from "react";

import { ICustumerPayments } from "./types";
import { CustumerPaymentsFilterStyled, CustumerPaymentsStyled, CustumerPaymentsTableStyled } from "./styles";

import Button from "../../Button/Button";

import { Global } from "../../../libs/global";
import { Calendar } from "../../../libs/calendar";

function checkPaymentIsInMonth(payment: Global.PaymentProps, year: number, month: number) {
  let date = new Date(payment.at);

  let checked = (date.getFullYear( ) == year) && (date.getMonth( ) == month);

  date = undefined!;

  return checked;
};

export function PaymentFilters(props: { onChange?(year: number): void; year: number }) {
  return (
    <CustumerPaymentsFilterStyled>
      <Button onClick={( ) => props.onChange ? props.onChange(props.year - 2) : undefined} slim><span>{props.year - 2}</span></Button>
      <Button onClick={( ) => props.onChange ? props.onChange(props.year - 1) : undefined} slim><span>{props.year - 1}</span></Button>
      <Button slim disabled><span>{props.year}</span></Button>
      <Button onClick={( ) => props.onChange ? props.onChange(props.year + 1) : undefined} slim><span>{props.year + 1}</span></Button>
      <Button onClick={( ) => props.onChange ? props.onChange(props.year + 2) : undefined} slim><span>{props.year + 2}</span></Button>
    </CustumerPaymentsFilterStyled>
  );
};

export function PaymentItem(props: { onChange?(key: string, value: string): void; month: number; year: number; payment?: Global.PaymentProps }) {
  return (
    <div>
      <span>{Calendar.MonthNames[props.month]}</span>
      
      <span>
        <select
          defaultValue={(props.payment && props.payment.payiedAt) ? new Date(props.payment.payiedAt).getDate( ).toString( ).padStart(2, "0") : "01"}
          onChange={({ currentTarget: { value } }) => props.onChange ? props.onChange("day", value) : undefined}
        >
          {
            Calendar
              .CreateDayList(new Date(props.year, props.month, 1))
              .map((day) => (<option key={day} value={day}>{day}</option>))
          }
        </select>
      </span>
      
      <span>
        <select
          defaultValue={(props.payment) ? props.payment.payied ? "true" : "false" : " "}
          onChange={({ currentTarget: { value } }) => props.onChange ? props.onChange("status", value) : undefined}
        >
          <option value=" ">-</option>
          <option value="true">Pago</option>
          <option value="false">Atrasado</option>
        </select>
      </span>

      <span>
        <span>R$</span>
        <input
          defaultValue={props.payment ? props.payment.value : 0}
          onChange={({ currentTarget: { value } }) => props.onChange ? props.onChange("value", value) : undefined}
        />
      </span>
    </div>
  );
};

export function PaymentTable(props: { onChange?(list: Global.PaymentProps[ ]): void; payments: Global.PaymentProps[ ]; year: number }) {
  const [list, setList] = useState([ ] as Global.PaymentProps[ ]);

  const updatePayment = (month: number, key: string, content: string) => {
    let found = list.find((payment) => checkPaymentIsInMonth(payment, props.year, month))

    if(!found) {
      let data = props.payments.find((payment) => checkPaymentIsInMonth(payment, props.year, month));

      found = data || {
        id: Math.floor(Math.random( ) * Date.now( )).toString( ),
        at: new Date(props.year, month, 1).toISOString( ),
        payied: false,
        value: 0,
        payiedAt: "",
        description: "",
      };

      list.push(found);
    };

    if(key == "day") found.payiedAt = new Date(props.year, month, Number(content)).toISOString( );
    if(key == "value") found.value = Number(content);
    if(key == "status") found.payied = content == "true";
    
    setList(list.slice(0));

    if(props.onChange) {
      props.onChange(list);
    };
  };

  return (
    <CustumerPaymentsTableStyled>
      <div>
        <span>Mes</span>
        <span>Dia</span>
        <span>Status</span>
        <span>Valor</span>
      </div>

      {
        Calendar.MonthNames.map((_, monthIndex) => (
          <PaymentItem
            key={`${monthIndex}-${props.year}`}
            year={props.year}
            month={monthIndex}
            payment={
                 list.find((payment) => checkPaymentIsInMonth(payment, props.year, monthIndex))
              || props.payments.find((payment) => checkPaymentIsInMonth(payment, props.year, monthIndex))
            }

            onChange={(key, value) => updatePayment(monthIndex, key, value)}
          />
        ))
      }
    </CustumerPaymentsTableStyled>
  );
};

export default function CustumerPayments(props: ICustumerPayments) {
  const [year, setYear] = useState(new Date( ).getFullYear( ));
  
  return (
    <CustumerPaymentsStyled>
      <h1 style={{ marginTop: ".5rem" }}>Pagamentos do Cliente</h1>

      <PaymentFilters
        year={year}
        onChange={(y) => setYear(y)}
      />
      
      <PaymentTable
        year={year}
        payments={props.payments}
        onChange={props.onChange}
      />
    </CustumerPaymentsStyled>
  );
};