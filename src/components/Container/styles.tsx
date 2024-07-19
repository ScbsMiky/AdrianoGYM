import { createGlobalStyle, styled } from "styled-components";

export const ContainerStyled = styled.div`
  width: 100vw;
  height: 100dvh;

  background: #d1d6d6;
`;

export const GlobalStyled = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;

    font-size: 16px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;

    outline: none;
    box-sizing: border-box;

    scroll-behavior: smooth;
  }

  *::-webkit-scrollbar {
    width: .5rem;
    height: .5rem;
    background: #41414129;
  }

  *::-webkit-scrollbar-thumb {
    background: #41414129;

    border-radius: .5rem;
  }

  svg, img {
    width: 1rem;
    height: 1rem;
  }

  h1 {
    font-size: 1.4rem;
  }
`;