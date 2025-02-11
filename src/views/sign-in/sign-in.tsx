"use client";
import { signin } from "@/api/services/customer-service";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SignInView() {
  const [loading, setLoading] = useState<boolean>(false);
  const [customerId, setCustomerId] = useState<string>("");

  const { toast } = useToast();
  const router = useRouter();

  const handleSignin = () => {
    if (customerId.length == 0) return;
    setLoading(true);
    signin(customerId).then(() => router.push("/")).catch(() => {
      toast({
        variant: "destructive",
        title: "Error signing in",
        description: "Please check your credentials.",
      });
    });
  };

  return (
    <div className="flex flex-col items-center content-center justify-center mt-4">
      <Card className="flex flex-col">
        <CardHeader>Sign in</CardHeader>
        <CardContent className="flex flex-col gap-4">
          <input
            className="border-2 border-gray-100 rounded-md px-4 py-2"
            placeholder="Customer id"
            onInput={(e: FormEvent<HTMLInputElement>) =>
              setCustomerId((e.target as HTMLInputElement).value)
            }
          />
          <input
            className="border-2 border-gray-100 rounded-md px-4 py-2"
            placeholder="Password"
          />
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => handleSignin()}
            disabled={loading || customerId.length == 0}
            className="bg-green-400 text-white hover:bg-green-400/90 disabled:bg-gray-400 "
          >
            SIGN IN {loading && <Loader2 className="animate-spin" />}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
