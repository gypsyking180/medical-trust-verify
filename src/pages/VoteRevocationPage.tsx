
import React from 'react';
import NavBar from '@/components/layout/NavBar';

const VoteRevocationPage = () => {
  return (
    <>
      <NavBar />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Vote on Revocation Proposals</h1>
        <p>This page will allow verifiers to vote on revoking another verifier's membership.</p>
      </div>
    </>
  );
};

export default VoteRevocationPage;
