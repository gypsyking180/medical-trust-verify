
import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface FeeProposalDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const FeeProposalDialog: React.FC<FeeProposalDialogProps> = ({ open, onOpenChange }) => {
  const [proposedFee, setProposedFee] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const feeValue = parseInt(proposedFee);
    
    if (feeValue < 100 || feeValue > 300) {
      toast({
        title: "Invalid Fee Range",
        description: "Fee must be between 100 (1%) and 300 (3%) basis points",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    // In actual usage: call contract function here
    setTimeout(() => {
      setSubmitting(false);
      toast({
        title: "Fee Proposal Submitted",
        description: `Your fee proposal of ${feeValue / 100}% has been submitted successfully.`,
      });
      setProposedFee('');
      onOpenChange?.(false);
    }, 1000);
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
                disabled={submitting}
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={submitting || !proposedFee} className="w-full">
              {submitting ? "Submitting..." : "Submit Proposal"}
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="secondary" className="w-full mt-2" disabled={submitting}>
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
