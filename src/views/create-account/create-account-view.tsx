"use client";
import { createCustomer } from "@/api/services/customer-service";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { BookUser, Loader2 } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function CreateAccountView() {
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  const { toast } = useToast();

  const handleCreate = () => {
    if (name.length == 0) return;
    setLoading(true);

    createCustomer({ name })
      .then(() => {})
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Error creating account",
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="grid grid-flow-row content-center items-center justify-center w-full">
      <div className="grid grid-flow-row gap-2 text-center text-gray-500 mt-4">
        <div className="text-2xl font-bold flex content-center justify-center items-center">
          <BookUser className="w-[25pt] h-[25pt]" /> Oops...
        </div>
        <div className="text-xl">
          You don&apos;t have an account. Get started by creating one...
        </div>
      </div>
      <div className="flex flex-col items-center content-center justify-center mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Create account</CardTitle>
          </CardHeader>
          <CardContent>
            <input
              disabled={loading}
              value={name}
              className="border-2 border-gray-100 rounded-md px-4 py-2"
              placeholder="Your full name"
              onInput={(e: FormEvent<HTMLInputElement>) =>
                setName((e.target as HTMLInputElement).value)
              }
            />
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => handleCreate()}
              disabled={name.length == 0 || loading}
              className="border-none bg-green-500 hover:bg-green-500/90 font-bold text-white px-4 py-2 rounded-md disabled:bg-gray-400 flex content-center items-center justify-center gap-1"
            >
              CREATE {loading && <Loader2 className="animate-spin" />}
            </Button>
          </CardFooter>
        </Card>
        <div className="mt-2">Already have an account? <Link href="sign-in" className="underlined text-blue-400">Sign in.</Link></div>
      </div>
    </div>
  );
}
