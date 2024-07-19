import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Frame from "../../components/Frame/Frame";
import { TrainsStyled } from "./styles";

export default function TrainsScreen( ) {
  const nav = useNavigate( );
  
  return (
    <Frame title="Treinos" page="trains">
      <TrainsStyled>
        <h1>Desculpe, essa pagina ainda não esta disponivel</h1>
        <Button onClick={( ) => nav(-1)} style={{ margin: ".5rem 0" }} center slim><span>Voltar</span></Button>
      </TrainsStyled>
    </Frame>
  );
};