import styled from "styled-components";

export const Container = styled.div`
  b {
    font-size: .9rem;
    color: #9c9c9c;
  }

  span {
    display: block;

    font-size: 1rem;
    margin-bottom: .25rem;
  }

  .placeholder {
    color: #7e7e7e;
  }

  input, .fake-input {
    display: block;

    border: none;
    border-radius: 2rem;

    background: #ffffff;
    box-shadow: 2px 2px 4px #cccccc;

    width: 100%;

    padding: .5rem .5rem;

    margin-bottom: 1rem;
  }

  input:last-child {
    margin-bottom: 0;
  }
`;