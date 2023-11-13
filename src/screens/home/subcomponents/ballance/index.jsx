import { Container } from "./styles";

export default function Ballance({ ballance }) {
  return (
    <Container>
      <span>Saldo disponivel</span>
      <span>{ballance.toLocaleString("pt-br", { style: "currency", currency: "brl" })}</span>
    </Container>
  );
};