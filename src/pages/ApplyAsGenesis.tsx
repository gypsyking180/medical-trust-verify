
import React from 'react';
import ApplicationForm from '@/components/forms/ApplicationForm';
import { Separator } from '@/components/ui/separator';
import { ShieldCheck } from 'lucide-react';

const ApplyAsGenesis: React.FC = () => {
  return (
    <div className="container py-6 max-w-4xl">
      <div className="mb-6 text-center">
        <div className="flex justify-center mb-2">
          <ShieldCheck size={32} className="text-medical-blue" />
        </div>
        <h1 className="text-2xl font-bold medical-heading mb-2">Apply as Genesis Committee Member</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Genesis committee members form the initial governance structure of the MedTrust platform.
          This is a prestigious position with significant responsibility.
        </p>
        
        <div className="mt-6 bg-medical-blue/10 p-4 rounded-md max-w-2xl mx-auto">
          <h2 className="text-sm font-semibold mb-2 text-medical-blue">Important Information</h2>
          <ul className="text-sm text-left list-disc list-inside space-y-1">
            <li>Limited to only 5 positions total</li>
            <li>Genesis members are approved directly by contract owner</li>
            <li>Genesis members transition to DAO status after governance period</li>
            <li>Applications expire after 30 days if not approved</li>
          </ul>
        </div>
      </div>
      
      <Separator className="my-6" />
      
      <ApplicationForm 
        type="Genesis"
        title="Genesis Committee Application"
        description="Submit your application to join the founding committee that will bootstrap the verification system."
      />
    </div>
  );
};

export default ApplyAsGenesis;
