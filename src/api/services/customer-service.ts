"use server";
import { cookies } from "next/headers";
import API from "../interceptor";
import { ServiceError } from "./service-error";

type TCreateCustomerBody = {
  name: string;
  organizationType?: string;
};
export const createCustomer = async (body: TCreateCustomerBody) => {
  try {
    const customer = (
      await API.post("/customers/", {
        ...body,
        organizationType: "INDIVIDUAL",
      })
    ).data;
    (await cookies()).set("customerId", customer.id, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });
  } catch {
    throw new ServiceError("Failed to create customer.");
  }
};

export const logout = async () => {
  try {
    (await cookies()).delete("customerId");
  } catch {
    throw new ServiceError("Failed to logout.");
  }
};

export const signin = async (customerId: string) => {
  try {
    (await cookies()).set("customerId", customerId, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
  } catch {
    throw new ServiceError("Failed to signin.");
  }
};

export const getCustomer = async (customerId: string) =>
  await API.get(`/customers/${customerId}`);
