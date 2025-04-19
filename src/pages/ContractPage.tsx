
import React from 'react';
import ContractDetails from '@/components/contract/ContractDetails';

const ContractPage: React.FC = () => {
  return (
    <div className="container py-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold medical-heading mb-2">Medical Verifier Contract</h1>
        <p className="text-muted-foreground">
          Technical details and specifications of the underlying smart contract that powers the MedTrust verification system.
        </p>
      </div>
      
      <ContractDetails />
    </div>
  );
};

export default ContractPage;
