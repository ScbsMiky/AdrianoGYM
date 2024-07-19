import { IContainer } from "./types";
import { ContainerStyled, GlobalStyled } from "./styles";

export default function Container(props: IContainer) {
  return (
    <ContainerStyled>
      <GlobalStyled />
      
      {props.children}
    </ContainerStyled>
  );
};