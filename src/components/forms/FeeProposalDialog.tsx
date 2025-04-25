
import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useVerifierContract } from "@/hooks/useVerifierContract";

interface FeeProposalDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const FeeProposalDialog: React.FC<FeeProposalDialogProps> = ({ open, onOpenChange }) => {
  const [proposedFee, setProposedFee] = useState<string>('');
  const { proposeFee, isLoading } = useVerifierContract();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const feeValue = parseInt(proposedFee);
    
    if (isNaN(feeValue) || feeValue < 100 || feeValue > 300) {
      return;
    }

    const success = await proposeFee(feeValue);
    if (success) {
      setProposedFee('');
      onOpenChange?.(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Propose New Fee</DialogTitle>
            <DialogDescription>
              Enter the new service fee in basis points (100-300).<br />
              Example: 200 = 2%
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <label className="block mb-1 font-medium text-sm">Proposed Fee (basis points)</label>
              <Input
                type="number"
                required
                min="100"
                max="300"
                value={proposedFee}
                onChange={e => setProposedFee(e.target.value)}
                placeholder="200"
                disabled={isLoading}
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading || !proposedFee} className="w-full">
              {isLoading ? "Submitting..." : "Submit Proposal"}
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="secondary" className="w-full mt-2" disabled={isLoading}>
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FeeProposalDialog;
