"use client";
import {
  Ban,
  CheckCircle,
  CircleX,
  LoaderCircle,
  ScanEye
} from "lucide-react";
import { Card } from "../ui/card";
import { TransferRequest } from "@/api/types/transfer-request";

type TTransferCard = {
  transfer: TransferRequest;
  select: () => void;
};
export default function TransferCard({ transfer, select }: TTransferCard) {;
  const amount = transfer.recipientsInfo[0].tokenAmount;

  return (
    <Card className="w-full cursor-pointer hover:shadow-md" onClick={() => select()}>
      <div className="p-2 flex flex-row items-center w-full gap-4">
        <div className="flex flex-row items-center w-full">
          <div className="flex items-center">
            {transfer.status == "PENDING" && (
              <LoaderCircle className="text-gray-400 animate-spin" />
            )}
            {transfer.status == "CANCELLED" && <Ban className="text-red-400" />}
            {transfer.status == "FAILED" && (
              <CircleX className="text-red-400" />
            )}
            {transfer.status == "IN_REVIEW" && (
              <ScanEye className="text-gray-400" />
            )}
            {transfer.status == "EXECUTED" && (
              <CheckCircle className="text-green-400" />
            )}
          </div>
          <div className="flex flex-col ml-2 w-full">
            <div className="text-md font-bold flex flex-row items-center gap-2">
              <div className="text-xs font-normal flex gap-2">
                <span>{transfer.status.replace("_", " ")}</span>
                <span className="text-gray-400 italic">
                  {transfer.updatedAt.split("T")[0].replaceAll("-", "/")}
                </span>
              </div>
            </div>
            <div className="text-xs">
              {transfer.memo ? (
                transfer.memo.substring(0, 20) +
                (transfer.memo.length > 20 ? "..." : "")
              ) : (
                <span className="italic text-gray-400">no memo</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col w-fit">
          <div className={"text-lg font-bold flex flex-row gap-1 justify-end"}>
            {amount.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </div>
        </div>
      </div>
    </Card>
  );
}
