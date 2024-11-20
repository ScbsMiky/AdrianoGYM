import { Global } from "../../libs/global";

export type ICustumerField = {
  viewMessageSent?: boolean;
  
  ref?: React.RefObject<HTMLDivElement>;
  custumer?: Global.CustumerProps;
  children?: JSX.Element[ ] | JSX.Element;

  onChange?(payments: Global.PaymentProps[ ]): void;
};
