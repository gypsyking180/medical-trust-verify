
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export const ContractDetails: React.FC = () => {
  const contractFunctions = [
    {
      name: "applyAsGenesis",
      description: "Apply to become a Genesis committee member",
      params: "fullName, contactInfo, governmentID, professionalDocs"
    },
    {
      name: "applyAsHealthProfessional",
      description: "Apply as a Healthcare Professional verifier",
      params: "fullName, contactInfo, governmentID, professionalDocs"
    },
    {
      name: "applyAsDaoVerifier",
      description: "Apply as a DAO member verifier",
      params: "fullName, contactInfo, governmentID"
    },
    {
      name: "voteOnApplication",
      description: "Vote on a pending verifier application",
      params: "applicant, support"
    },
    {
      name: "proposeRevocation",
      description: "Propose revoking a verifier's status",
      params: "target"
    },
    {
      name: "voteOnRevocation",
      description: "Vote on a revocation proposal",
      params: "target, support"
    }
  ];
  
  const verifierTypes = [
    {
      name: "Genesis",
      description: "Initial governance committee members who bootstrap the system"
    },
    {
      name: "HealthProfessional",
      description: "Licensed medical practitioners who verify medical campaigns"
    },
    {
      name: "Dao",
      description: "Community-elected members who participate in governance"
    },
    {
      name: "AutoDao",
      description: "Automatically approved via significant donation history"
    }
  ];

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl medical-heading">Medical Verifier Contract</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            The MedicalVerifier smart contract implements an ERC721-based verification system for 
            medical crowdfunding campaigns. It ensures that only qualified individuals can verify 
            campaigns, maintaining trust in the platform.
          </p>
          
          <div className="grid grid-cols-2 gap-4 my-4">
            <div className="flex flex-col border rounded-md p-3">
              <span className="text-sm font-semibold text-muted-foreground">Contract Name</span>
              <span>MedicalVerifier</span>
            </div>
            <div className="flex flex-col border rounded-md p-3">
              <span className="text-sm font-semibold text-muted-foreground">Standard</span>
              <span>ERC721</span>
            </div>
            <div className="flex flex-col border rounded-md p-3">
              <span className="text-sm font-semibold text-muted-foreground">License</span>
              <span>MIT</span>
            </div>
            <div className="flex flex-col border rounded-md p-3">
              <span className="text-sm font-semibold text-muted-foreground">Solidity Version</span>
              <span>^0.8.20</span>
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-medical-blue mt-6 mb-3">Features</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Multi-tier verification system with specialized roles</li>
            <li>Democratic governance through voting systems</li>
            <li>Credential NFTs for approved verifiers</li>
            <li>Anti-fraud measures and revocation mechanisms</li>
            <li>Automatic approval for significant donors</li>
          </ul>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg medical-heading">Verifier Types</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-4">
            {verifierTypes.map((type) => (
              <div key={type.name} className="border rounded-md p-4">
                <h4 className="font-semibold flex items-center">
                  <Badge className="mr-2 bg-medical-blue">{type.name}</Badge>
                </h4>
                <p className="text-sm text-muted-foreground mt-2">{type.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg medical-heading">Key Functions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {contractFunctions.map((func, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left hover:no-underline">
                  <div>
                    <span className="font-mono text-medical-blue">{func.name}</span>
                    <p className="text-xs text-muted-foreground font-normal">
                      {func.description}
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="bg-muted p-3 rounded-md">
                    <p className="text-sm font-semibold mb-2">Parameters:</p>
                    <code className="text-xs">{func.params}</code>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContractDetails;
