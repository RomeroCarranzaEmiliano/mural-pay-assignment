"use server";
import API from "../interceptor";
import { TransferRequest } from "../types/transfer-request";
import { ServiceError } from "./service-error";

type TBodyCreateTransferRequest = {
  payoutAccountId: string;
  memo?: string;
  recipientsInfo: {
    name: string;
    tokenAmount: number;
    email: string;
    recipientType: string;
    dateOfBirth?: string;
    phoneNumber?: string;
    recipientTransferType: "FIAT" | "BLOCKCHAIN";
    walletDetails: {
      walletAddress: string;
      blockchain: string;
    };
  }[];
};
export const createTransferRequest = async (
  body: TBodyCreateTransferRequest
) => {
  try {
    await API.post(`/transfer-requests`, body);
  } catch {
    throw new ServiceError("Failed to create transfer request.");
  }
};

export type TGetTransferRequests = {
  nextId: string | null;
  results: TransferRequest[];
};
export const getTransferRequests = async (
  accountId: string,
  nextId?: string,
  limit: number = 10
): Promise<TGetTransferRequests> => {
  try {
    const transferRequests = await API.get(`/transfer-requests`, {
      params: { nextId, limit },
    });
    const moreToLoad: boolean =
      transferRequests.data.nextId &&
      transferRequests.data.results.length == limit;
    return {
      nextId: moreToLoad ? transferRequests.data.nextId : null,
      results: transferRequests.data.results.filter(
        (transfer: TransferRequest) => transfer.payoutAccountId == accountId
      ),
    };
  } catch {
    throw new ServiceError("Failed to get transfer requests.");
  }
};

export const executeTransferRequest = async (transferRequestId: string) => {
  try {
    const apiKey = process.env.NEXT_PUBLIC_MURAL_TRANSFER_API_KEY;
    if (!apiKey)
      throw new ServiceError(
        "MURAL_TRANSFER_API_KEY not defined in environment."
      );
    await API.post(
      `/transfer-requests/execute`,
      { transferRequestId },
      { headers: { "mural-account-api-key": apiKey } }
    );
  } catch {
    throw new ServiceError("Failed to execute transfer request.");
  }
};
