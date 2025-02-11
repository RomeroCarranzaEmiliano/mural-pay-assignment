"use server";

import SignInView from "@/views/sign-in/sign-in";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function page() {
  const customerId = (await cookies()).get("customerId");
  if (typeof customerId != typeof undefined) return redirect("/");

  return <SignInView />;
}
