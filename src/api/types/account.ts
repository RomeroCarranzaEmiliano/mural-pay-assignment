import { CurrencyCode } from "./currency";
import { Customer } from "./customer";

export type Blockchain = "ETHEREUM" | "POLYGON" | "BASE" | "CELO";
export type CustomerType = "BUSINESS" | "INDIVIDUAL";
export type Status = "INACTIVE" | "PENDING" | "COMPLETE" | "ERROR" | "REJECTED";
export type Stage = "TOS" | "AWAITING_KYC" | "COMPLETE" | "REJECTED";
export type DepositAccountStatus = "ACTIVATED" | "DEACTIVATED";

export type Balance = {
  balance: number;
  tokenSymbol: string;
};

export type DepositAccount = {
  id: string;
  status: DepositAccountStatus;
  currency: CurrencyCode;
  bankBeneficiaryName: string;
  bankBeneficiaryAddress: string;
  bankName: string;
  bankAddress: string;
  bankRoutingNumber: string;
  bankAccountNumber: string;
  paymentRails: string[];
};

export type Account = {
  id: string;
  createdAt: string; // ISO date-time
  updatedAt: string; // ISO date-time
  name: string;
  blockchain: Blockchain;
  address: string;
  balance: Balance;
  isApiEnabled: boolean;
  isPending: boolean;
  customer: Customer;
};