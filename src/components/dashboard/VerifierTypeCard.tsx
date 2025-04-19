
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface VerifierTypeCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  applyLink: string;
  requirements: string[];
  className?: string;
}

export const VerifierTypeCard: React.FC<VerifierTypeCardProps> = ({ 
  title, 
  description, 
  icon, 
  applyLink, 
  requirements,
  className = ""
}) => {
  return (
    <Card className={`${className} h-full flex flex-col`}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="text-medical-blue">{icon}</div>
          <CardTitle className="text-lg font-bold text-medical-blue">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div>
          <h4 className="text-sm font-semibold mb-2">Requirements:</h4>
          <ul className="text-sm space-y-1 list-disc list-inside">
            {requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full bg-medical-blue hover:bg-medical-blue/90">
          <Link to={applyLink}>Apply Now</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VerifierTypeCard;
