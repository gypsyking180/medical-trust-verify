
import React, { useState } from 'react';
import NavBar from '@/components/layout/NavBar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import FeeProposalDialog from '@/components/forms/FeeProposalDialog';

const VoteFeePage = () => {
  const [vote, setVote] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [feeDialogOpen, setFeeDialogOpen] = useState(false);
  const { toast } = useToast();

  // Mock data - would come from contract in real implementation
  const feeProposals = [
    {
      id: '1',
      currentFee: '2.5%',
      proposedFee: '2.0%',
      reason: 'Reduce platform fees to be more competitive and attract more campaign creators',
      proposedBy: '0x1234...5678',
      endTime: '2025-05-15'
    },
    {
      id: '2',
      currentFee: '2.5%',
      proposedFee: '3.0%',
      reason: 'Increase fees to provide more rewards for verifiers and improve verification quality',
      proposedBy: '0x8765...4321',
      endTime: '2025-05-20'
    }
  ];

  const handleSubmit = async (proposalId: string) => {
    if (!vote) {
      toast({
        title: "Vote required",
        description: "Please select Yes or No to cast your vote",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      // Mock contract interaction
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Vote submitted successfully",
        description: `You voted ${vote} on this fee proposal`,
      });
      
      // Reset form
      setVote(null);
      setComment('');
    } catch (error) {
      console.error('Error voting on fee proposal:', error);
      toast({
        title: "Error submitting vote",
        description: "There was a problem submitting your vote. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Vote on Fee Proposals</h1>
          <Button onClick={() => setFeeDialogOpen(true)}>Propose New Fee</Button>
        </div>

        <div className="grid gap-6">
          {feeProposals.map(proposal => (
            <Card key={proposal.id} className="w-full">
              <CardHeader>
                <CardTitle>Fee Change Proposal</CardTitle>
                <CardDescription>
                  {proposal.currentFee} → {proposal.proposedFee}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="font-semibold">Reason:</p>
                  <p className="text-muted-foreground">{proposal.reason}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Proposed by: {proposal.proposedBy}<br />
                    Voting ends: {proposal.endTime}
                  </p>
                </div>
                
                <div className="space-y-4">
                  <RadioGroup value={vote || ""} onValueChange={setVote} className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id={`yes-${proposal.id}`} />
                      <Label htmlFor={`yes-${proposal.id}`}>Yes, approve this fee change</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id={`no-${proposal.id}`} />
                      <Label htmlFor={`no-${proposal.id}`}>No, keep current fee structure</Label>
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
                  onClick={() => handleSubmit(proposal.id)}
                  disabled={loading || !vote}
                >
                  {loading ? "Submitting..." : "Submit Vote"}
                </Button>
              </CardFooter>
            </Card>
          ))}
          
          {feeProposals.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No pending fee proposals found.</p>
            </div>
          )}
        </div>
      </div>
      
      <FeeProposalDialog 
        open={feeDialogOpen} 
        onOpenChange={setFeeDialogOpen} 
      />
    </>
  );
};

export default VoteFeePage;
