
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FileText, Upload } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';
import { useCrowdfundingContract } from '@/hooks/useCrowdfundingContract';

// Define the form schema for campaign appeal
const appealFormSchema = z.object({
  campaignId: z.coerce.number().min(0, {
    message: "Campaign ID is required.",
  }),
  additionalDocument: z.string().min(1, {
    message: "Additional supporting document is required for appeal.",
  }),
  appealReason: z.string().min(10, {
    message: "Please provide a detailed reason for your appeal."
  }).max(500, {
    message: "Appeal reason must be less than 500 characters."
  }),
});

type AppealFormValues = z.infer<typeof appealFormSchema>;

const AppealCampaign = () => {
  const navigate = useNavigate();
  const { appealCampaign, isLoading } = useCrowdfundingContract();

  const form = useForm<AppealFormValues>({
    resolver: zodResolver(appealFormSchema),
    defaultValues: {
      campaignId: 0,
      additionalDocument: "",
      appealReason: "",
    },
  });

  // Mock function to simulate file upload to IPFS
  const uploadToIPFS = async (file: File): Promise<string> => {
    // Simulate uploading to IPFS
    return new Promise((resolve) => {
      setTimeout(() => {
        const fakeIPFSHash = `ipfs://${Math.random().toString(36).substring(2, 15)}`;
        resolve(fakeIPFSHash);
      }, 1000);
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      try {
        const ipfsHash = await uploadToIPFS(file);
        form.setValue("additionalDocument", ipfsHash);
      } catch (error) {
        console.error("Error uploading file to IPFS:", error);
      }
    }
  };

  const onSubmit = async (data: AppealFormValues) => {
    try {
      const success = await appealCampaign(data.campaignId);
      
      if (success) {
        navigate("/campaigns");
      }
    } catch (error) {
      console.error("Error appealing campaign:", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Appeal Campaign | careBridge</title>
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-1 bg-gray-50 py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-medical-blue sm:text-4xl">
                  Appeal a Rejected Campaign
                </h1>
                <p className="mt-2 text-lg text-gray-500">
                  If your campaign was rejected, you can appeal the decision by providing additional information.
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Campaign Appeal</CardTitle>
                  <CardDescription>
                    Please provide the campaign ID and reason for your appeal.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                      <FormField
                        control={form.control}
                        name="campaignId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Campaign ID</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="0" {...field} />
                            </FormControl>
                            <FormDescription>
                              Enter the ID of the campaign you wish to appeal
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div>
                        <FormLabel>Additional Supporting Document</FormLabel>
                        <div className="mt-2">
                          <Input
                            type="file"
                            onChange={handleFileUpload}
                          />
                        </div>
                        {form.watch("additionalDocument") && (
                          <p className="text-sm text-green-600 mt-2">
                            ✓ File uploaded: {form.watch("additionalDocument")}
                          </p>
                        )}
                        {form.formState.errors.additionalDocument?.message && (
                          <p className="text-sm text-red-500 mt-2">
                            {form.formState.errors.additionalDocument?.message}
                          </p>
                        )}
                        <FormDescription className="mt-2">
                          Upload additional documentation to support your appeal
                        </FormDescription>
                      </div>

                      <FormField
                        control={form.control}
                        name="appealReason"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Reason for Appeal</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <FileText className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Textarea 
                                  placeholder="Please explain why your campaign should be reconsidered" 
                                  className="pl-8 min-h-[150px]" 
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormDescription>
                              Provide a detailed explanation of why your campaign should be reconsidered
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Submitting Appeal..." : "Submit Appeal"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
                <CardFooter className="border-t pt-6">
                  <p className="text-sm text-muted-foreground">
                    Campaigns can only be appealed once. Please ensure you provide all relevant information in your appeal.
                  </p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default AppealCampaign;
