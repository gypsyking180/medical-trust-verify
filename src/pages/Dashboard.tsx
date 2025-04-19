
import React from 'react';
import StatCard from '@/components/dashboard/StatCard';
import VerifierTypeCard from '@/components/dashboard/VerifierTypeCard';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { User, Users, ShieldCheck, Heart, HeartHandshake, Check } from 'lucide-react';

const Dashboard: React.FC = () => {
  // Mock data - in a real application this would come from the blockchain
  const verifierStats = {
    healthProfessionals: 8,
    daoMembers: 12,
    autoDaoMembers: 5,
    genesisMembers: 3,
    totalVerifiers: 28,
    maxHealthProfessionals: 20,
    maxDaoMembers: 20,
  };

  const verifierTypes = [
    {
      title: "Genesis Committee",
      description: "Foundational members who bootstrap the verification system and transition to DAO status after the initial governance phase.",
      icon: <ShieldCheck size={24} />,
      applyLink: "/apply/genesis",
      requirements: [
        "Complete documentation",
        "Owner approval required",
        "Limited to 5 members only",
        "Serves as initial governance"
      ]
    },
    {
      title: "Health Professional",
      description: "Licensed medical practitioners who validate the medical authenticity of campaigns.",
      icon: <User size={24} />,
      applyLink: "/apply/health",
      requirements: [
        "Valid medical credentials",
        "Professional documentation",
        "Voting approval required",
        "Limited to 20 positions"
      ]
    },
    {
      title: "DAO Verifier",
      description: "Community members who participate in governance and verification decisions.",
      icon: <Users size={24} />,
      applyLink: "/apply/dao",
      requirements: [
        "Basic identification",
        "Community approval via voting",
        "Limited to 20 manual positions",
        "Governance participation"
      ]
    },
    {
      title: "Auto-DAO",
      description: "Automatically approved status for significant donors who have supported multiple campaigns.",
      icon: <HeartHandshake size={24} />,
      applyLink: "#",
      requirements: [
        "Minimum 30 USD donations",
        "At least 160 supported campaigns",
        "Automatic approval process",
        "No manual application needed"
      ]
    }
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold medical-heading">MedTrust Verifier Platform</h1>
        <p className="text-muted-foreground mt-2">
          A decentralized verification system for medical crowdfunding campaigns
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Health Professionals" 
          value={verifierStats.healthProfessionals}
          description={`${verifierStats.healthProfessionals}/${verifierStats.maxHealthProfessionals} positions filled`}
          icon={<User size={18} />}
        />
        <StatCard 
          title="DAO Members" 
          value={verifierStats.daoMembers}
          description={`${verifierStats.daoMembers}/${verifierStats.maxDaoMembers} positions filled`}
          icon={<Users size={18} />}
        />
        <StatCard 
          title="Auto-DAO Verifiers" 
          value={verifierStats.autoDaoMembers}
          description="Approved through donations"
          icon={<HeartHandshake size={18} />}
        />
        <StatCard 
          title="Genesis Committee" 
          value={verifierStats.genesisMembers}
          description={`${verifierStats.genesisMembers}/5 positions filled`}
          icon={<ShieldCheck size={18} />}
        />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg medical-heading">Current Verifier Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Health Professionals</span>
                <span>{verifierStats.healthProfessionals}/{verifierStats.maxHealthProfessionals}</span>
              </div>
              <Progress value={(verifierStats.healthProfessionals / verifierStats.maxHealthProfessionals) * 100} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>DAO Members</span>
                <span>{verifierStats.daoMembers}/{verifierStats.maxDaoMembers}</span>
              </div>
              <Progress value={(verifierStats.daoMembers / verifierStats.maxDaoMembers) * 100} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Genesis Committee</span>
                <span>{verifierStats.genesisMembers}/5</span>
              </div>
              <Progress value={(verifierStats.genesisMembers / 5) * 100} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div>
        <h2 className="text-xl font-semibold mb-4 medical-heading">Verifier Roles</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {verifierTypes.map((type) => (
            <VerifierTypeCard
              key={type.title}
              title={type.title}
              description={type.description}
              icon={type.icon}
              applyLink={type.applyLink}
              requirements={type.requirements}
            />
          ))}
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg medical-heading">Verification Process</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-medical-blue rounded-full p-2 text-white mt-0.5">
                <Heart size={16} />
              </div>
              <div>
                <h3 className="font-semibold">Campaign Creation</h3>
                <p className="text-sm text-muted-foreground">Medical campaigns are created by patients or their representatives</p>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex items-start gap-4">
              <div className="bg-medical-blue rounded-full p-2 text-white mt-0.5">
                <User size={16} />
              </div>
              <div>
                <h3 className="font-semibold">Medical Verification</h3>
                <p className="text-sm text-muted-foreground">Health Professional verifiers review and validate medical details</p>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex items-start gap-4">
              <div className="bg-medical-blue rounded-full p-2 text-white mt-0.5">
                <Check size={16} />
              </div>
              <div>
                <h3 className="font-semibold">DAO Approval</h3>
                <p className="text-sm text-muted-foreground">DAO members validate identity and campaign legitimacy</p>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex items-start gap-4">
              <div className="bg-medical-green rounded-full p-2 text-white mt-0.5">
                <HeartHandshake size={16} />
              </div>
              <div>
                <h3 className="font-semibold">Funding Release</h3>
                <p className="text-sm text-muted-foreground">Verified campaigns receive funding for medical treatment</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
