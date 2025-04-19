
import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from '@/components/layout/AppSidebar';
import Dashboard from './Dashboard';

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1">
          <div className="p-4">
            <SidebarTrigger />
          </div>
          <Dashboard />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
