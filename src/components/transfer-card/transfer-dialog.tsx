import { executeTransferRequest } from "@/api/services/transfer-request-service";
import { TransferRequest } from "@/api/types/transfer-request";
import { useToast } from "@/hooks/use-toast";
import {
    Ban,
    CheckCircle,
    CircleX,
    Loader2,
    LoaderCircle,
    ScanEye,
} from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";

type TTransferDialog = {
  transfer: TransferRequest|null;
  open: boolean;
  setOpen: (open: boolean) => void;
  reload: () => void;
};
export default function TransferDialog({
  transfer,
  open,
  setOpen,
  reload,
}: TTransferDialog) {
  const [loading, setLoading] = useState<boolean>(false);
  const [execute, setExecute] = useState<boolean>(false);

  const amount = transfer ? transfer.recipientsInfo[0].tokenAmount : 0;

  const { toast } = useToast();

  //   useEffect(() => {
  //     setTransferDetails(null);
  //     setLoading(false);
  //     if (!transfer) return;
  //     getTransferRequestDetails(transfer.id)
  //       .then((response) => {
  //         console.log("response transfer: ", response);
  //         setTransferDetails(response);
  //       })
  //       .catch((error) => {
  //         console.log(error.response);
  //       });
  //   }, [transfer]);

  const handleExecute = () => {
    if (!transfer) return;
    setLoading(true);
    executeTransferRequest(transfer.id)
      .then(() => {
        toast({
          title: "Transfer executed",
          description: "The transfer request has been executed successfully.",
        });
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Failed to execute transfer",
        });
      })
      .finally(() => {
        setLoading(false);
        setExecute(false);
        setOpen(false);
        reload();
      });
  };

  return (
    transfer && (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transfer details</DialogTitle>
            <DialogDescription className="p-2">
              <div className="flex flex-row items-center w-full gap-4 mb-2 border border-gray-200 p-2 rounded-md shadow-sm">
                <div className="flex flex-row items-center w-full">
                  <div className="flex items-center">
                    {transfer.status == "PENDING" && (
                      <LoaderCircle className="text-gray-400 animate-spin" />
                    )}
                    {transfer.status == "CANCELLED" && (
                      <Ban className="text-red-400" />
                    )}
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
                          {transfer.updatedAt
                            .split("T")[0]
                            .replaceAll("-", "/")}
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
                  <div
                    className={
                      "text-lg font-bold flex flex-row gap-1 justify-end"
                    }
                  >
                    {amount.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </div>
                </div>
              </div>
              {transfer && (
                <div className="animate-in">
                  <div className="mt-2 mb-1 font-bold">Transfer details</div>
                  <div className="relative flex flex-row items-center">
                    <div className="text-xs">Created at</div>
                    <div className="absolute right-0 text-xs ">
                      {transfer.createdAt.split("T")[0].replaceAll("-", "/")}
                    </div>
                  </div>
                  <div className="relative flex flex-row items-center">
                    <div className="text-xs">Updated at</div>
                    <div className="absolute right-0 text-xs ">
                      {transfer.updatedAt.split("T")[0].replaceAll("-", "/")}
                    </div>
                  </div>
                  <div className="relative flex flex-row items-center">
                    <div className="text-xs">Recipient transfer type</div>
                    <div className="absolute right-0 text-xs ">
                      {transfer.recipientsInfo[0].recipientTransferType}
                    </div>
                  </div>

                  <div className="mt-2 mb-1 font-bold">Fiat details</div>
                  <div className="relative flex flex-row items-center">
                    <div className="text-xs">Withdrawal request status</div>
                    <div className="absolute right-0 text-xs ">
                      {transfer.recipientsInfo[0].fiatDetails
                        ? transfer.recipientsInfo[0].fiatDetails.withdrawalRequestStatus.replace(
                            "_",
                            " "
                          )
                        : "-"}
                    </div>
                  </div>

                  <div className="mt-2 mb-1 font-bold">Blockchain details</div>
                  <div className="relative flex flex-row items-center">
                    <div className="text-xs">Wallet address</div>
                    <div className="absolute right-0 text-xs ">
                      {transfer.recipientsInfo[0].blockchainDetails
                        ? transfer.recipientsInfo[0].blockchainDetails
                            .walletAddress
                        : "-"}
                    </div>
                  </div>
                  <div className="relative flex flex-row items-center">
                    <div className="text-xs">Blockchain</div>
                    <div className="absolute right-0 text-xs ">
                      {transfer.recipientsInfo[0].blockchainDetails
                        ? transfer.recipientsInfo[0].blockchainDetails
                            .blockchain
                        : "-"}
                    </div>
                  </div>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          {transfer && transfer.status == "IN_REVIEW" && (
            <DialogFooter>
              <div className="flex items-start content-start justify-start w-full gap-4">
                {!execute && (
                  <Button
                    className="bg-green-500 hover:bg-green-500/90 text-white"
                    onClick={() => setExecute(true)}
                  >
                    EXECUTE
                  </Button>
                )}
                {execute && (
                  <Button
                    disabled={loading}
                    variant="outline"
                    onClick={() => setExecute(false)}
                  >
                    CANCEL
                  </Button>
                )}
                {execute && (
                  <Button
                    disabled={loading}
                    className="bg-green-500 hover:bg-green-500/90 text-white w-full"
                    onClick={() => handleExecute()}
                  >
                    CONFIRM EXECUTION{" "}
                    {loading && <Loader2 className="animate-spin" />}
                  </Button>
                )}
              </div>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    )
  );
}
