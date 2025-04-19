
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-medical-gray">
      <div className="text-center p-6 bg-white rounded-lg shadow-sm max-w-md">
        <h1 className="text-4xl font-bold mb-4 text-medical-blue">404</h1>
        <p className="text-xl text-gray-600 mb-6">Page not found</p>
        <p className="text-muted-foreground mb-6">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Button asChild className="bg-medical-blue hover:bg-medical-blue/90">
          <Link to="/">Return to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
