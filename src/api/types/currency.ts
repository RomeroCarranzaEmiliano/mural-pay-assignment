export type CurrencyCode =
  | "USD"
  | "COP"
  | "ARS"
  | "EUR"
  | "MXN"
  | "BRL"
  | "CLP"
  | "PEN"
  | "BOB"
  | "CRC"
  | "ZAR";
export type Stage = "TOS" | "AWAITING_KYC" | "COMPLETE" | "REJECTED";

export type CurrencyInfo = {
  currencyCode: CurrencyCode;
  stage: Stage;
  isRestricted: boolean;
  message: string;
};
