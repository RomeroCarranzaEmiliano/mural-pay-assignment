"use server";

import HomeView from "@/views/home/home-view";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const customerId = (await cookies()).get("customerId")?.value;
  if (customerId == undefined) return redirect("/create-account");

  return <HomeView />;
}
