
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';

const VoteFeePage = () => {
  const [vote, setVote] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Mock data - in a real app this would come from a contract or API
  const feeProposals = [
    {
      id: '1',
      proposedFee: 250,
      currentFee: 200,
      proposedBy: '0x1234...5678',
      proposerName: 'Dr. Smith',
      dateProposed: '2025-04-21',
      description: 'Increase platform fee to cover additional verification resources'
    },
    {
      id: '2',
      proposedFee: 150,
      currentFee: 200,
      proposedBy: '0x8765...4321',
      proposerName: 'MedDAO Organization',
      dateProposed: '2025-04-23',
      description: 'Reduce platform fee to attract more campaigns and donors'
    }
  ];

  const handleSubmit = async (proposalId: string, proposal: any) => {
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
      // This would be replaced with actual contract interaction
      console.log(`Voting ${vote} on fee proposal ${proposalId} with comment: ${comment}`);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const changeType = proposal.proposedFee > proposal.currentFee ? "increase" : "decrease";
      
      toast({
        title: "Vote submitted successfully",
        description: `You voted ${vote} on the fee ${changeType} proposal`,
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
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Vote on Fee Proposals</h1>
      
      {feeProposals.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p>There are currently no fee proposals to vote on.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {feeProposals.map(proposal => (
            <Card key={proposal.id} className="w-full">
              <CardHeader>
                <CardTitle>
                  {proposal.proposedFee > proposal.currentFee 
                    ? "Fee Increase Proposal" 
                    : "Fee Decrease Proposal"}
                </CardTitle>
                <CardDescription>
                  Proposed on {proposal.dateProposed} by {proposal.proposerName}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10">
                    <div>
                      <h3 className="font-semibold">Current Fee:</h3>
                      <p className="text-xl font-bold">{proposal.currentFee / 100}%</p>
                      <p className="text-sm text-gray-500">({proposal.currentFee} basis points)</p>
                    </div>
                    
                    <div className="text-xl">→</div>
                    
                    <div>
                      <h3 className="font-semibold">Proposed Fee:</h3>
                      <p className="text-xl font-bold">{proposal.proposedFee / 100}%</p>
                      <p className="text-sm text-gray-500">({proposal.proposedFee} basis points)</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold">Description:</h3>
                    <p className="text-sm text-gray-700">{proposal.description}</p>
                  </div>
                  
                  <RadioGroup value={vote || ""} onValueChange={setVote} className="flex flex-col space-y-2 mt-6">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id={`yes-${proposal.id}`} />
                      <Label htmlFor={`yes-${proposal.id}`}>Yes, approve new fee</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id={`no-${proposal.id}`} />
                      <Label htmlFor={`no-${proposal.id}`}>No, keep current fee</Label>
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
                  onClick={() => handleSubmit(proposal.id, proposal)}
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Vote"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default VoteFeePage;
