
import React from 'react';
import ApplicationForm from '@/components/forms/ApplicationForm';
import { Separator } from '@/components/ui/separator';
import { Users } from 'lucide-react';

const ApplyAsDao: React.FC = () => {
  return (
    <div className="container py-6 max-w-4xl">
      <div className="mb-6 text-center">
        <div className="flex justify-center mb-2">
          <Users size={32} className="text-medical-blue" />
        </div>
        <h1 className="text-2xl font-bold medical-heading mb-2">Apply as DAO Member</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          DAO members participate in governance decisions and help verify the overall 
          legitimacy of medical campaigns on the platform.
        </p>
        
        <div className="mt-6 bg-medical-blue/10 p-4 rounded-md max-w-2xl mx-auto">
          <h2 className="text-sm font-semibold mb-2 text-medical-blue">About DAO Membership</h2>
          <ul className="text-sm text-left list-disc list-inside space-y-1">
            <li>DAO members vote on governance decisions</li>
            <li>Applications require voting approval from existing DAO members</li>
            <li>Limited to maximum of 20 manually approved positions</li>
            <li>Professional medical credentials not required</li>
            <li>Active participation in voting is required to maintain status</li>
          </ul>
        </div>
      </div>
      
      <Separator className="my-6" />
      
      <ApplicationForm 
        type="Dao"
        title="DAO Member Application"
        description="Apply to join the decentralized governance structure for the MedTrust platform."
      />
    </div>
  );
};

export default ApplyAsDao;
