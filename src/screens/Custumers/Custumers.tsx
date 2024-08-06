import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CustumersStyled } from "./styles";

import { Global } from "../../libs/global";

import useRequest from "../../hooks/useFetch";

import Frame from "../../components/Frame/Frame";
import Button from "../../components/Button/Button";
import Loading from "../../components/Loading/Loading";
import Input, { patterns } from "../../components/Input/Input";

function applyNameFilterInCustumer(custumer: Global.CustumerProps, name: string) {
  return custumer.public.name.toLowerCase( ).includes(name.toLowerCase( )) || custumer.private.phone.includes(name) || custumer.private.cpf.includes(name) || custumer.private.email.includes(name);
};

function applyFilterInCustumer(custumer: Global.CustumerProps, filter: number, name: string, now: Date) {
  switch(filter){
    case 1: return checkIsInDay(custumer, now) && applyNameFilterInCustumer(custumer, name);
    case 2: return !checkIsInDay(custumer, now) && applyNameFilterInCustumer(custumer, name)

    default: return applyNameFilterInCustumer(custumer, name);
  };
};

function checkIsInDay(custumer: Global.CustumerProps, now: Date) {
  const lastPayment = custumer.private.payments[custumer.private.payments.length - 1];

  const currentPayment = custumer.private.payments.find((payment) => {
    const date = new Date(payment.payiedAt);

    return now.getFullYear( ) == date.getFullYear( ) && now.getMonth( ) == date.getMonth( );
  });

  if(currentPayment && currentPayment.payied) return true;
  else if(lastPayment) {
    const lastDate = new Date(lastPayment.payiedAt);
    return lastDate.getMonth( ) == (now.getMonth( ) - 1) && now.getDate( ) <= lastDate.getDate( );
  };

  return false;
};

export default function CustumersScreen( ) {
  const nav = useNavigate( );
  const inputRef = useRef<HTMLInputElement>(null);

  const data = useRequest({
    url: `${Global.API}/api/custumers/all`,
    method: "POST",
    headers: { authorization: Global.GetAuthorization( ) },
    autoFetch: true,
    initializer: [ ] as Global.CustumerProps[ ]
  });

  const [now] = useState(new Date( ));
  const [name, setName] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(0);

  useEffect(( ) => {
    if(!inputRef.current) return;

    inputRef.current.addEventListener("keyup", ( ) => setName(inputRef.current!.value));
  }, [ ]);

  return (
    <Frame title="Clientes" page="custumers">
      <CustumersStyled>
        <div className="filters">
          <Button onClick={( ) => setSelectedFilter(0)} disabled={selectedFilter == 0} slim><span>Todos</span></Button>
          <Button onClick={( ) => setSelectedFilter(1)} disabled={selectedFilter == 1} slim><span>Em dia</span></Button>
          <Button onClick={( ) => setSelectedFilter(2)} disabled={selectedFilter == 2} slim><span>Atrasados</span></Button>
          {/* <Button onClick={( ) => setSelectedFilter(3)} disabled={selectedFilter == 3} slim><span>Vencendo</span></Button> */}
        </div>

        <Input ref={inputRef} label="Buscar cliente" />

        {
          data.loading
          ? <Loading />
          : data.error
          ? <><span>{data.error}</span></>
          : data.data.length
          ? <>
              <h1>Meus clientes ( {data.data.length} )</h1>
              
              <br />

              <div className="table">
                <div className="header">
                  <div><span>Nome</span></div>
                  <div><span>Telefone</span></div>
                  <div><span>Status</span></div>
                </div>

                <div className="content">
                  {data.data.sort((a, b) => a.public.name.localeCompare(b.public.name)).filter((custumer) => applyFilterInCustumer(custumer, selectedFilter, name, now)).map((custumer) => {
                    let status = custumer.private.payments.length ? checkIsInDay(custumer, now) ? "green" : "red" : "-";
                    
                    return (
                      <div onClick={( ) => nav(`/custumers/editor?id=${custumer.id}`)} key={`${custumer.id}-${selectedFilter}`} className={status}>
                        <div><span>{custumer.public.name}</span></div>
                        {/* @ts-ignore */}
                        <div><span>{patterns.phone({ value: custumer.private.phone })}</span></div>
                        <div><span>{status == "-" ? "" : status == "green" ? "Em dia" : "Atrasado"}</span></div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          : <><span>Nenhum cliente</span></>
        }
      </CustumersStyled>

      <Button onClick={( ) => nav("/custumers/creator")} center>
        <span>Novo cliente</span>
      </Button>
    </Frame>
  );
};