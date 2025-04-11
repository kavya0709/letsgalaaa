import { useEffect } from "react";
import { useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import ProfileForm from "@/components/auth/ProfileForm";
import useAuth from "@/hooks/use-auth";

const CompleteProfilePage = () => {
  const [location, setLocation] = useLocation();
  const { user, isLoading } = useAuth();
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      setLocation('/auth/login?redirect=/complete-profile');
    }
  }, [user, isLoading, setLocation]);

  // Scroll to top on initial load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Complete Your Profile | Let'sGala</title>
        <meta name="description" content="Complete your profile information to get the most out of Let'sGala." />
      </Helmet>

      <div 
        className="min-h-screen bg-cream py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(253, 247, 233, 0.8), rgba(253, 247, 233, 0.9)), 
                         url('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=20')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-gray-500"
            >
              Loading user information...
            </motion.div>
          ) : user ? (
            <motion.div
              key="profile-form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-md"
            >
              <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                <CardContent className="pt-6 px-6">
                  <h1 className="text-2xl md:text-3xl font-display font-bold text-center mb-6">
                    Complete Your Profile
                  </h1>
                  
                  <ProfileForm user={user} />
                </CardContent>
              </Card>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </>
  );
};

export default CompleteProfilePage;
