import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Frame from "../../components/Frame/Frame";
import { NotFoundStyled } from "./styles";

export default function NotFoundScreen( ) {
  const nav = useNavigate( );

  return (
    <Frame title="Não encontrado">
      <NotFoundStyled>
        <h1>Essa pagina não foi encontrada</h1>
        <Button onClick={( ) => nav(-1)} style={{ margin: ".5rem 0" }} center slim><span>Voltar</span></Button>
      </NotFoundStyled>
    </Frame>
  );
};