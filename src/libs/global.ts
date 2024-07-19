export module Global {
  export const API = "https://gym-management.glitch.me";

  export type PaymentProps = {
    id: string;
    at: string;
    payiedAt: string;
    description: string;

    value: number;
    payied: boolean;
  };
  
  export type CustumerProps = {
    id: string;
    createdAt: string;

    public: {
      name: string;
      gender: string;

      inactive: false;
    };

    private: {
      cpf: string;
      email: string;
      phone: string;

      bornAt: string;
      
      payments: PaymentProps[ ];
      inactiveDates: string[ ];
    };
  };

  export function GetAuthorization( ) {
    return window.localStorage.getItem("authorization");
  };
};