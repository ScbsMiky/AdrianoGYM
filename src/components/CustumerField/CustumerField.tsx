import { forwardRef } from "react";

import { ICustumerField } from "./types";
import { CustumerFieldStyled } from "./styles";

import { Calendar } from "../../libs/calendar";

import Input, { patterns } from "../Input/Input";

import CustumerPayments from "./Payments/Payments";

export default forwardRef<HTMLDivElement>((props: ICustumerField, ref) => {
  return (
    <CustumerFieldStyled ref={ref}>
      <h1 style={{ marginTop: ".5rem", marginLeft: ".5rem" }}>Dados do Cliente</h1>
      
      <Input name="name" label="Nome completo" value={props.custumer?.public.name} />

      <Input name="phone" label="Numero de celular" type="number" pattern={patterns.phone} value={props.custumer?.private.phone} />

      <Input name="cpf" label="CPF" type="number" pattern={patterns.cpf} value={props.custumer?.private.cpf} />
      <Input name="email" label="Email" type="number" value={props.custumer?.private.email} />

      {/* <Input label="Genero" type="select" fields={[["Male", "Masculino"], ["Female", "Feminino"]]} /> */}
      
      <Input name="createdAt" label="Data de inscrição" type="date" value={Calendar.DateToInputValue(props.custumer?.createdAt || new Date( ).toISOString( ))} />
      <Input name="bornAt" label="Data de nascimento" type="date" value={Calendar.DateToInputValue(props.custumer?.private.bornAt || new Date( ).toISOString( ))} />

      {props.custumer ? <CustumerPayments onChange={props.onChange} payments={props.custumer.private.payments} /> : <></>}
    </CustumerFieldStyled>
  );
});