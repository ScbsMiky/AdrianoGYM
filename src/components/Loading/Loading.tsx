import { ILoading } from "./types";
import { LoadingStyled } from "./styles";

export default function Loading(props: ILoading) {
  return (
    <LoadingStyled $color={props.color} $fullscreen={props.fullscreen} $sizing={props.sizing}>
      <div></div>
    </LoadingStyled>
  );
};