import { useNavigate } from "react-router-dom";
import { Container } from "./styles";
import { useEffect, useState } from "react";
import Input from "../../input";

export default function Header({ onHeaderChange, title }) {
  const navigator = useNavigate( );

  const [searchMode, setSearchMode] = useState(window.location.pathname == "/clients");
  const [searchContent, setSearchContent] = useState("");

  useEffect(( ) => {
    setSearchMode(window.location.pathname == "/clients");
  }, [window.location.pathname]);

  const handleSearch = (content) => {
    if(typeof onHeaderChange == "function") {
      onHeaderChange(content);
    };

    setSearchContent(content);
  };

  return (
    <Container>
      <div>
        <div onClick={( ) => navigator(-1)} className="icon">
          <svg viewBox="0 0 24 24"><path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" /></svg>
        </div>
      </div>

      <div>
        {searchMode ? <Input onChange={(value) => handleSearch(value)} value={searchContent} placeholder="Pesquisar por..." /> : <span>{title}</span>}
      </div>

      <div>
      </div>
    </Container>
  );
};