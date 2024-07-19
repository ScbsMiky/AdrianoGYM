import { IButton } from "./types";
import { ButtonStyled } from "./styles";

export default function Button(props: IButton) {
  return (
    <ButtonStyled onClick={props.onClick} style={props.style} $variant={props.variant} $disabled={props.disabled} $center={props.center} $slim={props.slim}>
      {props.children}
    </ButtonStyled>
  );
};