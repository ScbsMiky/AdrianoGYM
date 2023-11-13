import ActivityIndicator from "../activityIndicator";
import { Container } from "./styles";

export default function Button({ onClick, style, isLoading, title, leftIcon, rightIcon }) {
  return (
    <Container onClick={onClick} style={style}>
      {
        isLoading
        ? <ActivityIndicator />
        : <>
            {leftIcon}
            <span>{title}</span>
            {rightIcon}
          </>
      }
    </Container>
  );
};