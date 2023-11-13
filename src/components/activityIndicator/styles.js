import styled, { keyframes } from "styled-components";

export const spinner = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & > div {
    padding: .75rem;

    border: .1rem solid transparent;
    border-radius: 100%;

    border-right-color: red;

    animation: ${spinner} 1s infinite linear;
  }
`;