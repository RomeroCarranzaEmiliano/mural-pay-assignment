import { ShieldCheck, ShieldMinus } from "lucide-react";
import { Card } from "../ui/card";
import { DepositAccount } from "@/api/types/account";

export default function DepositBankCard({
  depositAccount,
}: {
  depositAccount: DepositAccount;
}) {
  return (
    <Card className=" p-6 flex w-full">
      <div className="grid grid-flow-row gap-1 w-full">
        <div className="relative flex flex-row items-center gap-1">
          <div className="text-lg font-bold">{depositAccount.bankName}</div>
          <div className="flex">
            {depositAccount.status == "ACTIVATED" ? (
              <div className="flex items-center group relative">
                <ShieldCheck className="text-green-400 w-5 h-5" />
                <div className="group-hover:opacity-100 opacity-0 transition-opacity text-green-400 text-xs italic">
                  ACTIVATED
                </div>
              </div>
            ) : (
              <div className="flex items-center group relative">
                <ShieldMinus className="text-red-400 w-5 h-5" />
                <div className="group-hover:opacity-100 opacity-0 transition-opacity text-red-400 text-xs italic">
                  DEACTIVATED
                </div>
              </div>
            )}
          </div>
          <div className="absolute right-0 text-xs font-bold">
            {depositAccount.currency}
          </div>
        </div>
        <div className="relative flex flex-row items-center">
          <div className="text-xs">Address</div>
          <div className="absolute right-0 text-xs ">
            {depositAccount.bankAddress}
          </div>
        </div>
        <div className="relative flex flex-row items-center">
          <div className="text-xs">Routing number</div>
          <div className="absolute right-0 text-xs ">
            {depositAccount.bankRoutingNumber}
          </div>
        </div>
        <div className="relative flex flex-row items-center">
          <div className="text-xs">Account number</div>
          <div className="absolute right-0 text-xs ">
            {depositAccount.bankAccountNumber}
          </div>
        </div>
        <div className="relative flex flex-row items-center">
          <div className="text-xs">Benficiary name</div>
          <div className="absolute right-0 text-xs ">
            {depositAccount.bankBeneficiaryName}
          </div>
        </div>
        <div className="relative flex flex-row items-center">
          <div className="text-xs">Beneficiary address</div>
          <div className="absolute right-0 text-xs ">
            {depositAccount.bankBeneficiaryAddress}
          </div>
        </div>
      </div>
    </Card>
  );
}
