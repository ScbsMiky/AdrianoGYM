import { Container, Title, Action, Buttons, Content } from "./styles";

export default function Dialog({ onClose, title, open, children, actions }) {
  const handleAction = (callback) => {
    if(typeof onClose == "function") {
      onClose( );
    };

    if(typeof callback == "function") {
      callback( );
    };
  };

  return (
    <Container data-visible={open}>
      <div style={{ zIndex: "99999999999999" }}>
        <Title>
          <span>{title}</span>
          <svg onClick={handleAction} viewBox="0 0 24 24"><path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>
        </Title>

        <Content>
          {children}
        </Content>

        {(actions && actions.length)
          ? <Buttons>{actions.map((action, index) => <Action key={index} style={action.style} onClick={( ) => handleAction(action.callback)}>{action.name}</Action>)}</Buttons>
          : <></>
        }
      </div>
    </Container>
  );
};

Dialog.Title = function({ content, action }) {
  
};