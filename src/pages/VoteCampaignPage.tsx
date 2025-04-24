
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const VoteCampaignPage = () => {
  const [vote, setVote] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // This would be replaced with actual campaign data from an API or contract
  const pendingCampaigns = [
    {
      id: '1',
      title: 'Medical Treatment for John Doe',
      description: 'John Doe needs financial assistance for a critical surgery.',
      target: 10000,
      raised: 5000
    },
    {
      id: '2',
      title: 'Cancer Treatment for Jane Smith',
      description: 'Help Jane Smith cover the costs of her cancer treatment.',
      target: 15000,
      raised: 3000
    }
  ];

  const handleSubmit = async (campaignId: string) => {
    if (!vote) {
      toast({
        title: "Vote required",
        description: "Please select Yes or No to cast your vote",
        variant: "destructive"
      });
      return;
    }

    if (vote === 'no' && !comment.trim()) {
      toast({
        title: "Comment required",
        description: "Please provide a reason for voting No",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      // This would be replaced with actual contract interaction
      console.log(`Voting ${vote} on campaign ${campaignId} with comment: ${comment}`);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Vote submitted successfully",
        description: `You voted ${vote} on this campaign`,
      });
      
      // Reset form
      setVote(null);
      setComment('');
    } catch (error) {
      console.error('Error voting on campaign:', error);
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
      <h1 className="text-3xl font-bold mb-8">Vote on Pending Campaigns</h1>
      
      <div className="grid gap-6">
        {pendingCampaigns.map(campaign => (
          <Card key={campaign.id} className="w-full">
            <CardHeader>
              <CardTitle>{campaign.title}</CardTitle>
              <CardDescription>
                Target: ${campaign.target} • Raised so far: ${campaign.raised}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{campaign.description}</p>
              
              <div className="space-y-4">
                <RadioGroup value={vote || ""} onValueChange={setVote} className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id={`yes-${campaign.id}`} />
                    <Label htmlFor={`yes-${campaign.id}`}>Yes, approve this campaign</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id={`no-${campaign.id}`} />
                    <Label htmlFor={`no-${campaign.id}`}>No, reject this campaign</Label>
                  </div>
                </RadioGroup>
                
                {vote === 'no' && (
                  <div className="mt-4">
                    <Label htmlFor="comment">Reason for rejection (required)</Label>
                    <Textarea 
                      id="comment"
                      placeholder="Please explain why you are voting to reject this campaign"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                )}

                {vote === 'yes' && (
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
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handleSubmit(campaign.id)}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Vote"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VoteCampaignPage;
