
import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from '@/components/layout/AppSidebar';
import NavBar from '@/components/layout/NavBar';
import Hero from '@/components/home/Hero';
import Statistics from '@/components/home/Statistics';
import Features from '@/components/home/Features';
import Footer from '@/components/layout/Footer';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>careBridge | Medical Crowdfunding on Blockchain</title>
        <meta name="description" content="A decentralized medical crowdfunding platform powered by blockchain verification" />
      </Helmet>
      <SidebarProvider>
        <div className="min-h-screen flex flex-col w-full">
          <NavBar />
          <main className="flex-1">
            <Hero />
            <Statistics />
            <Features />
          </main>
          <Footer />
        </div>
      </SidebarProvider>
    </>
  );
};

export default Index;
