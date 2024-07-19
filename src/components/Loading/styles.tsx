import { css, keyframes, styled } from "styled-components";

export const SpinnerAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

export const LoadingStyled = styled.div<{ $fullscreen?: boolean, $color?: string, $sizing?: string }>`
  width: 100%;
  
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 1rem;

  ${(props) => props.$fullscreen == true ? css`height: 100%;` : ""}

  & > div {
    margin: auto;

    width: fit-content;
    height: fit-content;

    padding: ${(props) => props.$sizing || "1rem"};

    border-radius: 100%;
    border: .24rem solid ${(props) => props.$color || "#4ec5c5"};
    border-left-color: transparent;

    animation: ${SpinnerAnimation} 1s linear infinite;
  }
`;