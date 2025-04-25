
import React, { useState } from 'react';
import NavBar from '@/components/layout/NavBar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useVerifierContract } from '@/hooks/useVerifierContract';
import RevocationProposalDialog from '@/components/forms/RevocationProposalDialog';

const VoteRevocationPage = () => {
  const [vote, setVote] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [revocationDialogOpen, setRevocationDialogOpen] = useState(false);
  const { voteOnRevocation, isLoading } = useVerifierContract();
  
  // Mock data - in a real app, these would come from contract calls
  const pendingRevocations = [
    {
      id: '1',
      targetAddress: '0x7Dc3C68b780f1988808d96F4B2B432C06532Cd37',
      targetName: 'Dr. John Smith',
      reason: 'Unprofessional behavior and falsifying medical credentials',
      proposedBy: '0x8f23...45ab'
    },
    {
      id: '2',
      targetAddress: '0x3E8c522D02af5752fCA5675945E11f489C1e8eD1',
      targetName: 'Sarah Johnson',
      reason: 'Inactive for over 6 months with multiple missed votes',
      proposedBy: '0x9a12...67cd'
    }
  ];

  const handleSubmit = async (revocation: any) => {
    if (!vote) {
      return;
    }
    
    const success = await voteOnRevocation(
      revocation.targetAddress,
      vote === 'yes'
    );
    
    if (success) {
      // Reset form
      setVote(null);
      setComment('');
    }
  };

  return (
    <>
      <NavBar />
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Vote on Revocation Proposals</h1>
          <Button onClick={() => setRevocationDialogOpen(true)}>Propose New Revocation</Button>
        </div>
        
        <div className="grid gap-6">
          {pendingRevocations.map(revocation => (
            <Card key={revocation.id} className="w-full">
              <CardHeader>
                <CardTitle>{revocation.targetName}</CardTitle>
                <CardDescription>
                  Target Address: {revocation.targetAddress}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="font-semibold">Reason for Revocation:</p>
                  <p className="text-muted-foreground">{revocation.reason}</p>
                  <p className="text-sm text-muted-foreground mt-2">Proposed by: {revocation.proposedBy}</p>
                </div>
                
                <div className="space-y-4">
                  <RadioGroup value={vote || ""} onValueChange={setVote} className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id={`yes-${revocation.id}`} />
                      <Label htmlFor={`yes-${revocation.id}`}>Yes, revoke this verifier's status</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id={`no-${revocation.id}`} />
                      <Label htmlFor={`no-${revocation.id}`}>No, keep this verifier's status</Label>
                    </div>
                  </RadioGroup>
                  
                  <div className="mt-4">
                    <Label htmlFor="comment">Comment (optional)</Label>
                    <Textarea 
                      id="comment"
                      placeholder="Add an optional comment to your vote"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => handleSubmit(revocation)}
                  disabled={isLoading || !vote}
                >
                  {isLoading ? "Submitting..." : "Submit Vote"}
                </Button>
              </CardFooter>
            </Card>
          ))}
          
          {pendingRevocations.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No pending revocation proposals found.</p>
            </div>
          )}
        </div>
      </div>
      
      <RevocationProposalDialog 
        open={revocationDialogOpen} 
        onOpenChange={setRevocationDialogOpen} 
      />
    </>
  );
};

export default VoteRevocationPage;
