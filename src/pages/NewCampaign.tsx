
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, User, Calendar, Phone, MapPin, DollarSign, Clock, FileText, Upload, Shield, Check, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';
import { cn } from "@/lib/utils";
import { useCrowdfundingContract } from '@/hooks/useCrowdfundingContract';

// Define the form schema for campaign creation
const campaignFormSchema = z.object({
  // Patient information
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  dateOfBirth: z.date({
    required_error: "Date of birth is required.",
  }),
  contactInfo: z.string().min(5, {
    message: "Contact information must be at least 5 characters.",
  }),
  residenceLocation: z.string().min(5, {
    message: "Residence location must be at least 5 characters.",
  }),
  amountNeededUSD: z.coerce.number().min(100, {
    message: "Amount must be at least 100 USD.",
  }),
  duration: z.coerce.number().min(1, {
    message: "Duration must be at least 1 day.",
  }),
  comment: z.string().min(10, {
    message: "Comment must be at least 10 characters.",
  }).max(500, {
    message: "Comment must be less than 500 characters."
  }),
  walletAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/, {
    message: "Please enter a valid EVM wallet address.",
  }),

  // Documents
  diagnosisReportIPFS: z.string().min(1, {
    message: "Diagnosis report is required.",
  }),
  doctorsLetterIPFS: z.string().min(1, {
    message: "Doctor's letter is required.",
  }),
  governmentIDIPFS: z.string().min(1, {
    message: "Government ID is required.",
  }),
  patientPhotoIPFS: z.string().min(1, {
    message: "Patient photo is required.",
  }),
  
  // Optional guardian information
  hasGuardian: z.boolean().default(false),
  guardianFullName: z.string().optional(),
  guardianMobileNumber: z.string().optional(),
  guardianGovernmentIDIPFS: z.string().optional(),
  guardianResidentialAddress: z.string().optional(),
  
  // Document consent
  shareDiagnosisReport: z.boolean().default(false),
  shareDoctorsLetter: z.boolean().default(false),
  shareMedicalBills: z.boolean().default(false),
  shareAdmissionDoc: z.boolean().default(false),
  shareGovernmentID: z.boolean().default(false),
  sharePatientPhoto: z.boolean().default(false),
}).refine((data) => {
  if (data.hasGuardian) {
    return !!data.guardianFullName && 
           !!data.guardianMobileNumber && 
           !!data.guardianGovernmentIDIPFS &&
           !!data.guardianResidentialAddress;
  }
  return true;
}, {
  message: "Guardian information is required when 'Has Guardian' is selected",
  path: ["hasGuardian"],
});

type CampaignFormValues = z.infer<typeof campaignFormSchema>;

