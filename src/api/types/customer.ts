import { Account, Balance, DepositAccount } from "./account";

export type CustomerType = "BUSINESS" | "INDIVIDUAL";

export type Status = "INACTIVE" | "PENDING" | "COMPLETE" | "ERROR" | "REJECTED";

export type CustomerAccount = Omit<Account, "customer" | "balance"> & {
    balance: Balance;
    depositAccount: DepositAccount;
  };

export type Customer = {
    id: string;
    createdAt: string; // ISO date-time
    updatedAt: string; // ISO date-time
    name: string;
    customerType: CustomerType;
    status: Status;
    accountId: string;
    account: CustomerAccount;
    currenciesInfo: { currencyCode: string }[];
}