import { styled } from "styled-components";

export const ButtonVariants = {
  gray: {
    color: "",
    background: "",
    disabledColor: "",
    disabledBackground: "",
    clickedColor: "",
    clickedBackground: ""
  },

  dark: {
    color: "#dfdfdf",
    background: "#44616e",
    disabledColor: "#a39b9b",
    disabledBackground: "#1b323d",
    clickedColor: "#a39b9b",
    clickedBackground: "#1b323d"
  },

  light: {
    color: "#000000",
    background: "#ffffff",
    disabledColor: "#545f6d",
    disabledBackground: "#bac3ce",
    clickedColor: "#545f6d",
    clickedBackground: "#bac3ce"
  }
};

export type ButtonProps = {
  $variant?: keyof typeof ButtonVariants;
  
  $slim?: boolean;
  $center?: boolean;
  $disabled?: boolean;
};

export const ButtonStyled = styled.div<ButtonProps>`
  margin: .5rem;
  padding: ${(props) => props.$slim ? ".5rem .75rem" : ".75rem"};

  display: flex;
  align-items: center;
  justify-content: ${(props) => props.$center ? "center" : "unset"};

  border-radius: .5rem;

  color: ${(props) => ButtonVariants[props.$variant || "light"][props.$disabled ? "disabledColor" : "color"]};
  background: ${(props) => ButtonVariants[props.$variant || "light"][props.$disabled ? "disabledBackground" : "background"]};

  transition: all .25s;

  &:active {
    color: ${(props) => ButtonVariants[props.$variant || "light"][props.$disabled ? "disabledColor" : "clickedColor"]};
    background: ${(props) => ButtonVariants[props.$variant || "light"][props.$disabled ? "disabledBackground" : "clickedBackground"]};
  }
`;