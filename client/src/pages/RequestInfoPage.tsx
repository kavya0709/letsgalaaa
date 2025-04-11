import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Vendor } from "@shared/schema";
import RequestForm from "@/components/requests/RequestForm";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import useAuth from "@/hooks/use-auth";

const RequestInfoPage = () => {
  const { id } = useParams<{ id: string }>();
  const vendorId = id ? parseInt(id) : 0;
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { data: vendor, isLoading } = useQuery<Vendor>({
    queryKey: [`/api/vendors/${vendorId}`],
    enabled: !!vendorId,
  });
  
  // Check if user is logged in
  useEffect(() => {
    if (!user) {
      setLocation("/auth/login?redirect=/request-info/" + id);
    }
  }, [user, setLocation, id]);
  
  // Scroll to top on initial load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleRequestSuccess = () => {
    setIsSubmitted(true);
  };
  
  const returnToVendor = () => {
    setLocation(`/vendors/${vendorId}`);
  };
  
  const viewRequests = () => {
    setLocation('/clients');
  };

  return (
    <>
      <Helmet>
        <title>
          {isSubmitted 
            ? "Request Submitted | Let'sGala" 
            : isLoading || !vendor 
              ? "Request Information | Let'sGala" 
              : `Request Info: ${vendor.businessName} | Let'sGala`}
        </title>
        <meta name="description" content="Submit your event details to request information from this vendor." />
      </Helmet>

      <div 
        className="min-h-screen bg-cream py-12 px-4 sm:px-6 lg:px-8"
        style={{
          backgroundImage: `linear-gradient(rgba(253, 247, 233, 0.9), rgba(253, 247, 233, 0.95)), 
                           url('https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=20')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                  <CardContent className="pt-10 pb-10 px-8">
                    <div className="mb-6 flex justify-center">
                      <CheckCircle2 className="h-20 w-20 text-green-500" />
                    </div>
                    <h1 className="text-2xl md:text-3xl font-display font-bold mb-4">
                      Successful
                    </h1>
                    <p className="text-gray-600 mb-8">
                      Your request has been submitted successfully. The vendor will contact you soon.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button onClick={returnToVendor} variant="outline" className="border-primary text-primary">
                        Return to Vendor
                      </Button>
                      <Button onClick={viewRequests} className="cta-button">
                        View My Requests
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                  <CardContent className="pt-6 px-6">
                    <h1 className="text-2xl md:text-3xl font-display font-bold text-center mb-6">
                      Request Info
                    </h1>
                    
                    {isLoading ? (
                      <div className="text-center py-8">Loading vendor information...</div>
                    ) : vendor ? (
                      <div className="mb-6">
                        <p className="text-lg text-center text-gray-600">
                          Send your event details to <span className="font-semibold">{vendor.businessName}</span>
                        </p>
                      </div>
                    ) : (
                      <div className="text-center py-4 text-red-500">
                        Vendor information not found. Please try again.
                      </div>
                    )}
                    
                    {vendor && <RequestForm vendorId={vendorId} onSuccess={handleRequestSuccess} />}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default RequestInfoPage;
