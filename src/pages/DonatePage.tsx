
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCrowdfundingContract } from '@/hooks/useCrowdfundingContract';
import { useAccount } from 'wagmi';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CampaignStatus } from '@/utils/contracts/medicalCrowdfunding';
import { useActiveCampaigns } from '@/hooks/useActiveCampaigns';

const formSchema = z.object({
  campaignId: z.string().min(1, "Please select or enter a campaign ID"),
  amount: z.string().min(1, "Please enter an amount to donate"),
});

const DonatePage = () => {
  const { isConnected } = useAccount();
  const navigate = useNavigate();
  const { donateToCampaign } = useCrowdfundingContract();
  const { activeCampaigns, isLoading: campaignsLoading } = useActiveCampaigns();
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      campaignId: "",
      amount: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!isConnected) {
      return;
    }

    const success = await donateToCampaign(
      parseInt(values.campaignId),
      parseFloat(values.amount)
    );

    if (success) {
      navigate('/');
    }
  };

  const handleCampaignSelect = (campaignId: string) => {
    form.setValue('campaignId', campaignId);
    setSelectedCampaign(activeCampaigns?.find(c => c.id.toString() === campaignId));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Donate to a Campaign</h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="campaignId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Campaign</FormLabel>
                        <Select onValueChange={handleCampaignSelect} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a campaign" />
                          </SelectTrigger>
                          <SelectContent>
                            {activeCampaigns?.map((campaign) => (
                              <SelectItem key={campaign.id} value={campaign.id.toString()}>
                                Campaign #{campaign.id} - {campaign.patientDetails.fullName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount (ETH)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" placeholder="0.0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" disabled={!isConnected}>
                    {isConnected ? "Donate" : "Connect Wallet to Donate"}
                  </Button>
                </form>
              </Form>
            </div>

            {selectedCampaign && (
              <Card>
                <CardHeader>
                  <CardTitle>Campaign Details</CardTitle>
                  <CardDescription>Campaign #{selectedCampaign.id}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Patient Information</h3>
                    <p>Name: {selectedCampaign.patientDetails.fullName}</p>
                    <p>Location: {selectedCampaign.patientDetails.residenceLocation}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Campaign Status</h3>
                    <p>Amount Needed: ${selectedCampaign.amountNeededUSD.toString()} USD</p>
                    <p>Amount Raised: ${selectedCampaign.donatedAmount.toString()} USD</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Patient's Comment</h3>
                    <p>{selectedCampaign.comment}</p>
                  </div>
                  {selectedCampaign.consent && (
                    <div>
                      <h3 className="font-semibold">Shared Documents</h3>
                      <ul className="list-disc pl-4">
                        {selectedCampaign.consent.shareDiagnosisReport && (
                          <li>Diagnosis Report</li>
                        )}
                        {selectedCampaign.consent.shareDoctorsLetter && (
                          <li>Doctor's Letter</li>
                        )}
                        {selectedCampaign.consent.shareGovernmentID && (
                          <li>Government ID</li>
                        )}
                        {selectedCampaign.consent.sharePatientPhoto && (
                          <li>Patient Photo</li>
                        )}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DonatePage;
