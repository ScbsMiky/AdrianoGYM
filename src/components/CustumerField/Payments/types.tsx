import { Global } from "../../../libs/global";

export type ICustumerPayments = {
  payments: Global.PaymentProps[ ];
  
  onChange?(payments: Global.PaymentProps[ ]): void;
};