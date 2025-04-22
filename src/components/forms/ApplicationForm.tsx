
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAccount } from 'wagmi';
import { useVerifierContract } from '@/hooks/useVerifierContract';
import { useNavigate } from 'react-router-dom';

// Define the form schema
const baseFormSchema = z.object({
  fullName: z.string().min(1, "Full name is required").max(56, "Name cannot exceed 56 characters"),
  contactInfo: z.string().min(1, "Contact information is required").max(56, "Contact info cannot exceed 56 characters"),
  governmentID: z.string().min(1, "Government ID is required").max(56, "ID cannot exceed 56 characters"),
});

const genesisDaoSchema = baseFormSchema.extend({
  professionalDocs: z.string().max(56, "Professional documents cannot exceed 56 characters").optional(),
});

const healthProSchema = baseFormSchema.extend({
  professionalDocs: z.string().min(1, "Professional documents are required for health professionals").max(56, "Documents cannot exceed 56 characters"),
});

interface ApplicationFormProps {
  type: 'Genesis' | 'HealthProfessional' | 'Dao';
  title: string;
  description: string;
}

export const ApplicationForm: React.FC<ApplicationFormProps> = ({ type, title, description }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isConnected } = useAccount();
  const navigate = useNavigate();
  const { applyAsGenesis, applyAsHealthPro, applyAsDao } = useVerifierContract();
  
  // Select the appropriate schema based on application type
  const formSchema = type === 'HealthProfessional' ? healthProSchema : genesisDaoSchema;
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      contactInfo: '',
      governmentID: '',
      professionalDocs: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!isConnected) {
      toast({
        title: "Wallet Connection Required",
        description: "Please connect your wallet to submit an application.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    let success = false;

    try {
      if (type === 'Genesis') {
        success = await applyAsGenesis(
          values.fullName,
          values.contactInfo,
          values.governmentID,
          values.professionalDocs || ''
        );
      } else if (type === 'HealthProfessional') {
        success = await applyAsHealthPro(
          values.fullName,
          values.contactInfo,
          values.governmentID,
          values.professionalDocs || ''
        );
      } else if (type === 'Dao') {
        success = await applyAsDao(
          values.fullName,
          values.contactInfo,
          values.governmentID
        );
      }

      if (success) {
        navigate('/');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl medical-heading">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4 pt-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Legal Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your full legal name" 
                      maxLength={56} 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="contactInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Information</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Email or phone number" 
                      maxLength={56} 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="governmentID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Government-issued ID Reference</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="ID number (will be verified)" 
                      maxLength={56} 
                      {...field} 
                    />
                  </FormControl>
                  <p className="text-xs text-muted-foreground">Enter your ID number for verification purposes.</p>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {(type === 'Genesis' || type === 'HealthProfessional') && (
              <FormField
                control={form.control}
                name="professionalDocs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {type === 'HealthProfessional' ? 'Professional Credentials' : 'Additional Information'}
                      {type === 'HealthProfessional' && <span className="text-red-500">*</span>}
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={type === 'HealthProfessional' 
                          ? "Enter your medical license, certifications, or other credentials" 
                          : "Any additional information to support your application (optional)"}
                        rows={4}
                        maxLength={56}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            <div className="bg-muted p-3 rounded-md text-sm">
              <p className="font-medium flex items-center gap-2">
                <Check size={16} className="text-medical-green" />
                Application Guidelines
              </p>
              <ul className="mt-2 space-y-1 text-muted-foreground pl-6 list-disc">
                <li>All submitted information will be verified on-chain.</li>
                <li>Applications are subject to community voting for approval.</li>
                <li>You must connect your wallet to complete the submission process.</li>
                <li>Maximum 56 characters per field is allowed.</li>
                {type === 'Genesis' && (
                  <li>Genesis applications are limited to 5 approved members total.</li>
                )}
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              disabled={isSubmitting || !isConnected} 
              className="w-full bg-medical-blue hover:bg-medical-blue/90"
            >
              {!isConnected ? "Connect Wallet to Submit" : 
                isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default ApplicationForm;
