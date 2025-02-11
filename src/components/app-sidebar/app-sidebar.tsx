"use client";

import { Banknote, Home, Loader2, LogOut } from "lucide-react";

import { logout } from "@/api/services/customer-service";
import { Customer } from "@/api/types/customer";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useCustomer } from "@/hooks/use-customer";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export function AppSidebar({ hasCustomerId }: { hasCustomerId: boolean }) {
  const customer = useCustomer() as Customer;
  const [loading, setLoading] = useState<boolean>(false);

  const { toast } = useToast();
  const router = useRouter();

  const handleLogOut = () => {
    setLoading(true);
    logout()
      .then(() => router.push("/create-account"))
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Error logging out",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Sidebar defaultValue="home">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Mural Pay Code Challenge</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {hasCustomerId && (
                <>
                  <SidebarMenuItem key={"home"}>
                    <SidebarMenuButton asChild>
                      <Link href={"/"}>
                        <Home />
                        <span>Home</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem key={"transfer-request"}>
                    <SidebarMenuButton asChild>
                      <Link href={"/transfer-request"}>
                        <Banknote />
                        <span>Transfer</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {hasCustomerId && (
          <div className="grid grid-flow-row absolute bottom-0 w-full mb-4 gap-2">
            <div className="flex w-full content-center justify-center items-center">
              {customer.name}
            </div>
            <div className="flex w-full content-center justify-center items-center">
              <Button
                disabled={loading}
                variant="link"
                className="flex gap-1"
                onClick={() => handleLogOut()}
              >
                {!loading && <LogOut />}
                {loading && <Loader2 className="animate-spin" />}
                Log out
              </Button>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
