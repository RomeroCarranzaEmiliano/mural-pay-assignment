"use client";
import { Customer } from "@/api/types/customer";
import { createContext, ReactNode, useContext } from "react";

class CustomerContextError extends Error {
  constructor(message: string = "Unkown error.") {
    super(message);
  }
}

const CustomerContext = createContext<Customer | null>(null);

export type TCustomerProvider = {
  children: ReactNode;
  customer: Customer | null;
};
export const CustomerProvider = ({ children, customer }: TCustomerProvider) => {
  return (
    <CustomerContext.Provider value={customer}>
      {children}
    </CustomerContext.Provider>
  );
};

export function useCustomer() {
  const context = useContext(CustomerContext);
  if (!context && context !== null) {
    throw new CustomerContextError(
      "useCustomer must be used within a CustomerProvider."
    );
  }

  return context;
}
