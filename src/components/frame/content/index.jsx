import { Container } from "./styles";

export default function Content({ children }) {
  return (
    <Container>
      {children}
    </Container>
  );
};