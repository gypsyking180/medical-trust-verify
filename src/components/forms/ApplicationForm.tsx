
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
import { Check, Upload } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAccount } from 'wagmi';
import { useVerifierContract } from '@/hooks/useVerifierContract';
import { useNavigate } from 'react-router-dom';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

// Define the form schema
const baseFormSchema = z.object({
  fullName: z.string().min(1, "Full name is required").max(56, "Name cannot exceed 56 characters"),
  contactInfo: z.string().min(1, "Contact information is required").max(56, "Contact info cannot exceed 56 characters"),
  governmentIDImage: z
    .instanceof(FileList)
    .refine((files) => files?.length === 1, "Government ID image is required")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      "Max file size is 5MB"
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported"
    ),
});

const genesisDaoSchema = baseFormSchema.extend({
  professionalDocsImage: z
    .instanceof(FileList)
    .optional()
    .refine(
      (files) => !files?.length || files?.[0]?.size <= MAX_FILE_SIZE,
      "Max file size is 5MB"
    )
    .refine(
      (files) => !files?.length || ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported"
    ),
});

const healthProSchema = baseFormSchema.extend({
  professionalDocsImage: z
    .instanceof(FileList)
    .refine((files) => files?.length === 1, "Professional documents are required")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      "Max file size is 5MB"
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported"
    ),
});

interface ApplicationFormProps {
  type: 'Genesis' | 'HealthProfessional' | 'Dao';
  title: string;
  description: string;
}

const ImagePreview = ({ file }: { file: File | null }) => {
  if (!file) return null;

  return (
    <div className="mt-2">
      <img
        src={URL.createObjectURL(file)}
        alt="Preview"
        className="max-w-[200px] h-auto rounded-md border border-gray-200"
      />
    </div>
  );
};

export const ApplicationForm: React.FC<ApplicationFormProps> = ({ type, title, description }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isConnected } = useAccount();
  const navigate = useNavigate();
  const { applyAsGenesis, applyAsHealthPro, applyAsDao } = useVerifierContract();
  
  const formSchema = type === 'HealthProfessional' ? healthProSchema : genesisDaoSchema;
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

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
      // Convert images to base64
      const governmentIDBase64 = await handleImageToBase64(values.governmentIDImage[0]);
      const professionalDocsBase64 = values.professionalDocsImage?.[0] 
        ? await handleImageToBase64(values.professionalDocsImage[0])
        : '';

      if (type === 'Genesis') {
        success = await applyAsGenesis(
          values.fullName,
          values.contactInfo,
          governmentIDBase64,
          professionalDocsBase64
        );
      } else if (type === 'HealthProfessional') {
        success = await applyAsHealthPro(
          values.fullName,
          values.contactInfo,
          governmentIDBase64,
          professionalDocsBase64
        );
      } else if (type === 'Dao') {
        success = await applyAsDao(
          values.fullName,
          values.contactInfo,
          governmentIDBase64
        );
      }

      if (success) {
        toast({
          title: "Application Submitted",
          description: "Your application has been submitted successfully.",
        });
        navigate('/');
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const governmentIDFile = form.watch("governmentIDImage")?.[0] || null;
  const professionalDocsFile = form.watch("professionalDocsImage")?.[0] || null;

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
              name="governmentIDImage"
              render={({ field: { onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Government-issued ID</FormLabel>
                  <FormControl>
                    <div className="flex flex-col gap-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          onChange(e.target.files);
                        }}
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-medical-blue file:text-white hover:file:bg-medical-blue/90"
                      />
                      <ImagePreview file={governmentIDFile} />
                    </div>
                  </FormControl>
                  <p className="text-xs text-muted-foreground">Upload a clear image of your government-issued ID (max 5MB)</p>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {(type === 'Genesis' || type === 'HealthProfessional') && (
              <FormField
                control={form.control}
                name="professionalDocsImage"
                render={({ field: { onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>
                      Professional Documents
                      {type === 'HealthProfessional' && <span className="text-red-500">*</span>}
                    </FormLabel>
                    <FormControl>
                      <div className="flex flex-col gap-2">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            onChange(e.target.files);
                          }}
                          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-medical-blue file:text-white hover:file:bg-medical-blue/90"
                        />
                        <ImagePreview file={professionalDocsFile} />
                      </div>
                    </FormControl>
                    <p className="text-xs text-muted-foreground">
                      {type === 'HealthProfessional' 
                        ? "Upload an image of your medical license or certification (max 5MB)"
                        : "Optional: Upload any additional supporting documents (max 5MB)"}
                    </p>
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
                <li>Images must be clear and legible.</li>
                <li>Maximum file size: 5MB per image.</li>
                <li>Accepted formats: JPG, JPEG, PNG, WebP.</li>
                <li>Applications are subject to community voting for approval.</li>
                <li>You must connect your wallet to complete the submission process.</li>
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
