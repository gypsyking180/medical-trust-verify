
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';

const VoteRevocationPage = () => {
  const [vote, setVote] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Mock data - in a real app this would come from a contract or API
  const revocationProposals = [
    {
      id: '1',
      verifierAddress: '0x1234...5678',
      verifierName: 'Dr. Smith',
      verifierRole: 'Health Professional',
      reason: 'Violated code of conduct by approving campaigns without proper verification',
      proposedBy: '0xabcd...efgh',
      proposerName: 'Dr. Johnson',
      dateProposed: '2025-04-20'
    },
    {
      id: '2',
      verifierAddress: '0x8765...4321',
      verifierName: 'MedDAO Organization',
      verifierRole: 'DAO',
      reason: 'Failed to participate in voting for the last 3 months',
      proposedBy: '0xfghi...jklm',
      proposerName: 'HealthCare DAO',
      dateProposed: '2025-04-22'
    }
  ];
  
  // In a real app, this would be determined from the user's role
  const userRole = 'Health Professional';

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
      console.log(`Voting ${vote} on revocation proposal ${proposalId} with comment: ${comment}`);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Vote submitted successfully",
        description: `You voted ${vote} on the revocation proposal for ${proposal.verifierName}`,
      });
      
      // Reset form
      setVote(null);
      setComment('');
    } catch (error) {
      console.error('Error voting on revocation:', error);
      toast({
        title: "Error submitting vote",
        description: "There was a problem submitting your vote. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Filter proposals to only show those for the same role as the current user
  const filteredProposals = revocationProposals.filter(
    proposal => proposal.verifierRole === userRole
  );

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Vote on Revocation Proposals</h1>
      
      {filteredProposals.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p>There are currently no revocation proposals for {userRole}s to vote on.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {filteredProposals.map(proposal => (
            <Card key={proposal.id} className="w-full">
              <CardHeader>
                <CardTitle>Revocation Proposal for {proposal.verifierName}</CardTitle>
                <CardDescription>
                  Role: {proposal.verifierRole} • Proposed on {proposal.dateProposed}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Verifier Address:</h3>
                    <p className="text-sm text-gray-700">{proposal.verifierAddress}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold">Reason for Revocation:</h3>
                    <p className="text-sm text-gray-700">{proposal.reason}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold">Proposed By:</h3>
                    <p className="text-sm text-gray-700">{proposal.proposerName} ({proposal.proposedBy})</p>
                  </div>
                  
                  <RadioGroup value={vote || ""} onValueChange={setVote} className="flex flex-col space-y-2 mt-6">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id={`yes-${proposal.id}`} />
                      <Label htmlFor={`yes-${proposal.id}`}>Yes, revoke membership</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id={`no-${proposal.id}`} />
                      <Label htmlFor={`no-${proposal.id}`}>No, keep membership</Label>
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

export default VoteRevocationPage;
