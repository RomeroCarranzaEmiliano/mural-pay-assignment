import { createTransferRequest } from "@/api/services/transfer-request-service";
import { Customer } from "@/api/types/customer";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCustomer } from "@/hooks/use-customer";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  memo: z.string().optional(),
  // recipients info
  name: z.string({ message: "The name is required." }),
  tokenAmount: z.string({ message: "The token amount is required." }),
  email: z.string({ message: "The email is required." }),
  recipientType: z.string({ message: "The recipien type is required." }),
  // wallet details
  walletAddress: z.string({ message: "The wallet address is required." }),
  blockchain: z.string({ message: "The blockchain is required." }),
});

export default function TransferRequestView() {
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      memo: "",
      name: "",
      tokenAmount: "",
      email: "",
      recipientType: "",
      walletAddress: "",
      blockchain: "",
    },
  });

  const customer = useCustomer() as Customer;
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!customer) return;
    setLoading(true);
    createTransferRequest({
      payoutAccountId: customer.account.id,
      memo: values.memo,
      recipientsInfo: [
        {
          name: values.name,
          tokenAmount: parseFloat(values.tokenAmount),
          email: values.email,
          recipientType: values.recipientType,
          recipientTransferType: "BLOCKCHAIN",
          walletDetails: {
            walletAddress: values.walletAddress,
            blockchain: values.blockchain,
          },
        },
      ],
    })
      .then(() => {
        toast({
          title: "Transfer request created",
          description: "Redirecting to home...",
        });
        router.push("/");
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Failed to create transfer request",
        });
        setLoading(false);
      });
  };

  return (
    <div className="relative flex px-12 content-center items-center justify-center w-full h-full">
      <Card className="relative flex flex-row p-4 w-fit">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-full gap-4"
          >
            <CardTitle>New transfer request</CardTitle>
            <div>
              <FormField
                control={form.control}
                name="memo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Memo</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Add a memo (optional)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <div className="font-bold text-md">Recipient information</div>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Add a name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tokenAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Token amount</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Add a token amount"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Add an email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="recipientType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recipient type</FormLabel>
                      <FormControl>
                        <Select
                          disabled={loading}
                          onValueChange={(value: string) => {
                            form.setValue("recipientType", value);
                          }}
                          value={field.value}
                        >
                          <SelectTrigger className="">
                            <SelectValue placeholder="Select a recipient type" />
                          </SelectTrigger>
                          <SelectContent {...field}>
                            <SelectItem value="INDIVIDUAL">
                              INDIVIDUAL
                            </SelectItem>
                            <SelectItem value="BUSINESS">BUSINESS</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="font-bold text-md">Recipient wallet address</div>
              <FormField
                control={form.control}
                name="walletAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Wallet address</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Add a wallet address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="blockchain"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blockchain</FormLabel>
                    <FormControl>
                      <Select
                        disabled={loading}
                        onValueChange={(value: string) => {
                          form.setValue("blockchain", value);
                        }}
                        value={field.value}
                      >
                        <SelectTrigger className="">
                          <SelectValue placeholder="Select a blockchain" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ETHEREUM">ETHEREUM</SelectItem>
                          <SelectItem value="POLYGON">POLYGON</SelectItem>
                          <SelectItem value="BASE">BASE</SelectItem>
                          <SelectItem value="CELO">CELO</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex w-full content-center items-center justify-end">
              <Button
                type="submit"
                className="w-fit bg-green-400 hover:bg-green-400/90 text-white"
                disabled={loading}
              >
                CREATE {loading && <Loader2 className="animate-spin" />}
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
