
import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface RevocationProposalDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const RevocationProposalDialog: React.FC<RevocationProposalDialogProps> = ({ open, onOpenChange }) => {
  const [targetAddress, setTargetAddress] = useState('');
  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // In actual usage: call contract function here
    setTimeout(() => {
      setSubmitting(false);
      alert("Revocation proposal submitted!\n\nTarget: " + targetAddress + "\nReason: " + reason);
      setTargetAddress('');
      setReason('');
      onOpenChange?.(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Propose Revocation</DialogTitle>
            <DialogDescription>
              Initiate a revocation proposal against another verifier.<br />Fill the address and reason below.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <label className="block mb-1 font-medium text-sm">Target Verifier Address</label>
              <Input
                required
                value={targetAddress}
                onChange={e => setTargetAddress(e.target.value)}
                placeholder="0x..."
                disabled={submitting}
                autoFocus
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-sm">Reason (Comment)</label>
              <Textarea
                required
                value={reason}
                onChange={e => setReason(e.target.value)}
                placeholder="Enter reason for revocation proposal"
                rows={3}
                disabled={submitting}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={submitting || !targetAddress || !reason} className="w-full">
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

export default RevocationProposalDialog;
