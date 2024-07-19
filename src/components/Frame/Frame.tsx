import { useRef } from "react";

import { IFrame } from "./types";

import { FrameStyled } from "./styles";
import { Link, useNavigate } from "react-router-dom";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { Global } from "../../libs/global";

export default function Frame(props: IFrame) {
  const nav = useNavigate( );

  const menuRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSave = ( ) => {
    if(inputRef.current && inputRef.current.value) {
      window.localStorage.setItem("authorization", inputRef.current.value);
      
      nav(0);
    };
  };

  return (
    <FrameStyled>
      <div className="header">
        <div>
          <div></div>
        </div>

        <div>
          <span>{props.title}</span>
        </div>

        <div>
          <div
            onClick={( ) => menuRef.current?.focus( )}  
          >
            <svg viewBox="0 0 24 24"><path fill="currentColor" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" /></svg>
          </div>
        </div>
      </div>

      <div className="content">
        {props.children}
      </div>

      <div onFocus={(event) => event.currentTarget.classList.add("actived")} onBlur={(event) => event.currentTarget.classList.remove("actived")} ref={menuRef} tabIndex={0} className="menu">
        <div className="header">
          <svg viewBox="0 0 24 24"><path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>
        </div>

        <div className="content">          
          <Input ref={inputRef} value={Global.GetAuthorization( ) || ""} label="Chave de Acesso" />
          
          <Button onClick={handleSave} center>
            <span>Salvar</span>
          </Button>
        </div>
      </div>

      <div className="footer">
        <Link to="/custumers" className={props.page == "custumers" ? "actived" : ""}>
          <svg viewBox="0 0 24 24"><path fill="currentColor" d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z" /></svg>
        </Link>

        <Link to="/" className={props.page == "dashboard" ? "actived" : ""}>
          <svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 5.69L17 10.19V18H15V12H9V18H7V10.19L12 5.69M12 3L2 12H5V20H11V14H13V20H19V12H22" /></svg>
        </Link>

        <Link to="/trains" className={props.page == "trains" ? "actived" : ""}>
          <svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 5C10.89 5 10 5.89 10 7S10.89 9 12 9 14 8.11 14 7 13.11 5 12 5M22 1V6H20V4H4V6H2V1H4V3H20V1H22M15 11.26V23H13V18H11V23H9V11.26C6.93 10.17 5.5 8 5.5 5.5L5.5 5H7.5L7.5 5.5C7.5 8 9.5 10 12 10S16.5 8 16.5 5.5L16.5 5H18.5L18.5 5.5C18.5 8 17.07 10.17 15 11.26Z" /></svg>
        </Link>
      </div>
    </FrameStyled>
  );
};