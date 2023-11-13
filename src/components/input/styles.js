import styled from "styled-components";

export const Container = styled.div``;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  background: #ffffff;
  border-radius: 2rem;

  box-shadow: 2px 2px 5px #d8d8d8;

  padding: .15rem .05rem;

  svg:first-child {
    margin: 0 .35rem;
  }

  svg:last-child {
    margin: 0 .35rem;
  }

  input {
    padding: .35rem .75rem;

    width: 100%;

    border: none;

    background: none;
  }
`;

export const Title = styled.div`
  margin-top: .55rem;
  margin-bottom: .45rem;
`;