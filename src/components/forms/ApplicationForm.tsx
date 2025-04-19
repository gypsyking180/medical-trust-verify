
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";

interface ApplicationFormProps {
  type: 'Genesis' | 'HealthProfessional' | 'Dao';
  title: string;
  description: string;
}

export const ApplicationForm: React.FC<ApplicationFormProps> = ({ type, title, description }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    contactInfo: '',
    governmentID: '',
    professionalDocs: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Application Submitted",
        description: `Your ${type} application has been submitted successfully.`,
        variant: "default",
      });
      setIsSubmitting(false);
      
      // Reset form
      setFormData({
        fullName: '',
        contactInfo: '',
        governmentID: '',
        professionalDocs: ''
      });
    }, 1500);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl medical-heading">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <Separator />
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Legal Name</Label>
            <Input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter your full legal name"
              required
              maxLength={56}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contactInfo">Contact Information</Label>
            <Input
              id="contactInfo"
              name="contactInfo"
              value={formData.contactInfo}
              onChange={handleInputChange}
              placeholder="Email or phone number"
              required
              maxLength={56}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="governmentID">Government-issued ID Reference</Label>
            <Input
              id="governmentID"
              name="governmentID"
              value={formData.governmentID}
              onChange={handleInputChange}
              placeholder="ID number (will be verified)"
              required
              maxLength={56}
            />
            <p className="text-xs text-muted-foreground">Enter your ID number for verification purposes.</p>
          </div>
          
          {(type === 'Genesis' || type === 'HealthProfessional') && (
            <div className="space-y-2">
              <Label htmlFor="professionalDocs">
                {type === 'HealthProfessional' ? 'Professional Credentials' : 'Additional Information'}
              </Label>
              <Textarea
                id="professionalDocs"
                name="professionalDocs"
                value={formData.professionalDocs}
                onChange={handleInputChange}
                placeholder={type === 'HealthProfessional' 
                  ? "Enter your medical license, certifications, or other credentials" 
                  : "Any additional information to support your application"}
                required={type === 'HealthProfessional'}
                rows={4}
                maxLength={56}
              />
            </div>
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
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            disabled={isSubmitting} 
            className="w-full bg-medical-blue hover:bg-medical-blue/90"
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ApplicationForm;
