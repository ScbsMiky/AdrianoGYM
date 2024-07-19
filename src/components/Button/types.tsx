import { ButtonVariants } from "./styles";
import { CSSProperties } from "styled-components";

export type IButton = {
  style?: CSSProperties;
  variant?: keyof typeof ButtonVariants;
  
  slim?: boolean;
  center?: boolean;
  disabled?: boolean;

  children?: JSX.Element[ ] | JSX.Element;

  onClick?( ): void;
};