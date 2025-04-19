
import React from 'react';
import ApplicationForm from '@/components/forms/ApplicationForm';
import { Separator } from '@/components/ui/separator';
import { User } from 'lucide-react';

const ApplyAsHealthPro: React.FC = () => {
  return (
    <div className="container py-6 max-w-4xl">
      <div className="mb-6 text-center">
        <div className="flex justify-center mb-2">
          <User size={32} className="text-medical-blue" />
        </div>
        <h1 className="text-2xl font-bold medical-heading mb-2">Apply as Health Professional</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Health Professionals verify the medical details and needs of campaigns.
          Licensed medical practitioners ensure that funds are directed to legitimate medical needs.
        </p>
        
        <div className="mt-6 bg-medical-blue/10 p-4 rounded-md max-w-2xl mx-auto">
          <h2 className="text-sm font-semibold mb-2 text-medical-blue">Qualification Requirements</h2>
          <ul className="text-sm text-left list-disc list-inside space-y-1">
            <li>Valid medical license or healthcare credentials</li>
            <li>Professional documentation will be verified</li>
            <li>Applications require voting approval from existing Health Professionals</li>
            <li>Limited to maximum of 20 positions</li>
            <li>Participation in verification activities is required to maintain status</li>
          </ul>
        </div>
      </div>
      
      <Separator className="my-6" />
      
      <ApplicationForm 
        type="HealthProfessional"
        title="Health Professional Application"
        description="Submit your medical credentials to join as a Health Professional verifier."
      />
    </div>
  );
};

export default ApplyAsHealthPro;
