import styled, { createGlobalStyle } from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  background: #f1f1f1;

  & > .welcome-back::before {
    content: "";

    position: fixed;

    width: 100vw;
    height: 100vh;

    background: #0c0c0c20;
    backdrop-filter: blur(2px);

    z-index: -1;
  }

  & > .welcome-back[data-closed="true"] {
      display: none !important;
    } 

  & > .welcome-back {
    position: fixed;
    
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    
    top: 0;
    left: 0;

    

    & > div {
      background: #ffffff;
      border-radius: 1rem;
      padding: 1rem;
    }

    h1 {
      margin-bottom: 1rem;
      font-size: 1.4rem;
    }

    .buttons {
      margin-top: 1rem;
      display: flex;
      align-items: center;

      & > span {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
        padding: .5rem 1rem;
        border-radius: .5rem;
        color: #ffffff;
        background: #e61e1e;
      }
    }
  }
`;

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;

    font-size: 16px;
    font-family: sans-serif;

    outline: none;
    text-decoration: none;

    box-sizing: border-box;
  }
`;