import Footer from "./footer";
import Header from "./header";
import Content from "./content";
import { Container } from "./styles";

/**
 * @param {{ onSubmit(content: string): any, selected: string, children: JSX.Element | JSX.Element[ ] }} param0 
 */
export default function Frame({ onSubmit, onHeaderChange, selected, title, children }) {
  return (
    <Container>
      <Header onHeaderChange={onHeaderChange} onSubmit={onSubmit} title={title} />
      <Content children={children} />
      <Footer selected={selected} />
    </Container>
  );
};