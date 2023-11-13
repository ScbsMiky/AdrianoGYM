import styled from "styled-components";

export const Container = styled.div`
  position: fixed;

  width: 100%;
  height: 100%;

  top: 0;
  left: 0;

  background: #63636390;

  backdrop-filter: blur(2px);

  z-index: 9999999;

  display: none;
  align-items: center;
  justify-content: center;

  & > div {
    max-width: 90%;

    padding: 1rem;
    background: #ffffff;

    border-radius: 1rem;
  }

  &[data-visible="true"] {
    display: flex;
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 1rem;

  span {
    font-weight: bold;
    font-size: 1.4rem;
  }

  svg {
    margin-left: 1rem;

    width: 1.6rem;
    height: 1.6rem;

    color: #ff0000;
  }
`;

export const Content = styled.div`
`;

export const Buttons = styled.div`
  margin-top: 1rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Action = styled.div`
  background: #cccccc;
  padding: .4rem 1rem;
  border-radius: 1rem;
`;