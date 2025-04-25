
import React, { useState } from 'react';
import { Award } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useCrowdfundingContract } from '@/hooks/useCrowdfundingContract';

const ClaimRewardButton = () => {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const { withdrawFees, isLoading } = useCrowdfundingContract();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount greater than 0",
        variant: "destructive",
      });
      return;
    }

    const success = await withdrawFees(parseFloat(amount));
    if (success) {
      setOpen(false);
      setAmount('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Award className="h-4 w-4" />
          Claim Reward
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Claim Verifier Reward</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label htmlFor="amount" className="text-sm font-medium">
                Amount to withdraw
              </label>
              <Input
                id="amount"
                type="number"
                step="0.000000000000000001"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                required
              />
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Withdraw'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ClaimRewardButton;