const NewCampaign = () => {
  const navigate = useNavigate();
  const { createCampaign, isLoading } = useCrowdfundingContract();
  const [activeTab, setActiveTab] = useState("personal");

  const form = useForm<CampaignFormValues>({
    resolver: zodResolver(campaignFormSchema),
    defaultValues: {
      fullName: "",
      contactInfo: "",
      residenceLocation: "",
      amountNeededUSD: 100,
      duration: 30,
      comment: "",
      walletAddress: "",
      diagnosisReportIPFS: "",
      doctorsLetterIPFS: "",
      governmentIDIPFS: "",
      patientPhotoIPFS: "",
      hasGuardian: false,
      guardianFullName: "",
      guardianMobileNumber: "",
      guardianGovernmentIDIPFS: "",
      guardianResidentialAddress: "",
      shareDiagnosisReport: false,
      shareDoctorsLetter: false,
      shareMedicalBills: false,
      shareAdmissionDoc: false,
      shareGovernmentID: false,
      sharePatientPhoto: false,
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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      try {
        const ipfsHash = await uploadToIPFS(file);
        form.setValue(fieldName as any, ipfsHash);
      } catch (error) {
        console.error("Error uploading file to IPFS:", error);
      }
    }
  };

  const onSubmit = async (data: CampaignFormValues) => {
    try {
      // Prepare data for contract interaction
      const patientDetails = {
        fullName: data.fullName,
        dateOfBirth: format(data.dateOfBirth, "yyyy-MM-dd"),
        contactInfo: data.contactInfo,
        residenceLocation: data.residenceLocation
      };

      const documents = {
        diagnosisReportIPFS: data.diagnosisReportIPFS,
        doctorsLetterIPFS: data.doctorsLetterIPFS,
        medicalBillsIPFS: "", // Optional in the form but required by contract
        admissionDocIPFS: "", // Optional in the form but required by contract
        governmentIDIPFS: data.governmentIDIPFS,
        patientPhotoIPFS: data.patientPhotoIPFS
      };

      const consent = {
        shareDiagnosisReport: data.shareDiagnosisReport,
        shareDoctorsLetter: data.shareDoctorsLetter,
        shareMedicalBills: data.shareMedicalBills,
        shareAdmissionDoc: data.shareAdmissionDoc,
        shareGovernmentID: data.shareGovernmentID,
        sharePatientPhoto: data.sharePatientPhoto
      };

      let guardianDetails = {
        guardian: "0x0000000000000000000000000000000000000000", // Default zero address
        guardianFullName: "",
        guardianMobileNumber: "",
        guardianGovernmentID: "",
        guardianResidentialAddress: ""
      };

      if (data.hasGuardian && data.guardianFullName && data.guardianMobileNumber && 
          data.guardianGovernmentIDIPFS && data.guardianResidentialAddress) {
        guardianDetails = {
          guardian: data.walletAddress, // Using the same wallet address as patient for now
          guardianFullName: data.guardianFullName,
          guardianMobileNumber: data.guardianMobileNumber,
          guardianGovernmentID: data.guardianGovernmentIDIPFS,
          guardianResidentialAddress: data.guardianResidentialAddress
        };
      }

      const success = await createCampaign(
        data.amountNeededUSD,
        data.duration,
        data.comment,
        patientDetails,
        consent,
        documents,
        guardianDetails
      );

      if (success) {
        navigate("/campaigns");
      }
    } catch (error) {
      console.error("Error creating campaign:", error);
    }
  };

  const nextTab = () => {
    if (activeTab === "personal") setActiveTab("medical");
    else if (activeTab === "medical") setActiveTab("guardian");
    else if (activeTab === "guardian") setActiveTab("consent");
  };

  const prevTab = () => {
    if (activeTab === "consent") setActiveTab("guardian");
    else if (activeTab === "guardian") setActiveTab("medical");
    else if (activeTab === "medical") setActiveTab("personal");
  };

  return (
    <>
      <Helmet>
        <title>Create New Campaign | careBridge</title>
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-1 bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-medical-blue sm:text-4xl">
                  Create a Medical Crowdfunding Campaign
                </h1>
                <p className="mt-2 text-lg text-gray-500">
                  Please provide accurate information to help verify your medical campaign.
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Campaign Details</CardTitle>
                  <CardDescription>
                    Fill out the form below to create a new medical fundraising campaign.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="personal">Personal Info</TabsTrigger>
                      <TabsTrigger value="medical">Medical Documents</TabsTrigger>
                      <TabsTrigger value="guardian">Guardian (Optional)</TabsTrigger>
                      <TabsTrigger value="consent">Consent</TabsTrigger>
                    </TabsList>

                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-6">
                        <TabsContent value="personal" className="space-y-4">
                          <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input placeholder="John Doe" className="pl-8" {...field} />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="dateOfBirth"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel>Date of Birth</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "pl-3 text-left font-normal",
                                          !field.value && "text-muted-foreground"
                                        )}
                                      >
                                        <Calendar className="mr-2 h-4 w-4" />
                                        {field.value ? (
                                          format(field.value, "PPP")
                                        ) : (
                                          <span>Pick a date</span>
                                        )}
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0" align="start">
                                    <CalendarComponent
                                      mode="single"
                                      selected={field.value}
                                      onSelect={field.onChange}
                                      disabled={(date) =>
                                        date > new Date() || date < new Date("1900-01-01")
                                      }
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
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
                                  <div className="relative">
                                    <Phone className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input placeholder="Phone or Email" className="pl-8" {...field} />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="residenceLocation"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Residence Location</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input placeholder="123 Main St, City, Country" className="pl-8" {...field} />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="walletAddress"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Wallet Address</FormLabel>
                                <FormControl>
                                  <Input placeholder="0x..." {...field} />
                                </FormControl>
                                <FormDescription>
                                  EVM wallet address that will receive funds
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="amountNeededUSD"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Amount Needed (USD)</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                      <Input 
                                        type="number" 
                                        min={100} 
                                        placeholder="1000" 
                                        className="pl-8" 
                                        {...field} 
                                      />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="duration"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Campaign Duration (days)</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <Clock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                      <Input 
                                        type="number" 
                                        min={1} 
                                        placeholder="30" 
                                        className="pl-8" 
                                        {...field} 
                                      />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name="comment"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Additional Comments</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <FileText className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Textarea 
                                      placeholder="Please provide details about your medical situation" 
                                      className="pl-8 min-h-[100px]" 
                                      {...field} 
                                    />
                                  </div>
                                </FormControl>
                                <FormDescription>
                                  Explain your medical condition and why you need financial assistance.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="flex justify-end">
                            <Button type="button" onClick={nextTab}>
                              Next: Medical Documents
                            </Button>
                          </div>
                        </TabsContent>

                        <TabsContent value="medical" className="space-y-4">
                          <div className="grid gap-6">
                            <div>
                              <FormLabel>Diagnosis Report</FormLabel>
                              <div className="mt-2">
                                <Input
                                  type="file"
                                  onChange={(e) => handleFileUpload(e, "diagnosisReportIPFS")}
                                />
                              </div>
                              {form.watch("diagnosisReportIPFS") && (
                                <p className="text-sm text-green-600 mt-2">
                                  ✓ File uploaded: {form.watch("diagnosisReportIPFS")}
                                </p>
                              )}
                              {form.formState.errors.diagnosisReportIPFS?.message && (
                                <p className="text-sm text-red-500 mt-2">
                                  {form.formState.errors.diagnosisReportIPFS?.message}
                                </p>
                              )}
                            </div>

                            <div>
                              <FormLabel>Doctor's Letter</FormLabel>
                              <div className="mt-2">
                                <Input
                                  type="file"
                                  onChange={(e) => handleFileUpload(e, "doctorsLetterIPFS")}
                                />
                              </div>
                              {form.watch("doctorsLetterIPFS") && (
                                <p className="text-sm text-green-600 mt-2">
                                  ✓ File uploaded: {form.watch("doctorsLetterIPFS")}
                                </p>
                              )}
                              {form.formState.errors.doctorsLetterIPFS?.message && (
                                <p className="text-sm text-red-500 mt-2">
                                  {form.formState.errors.doctorsLetterIPFS?.message}
                                </p>
                              )}
                            </div>

                            <div>
                              <FormLabel>Government ID</FormLabel>
                              <div className="mt-2">
                                <Input
                                  type="file"
                                  onChange={(e) => handleFileUpload(e, "governmentIDIPFS")}
                                />
                              </div>
                              {form.watch("governmentIDIPFS") && (
                                <p className="text-sm text-green-600 mt-2">
                                  ✓ File uploaded: {form.watch("governmentIDIPFS")}
                                </p>
                              )}
                              {form.formState.errors.governmentIDIPFS?.message && (
                                <p className="text-sm text-red-500 mt-2">
                                  {form.formState.errors.governmentIDIPFS?.message}
                                </p>
                              )}
                            </div>

                            <div>
                              <FormLabel>Patient Photograph</FormLabel>
                              <div className="mt-2">
                                <Input
                                  type="file"
                                  onChange={(e) => handleFileUpload(e, "patientPhotoIPFS")}
                                />
                              </div>
                              {form.watch("patientPhotoIPFS") && (
                                <p className="text-sm text-green-600 mt-2">
                                  ✓ File uploaded: {form.watch("patientPhotoIPFS")}
                                </p>
                              )}
                              {form.formState.errors.patientPhotoIPFS?.message && (
                                <p className="text-sm text-red-500 mt-2">
                                  {form.formState.errors.patientPhotoIPFS?.message}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex justify-between">
                            <Button type="button" variant="outline" onClick={prevTab}>
                              Back: Personal Info
                            </Button>
                            <Button type="button" onClick={nextTab}>
                              Next: Guardian Info
                            </Button>
                          </div>
                        </TabsContent>

                        <TabsContent value="guardian" className="space-y-4">
                          <FormField
                            control={form.control}
                            name="hasGuardian"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>
                                    This campaign is being created by a guardian on behalf of the patient
                                  </FormLabel>
                                  <FormDescription>
                                    If you are creating this campaign for someone else, please provide guardian information
                                  </FormDescription>
                                </div>
                              </FormItem>
                            )}
                          />

                          {form.watch("hasGuardian") && (
                            <div className="space-y-4 mt-4 border p-4 rounded-md">
                              <FormField
                                control={form.control}
                                name="guardianFullName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Guardian Full Name</FormLabel>
                                    <FormControl>
                                      <div className="relative">
                                        <Shield className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input placeholder="Guardian Name" className="pl-8" {...field} />
                                      </div>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="guardianMobileNumber"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Guardian Mobile Number</FormLabel>
                                    <FormControl>
                                      <div className="relative">
                                        <Phone className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input placeholder="+1234567890" className="pl-8" {...field} />
                                      </div>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <div>
                                <FormLabel>Guardian Government ID</FormLabel>
                                <div className="mt-2">
                                  <Input
                                    type="file"
                                    onChange={(e) => handleFileUpload(e, "guardianGovernmentIDIPFS")}
                                  />
                                </div>
                                {form.watch("guardianGovernmentIDIPFS") && (
                                  <p className="text-sm text-green-600 mt-2">
                                    ✓ File uploaded: {form.watch("guardianGovernmentIDIPFS")}
                                  </p>
                                )}
                              </div>

                              <FormField
                                control={form.control}
                                name="guardianResidentialAddress"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Guardian Residential Address</FormLabel>
                                    <FormControl>
                                      <div className="relative">
                                        <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input placeholder="Residential Address" className="pl-8" {...field} />
                                      </div>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          )}

                          <div className="flex justify-between">
                            <Button type="button" variant="outline" onClick={prevTab}>
                              Back: Medical Documents
                            </Button>
                            <Button type="button" onClick={nextTab}>
                              Next: Consent
                            </Button>
                          </div>
                        </TabsContent>

                        <TabsContent value="consent" className="space-y-4">
                          <div className="border p-4 rounded-md">
                            <h3 className="text-lg font-medium mb-2">Document Sharing Consent</h3>
                            <p className="text-sm text-gray-500 mb-4">
                              Please select which documents you are comfortable sharing with potential donors:
                            </p>

                            <div className="space-y-4">
                              <FormField
                                control={form.control}
                                name="shareDiagnosisReport"
                                render={({ field }) => (
                                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                      />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                      <FormLabel>Share Diagnosis Report</FormLabel>
                                    </div>
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="shareDoctorsLetter"
                                render={({ field }) => (
                                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                      />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                      <FormLabel>Share Doctor's Letter</FormLabel>
                                    </div>
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="shareMedicalBills"
                                render={({ field }) => (
                                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                      />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                      <FormLabel>Share Medical Bills</FormLabel>
                                    </div>
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="shareAdmissionDoc"
                                render={({ field }) => (
                                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                      />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                      <FormLabel>Share Admission Documents</FormLabel>
                                    </div>
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="shareGovernmentID"
                                render={({ field }) => (
                                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                      />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                      <FormLabel>Share Government ID</FormLabel>
                                    </div>
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="sharePatientPhoto"
                                render={({ field }) => (
                                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                      />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                      <FormLabel>Share Patient Photo</FormLabel>
                                    </div>
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>

                          <div className="flex justify-between">
                            <Button type="button" variant="outline" onClick={prevTab}>
                              Back: Guardian Info
                            </Button>
                            <Button type="submit" disabled={isLoading}>
                              {isLoading ? "Submitting..." : "Submit Campaign"}
                            </Button>
                          </div>
                        </TabsContent>
                      </form>
                    </Form>
                  </Tabs>
                </CardContent>
                <CardFooter className="border-t pt-6">
                  <p className="text-sm text-muted-foreground">
                    By submitting this form, you agree to our terms and conditions. All information 
                    provided will be verified before your campaign is approved.
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

export default NewCampaign;
