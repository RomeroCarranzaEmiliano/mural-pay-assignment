import { Blockchain } from "./account";

export type PayoutStatus =
  | "IN_REVIEW"
  | "CANCELLED"
  | "PENDING"
  | "EXECUTED"
  | "FAILED";

export type RecipientTransferType = "FIAT" | "BLOCKCHAIN";

export type WithdrawalRequestStatus =
  | "AWAITING_SOURCE_DEPOSIT"
  | "PENDING"
  | "COMPLETED"
  | "FAILED"
  | "CANCELED";

export type RecipientsInfo = {
  id: string;
  createdAt: string; // ISO date-time
  updatedAt: string; // ISO date-time
  recipientTransferType: RecipientTransferType;
  tokenAmount: number;
  fiatDetails?: {
    withdrawalRequestStatus: WithdrawalRequestStatus;
  };
  blockchainDetails?: {
    walletAddress: string;
    blockchain: Blockchain;
  };
};

export type TransferRequest = {
  id: string;
  createdAt: string; // ISO date-time
  updatedAt: string; // ISO date-time
  payoutAccountId: string;
  transactionHash?: string; // Present only when status is EXECUTED
  memo?: string;
  status: PayoutStatus;
  recipientsInfo: RecipientsInfo[];
};

export type TransferRequestList = {
    total: number;
    nextId?: string;
    results: TransferRequest[];
}
