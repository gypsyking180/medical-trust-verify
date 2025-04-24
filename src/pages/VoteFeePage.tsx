
import React from 'react';
import NavBar from '@/components/layout/NavBar';

const VoteFeePage = () => {
  return (
    <>
      <NavBar />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Vote on Fee Proposals</h1>
        <p>This page will allow verifiers to vote on fee change proposals.</p>
      </div>
    </>
  );
};

export default VoteFeePage;
