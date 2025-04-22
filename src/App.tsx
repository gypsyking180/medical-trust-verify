
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
import NewCampaign from "./pages/NewCampaign";
import AppealCampaign from "./pages/AppealCampaign";
import Web3Provider from "./components/layout/Web3Provider";
import { Helmet, HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <Web3Provider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/apply/genesis" element={<ApplyAsGenesis />} />
              <Route path="/apply/health" element={<ApplyAsHealthPro />} />
              <Route path="/apply/dao" element={<ApplyAsDao />} />
              <Route path="/contract" element={<ContractPage />} />
              <Route path="/campaigns/new" element={<NewCampaign />} />
              <Route path="/campaigns/appeal" element={<AppealCampaign />} />
              <Route path="/donate" element={<DonatePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </Web3Provider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
