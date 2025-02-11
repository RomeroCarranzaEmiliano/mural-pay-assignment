"use server";

import CreateAccountView from "@/views/create-account/create-account-view";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function page() {
  const customerId = (await cookies()).get("customerId");
  if (typeof customerId != typeof undefined) return redirect("/");

  return <CreateAccountView />;
}
