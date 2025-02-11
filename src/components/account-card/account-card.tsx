"use client";
import { Customer } from "@/api/types/customer";
import { useCustomer } from "@/hooks/use-customer";
import { useToast } from "@/hooks/use-toast";
import { TokenIcon } from "@web3icons/react";
import { Copy, Eye, EyeOff, Network } from "lucide-react";
import { useState } from "react";
import DepositBankCard from "../deposit-bank-card/deposit-bank-card";
import { Card, CardHeader } from "../ui/card";

export default function AccountCard() {
  const [showBalance, setShowBalance] = useState<boolean>(true);
  const { toast } = useToast();

  const customer = useCustomer() as Customer;

  return (
    <div className="flex flex-col w-fit gap-4">
      <Card className="flex w-fit">
        <CardHeader className="grid grid-flow-row">
          <div className="flex gap-1 text-xs items-center">
            Total balance{" "}
            {!showBalance ? (
              <Eye
                className="w-[1rem] h-[1rem] cursor-pointer"
                onClick={() => setShowBalance(true)}
              />
            ) : (
              <EyeOff
                className="w-[1rem] h-[1rem] cursor-pointer"
                onClick={() => setShowBalance(false)}
              />
            )}
          </div>
          <div className="flex gap-2 text-xs items-center">
            <div className="text-5xl font-semibold">
              ${showBalance ? customer.account.balance.balance : "***"}
            </div>
            <div className="text-md">
              <TokenIcon
                symbol={customer.account.balance.tokenSymbol.toLowerCase()}
                size={32}
                variant="branded"
              />
              {customer.account.balance.tokenSymbol}
            </div>
          </div>
          <div className="flex gap-1 items-center">
            <div
              onClick={() => {
                navigator.clipboard
                  .writeText(customer.account.address)
                  .then(() => {
                    toast({ title: "Account address copied to clipboard" });
                  });
              }}
              className="text-xs p-1 hover:bg-green-500/15 cursor-copy flex gap-1 rounded-md"
            >
              {customer.account.address} <Copy className="w-[1rem] h-[1rem]" />
            </div>
          </div>
          <div className="flex gap-1 items-center">
            <div className="text-xs p-1 flex gap-1">
              <Network className="w-[1rem] h-[1rem]" />{" "}
              {customer.account.blockchain}
            </div>
          </div>
        </CardHeader>
      </Card>
      {customer.account.depositAccount && (
        <DepositBankCard depositAccount={customer.account.depositAccount} />
      )}
    </div>
  );
}
