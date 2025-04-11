import { useEffect } from "react";
import { useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import ClientList from "@/components/requests/ClientList";
import useAuth from "@/hooks/use-auth";

const ClientListPage = () => {
  const [, setLocation] = useLocation();
  const { user, isLoading: authLoading } = useAuth();

  // Check if user is logged in
  useEffect(() => {
    if (!authLoading && !user) {
      setLocation("/auth/login?redirect=/clients");
    }
  }, [user, authLoading, setLocation]);

  // Scroll to top on initial load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>My Event Requests | Let'sGala</title>
        <meta name="description" content="View and manage your event requests with vendors." />
      </Helmet>

      <div 
        className="min-h-screen bg-cream py-12 px-4 sm:px-6 lg:px-8"
        style={{
          backgroundImage: `linear-gradient(rgba(253, 247, 233, 0.9), rgba(253, 247, 233, 0.95)), 
                           url('https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=20')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
              <CardContent className="pt-6 px-6">
                <h1 className="text-2xl md:text-3xl font-display font-bold mb-6">
                  Requested Client List
                </h1>
                
                {authLoading ? (
                  <div className="text-center py-8">Loading user information...</div>
                ) : user ? (
                  <ClientList userId={user.id} />
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Please log in to view your requests.
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ClientListPage;
