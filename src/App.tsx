
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ApplyAsGenesis from "./pages/ApplyAsGenesis";
import ApplyAsHealthPro from "./pages/ApplyAsHealthPro";
import ApplyAsDao from "./pages/ApplyAsDao";
import ContractPage from "./pages/ContractPage";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from './components/layout/AppSidebar';

const queryClient = new QueryClient();

const PageLayout = ({ children }: { children: React.ReactNode }) => (
  <SidebarProvider>
    <div className="min-h-screen flex w-full">
      <AppSidebar />
      <div className="flex-1">
        <div className="p-4">
          <SidebarTrigger />
        </div>
        {children}
      </div>
    </div>
  </SidebarProvider>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/apply/genesis" element={
            <PageLayout>
              <ApplyAsGenesis />
            </PageLayout>
          } />
          <Route path="/apply/health" element={
            <PageLayout>
              <ApplyAsHealthPro />
            </PageLayout>
          } />
          <Route path="/apply/dao" element={
            <PageLayout>
              <ApplyAsDao />
            </PageLayout>
          } />
          <Route path="/contract" element={
            <PageLayout>
              <ContractPage />
            </PageLayout>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
