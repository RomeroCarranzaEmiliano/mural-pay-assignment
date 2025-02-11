"use client";
import {
  getTransferRequests,
  TGetTransferRequests,
} from "@/api/services/transfer-request-service";
import { Customer } from "@/api/types/customer";
import { TransferRequest } from "@/api/types/transfer-request";
import AccountCard from "@/components/account-card/account-card";
import PendingCustomerCard from "@/components/pending-customer-card/pending-customer-card";
import TransferCard from "@/components/transfer-card/transfer-card";
import TransferDialog from "@/components/transfer-card/transfer-dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCustomer } from "@/hooks/use-customer";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomeView() {
  const [transferRequests, setTransferRequests] = useState<
    TransferRequest[] | null
  >(null);
  const [selectedTransfer, setSelectedTransfer] =
    useState<TransferRequest | null>(null);
  const [openTransfer, setOpenTransfer] = useState<boolean>(false);
  const [nextId, setNextId] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  const customer = useCustomer() as Customer;

  const { toast } = useToast();

  const handleSelect = (transfer: TransferRequest) => {
    setSelectedTransfer(transfer);
    setOpenTransfer(true);
  };

  useEffect(() => {
    if (!customer) return;
    if (!customer.account) return;

    getTransferRequests(customer.account.id).then((response) => {
      if (response.nextId) setNextId(response.nextId);
      setTransferRequests(response.results);
    });
  }, [customer]);

  const handleReload = () => {
    if (!customer) return;
    if (!customer.account) return;

    getTransferRequests(customer.account.id).then((response) => {
      if (response.nextId) setNextId(response.nextId);
      setTransferRequests(response.results);
    });
  };

  const handleLoadMore = () => {
    if (!customer) return;
    if (!customer.account) return;
    if (!nextId) return;

    setLoadingMore(true);
    getTransferRequests(customer.account.id, nextId, 10)
      .then((response: TGetTransferRequests) => {
        if (response.nextId) setNextId(response.nextId);
        else setNextId(null);
        setTransferRequests((prev: TransferRequest[] | null) =>
          prev == null ? prev : [...prev, ...response.results]
        );
        setLoadingMore(false);
      })
      .catch(() => {
        setLoadingMore(false);
        toast({
          variant: "destructive",
          title: "Error loading more transfer requests",
        });
      });
  };

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center w-full gap-4 p-4">
      <div className="flex w-fit">
        {customer.account ? <AccountCard /> : <PendingCustomerCard />}
      </div>
      <div className="grid grid-flow-row mt-4 gap-2 w-fit">
        <div className="grid grid-cols-2">
          <div className="text-xl font-bold text-left flex items-center">
            Transfers
          </div>
          <div className="flex justify-end items-center">
            <Link href="/transfer-request">
              <Button variant="ghost" className="">
                <Plus /> New transfer
              </Button>
            </Link>
          </div>
        </div>
        {transferRequests && transferRequests.length == 0 && (
          <div className="text-gray-400 italic">
            You don&apos;t have any transfer requests
          </div>
        )}
        {transferRequests ? (
          transferRequests.map((transfer: TransferRequest, index: number) => (
            <TransferCard
              key={"transfer-request-" + index}
              transfer={transfer}
              select={() => handleSelect(transfer)}
            />
          ))
        ) : (
          <div className="flex flex-col gap-2">
            <Skeleton className="w-full h-14 bg-gray-200" />
            <Skeleton className="w-full h-14 bg-gray-200" />
            <Skeleton className="w-full h-14 bg-gray-200" />
          </div>
        )}
        {nextId != null && !loadingMore && (
          <div>
            <Button
              variant="ghost"
              className="hover:bg-gray-100 w-full"
              onClick={() => handleLoadMore()}
            >
              Load more
            </Button>
          </div>
        )}
        {transferRequests && nextId == null && (
          <div className="text-gray-400 italic">
            There are no more transfer requests
          </div>
        )}
        {loadingMore && (
          <div className="flex flex-col gap-2">
            <Skeleton className="w-full h-14 bg-gray-200" />
            <Skeleton className="w-full h-14 bg-gray-200" />
            <Skeleton className="w-full h-14 bg-gray-200" />
          </div>
        )}
        <TransferDialog
          transfer={selectedTransfer}
          open={openTransfer}
          setOpen={setOpenTransfer}
          reload={handleReload}
        />
      </div>
    </div>
  );
}
