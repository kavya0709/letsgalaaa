import { useEffect } from "react";
import { useParams, useLocation, useSearch } from "wouter";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import useAuth from "@/hooks/use-auth";

const AuthPage = () => {
  const { type } = useParams<{ type: string }>();
  const [location, setLocation] = useLocation();
  const search = useSearch();
  const { user, isLoading } = useAuth();
  
  // Extract redirect URL from query parameters
  const redirect = new URLSearchParams(search).get("redirect") || "/";
  
  // Redirect to home or specified page if already logged in
  useEffect(() => {
    if (!isLoading && user) {
      setLocation(redirect);
    }
  }, [user, isLoading, setLocation, redirect]);

  // Validate page type
  const isLogin = type === "login";
  const isRegister = type === "register";
  
  if (!isLogin && !isRegister) {
    setLocation("/auth/login");
    return null;
  }

  return (
    <>
      <Helmet>
        <title>
          {isLogin ? "Sign In" : "Create Account"} | Let'sGala
        </title>
        <meta 
          name="description" 
          content={isLogin 
            ? "Sign in to your Let'sGala account to manage events and vendor requests." 
            : "Create a new account to start planning your events with Let'sGala."}
        />
      </Helmet>

      <div 
        className="min-h-screen bg-cream py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(253, 247, 233, 0.8), rgba(253, 247, 233, 0.9)), 
                           url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=20')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
            <CardContent className="pt-6 px-6">
              <h1 className="text-2xl md:text-3xl font-display font-bold text-center mb-6">
                {isLogin ? "Sign In to Your Account" : "Create a New Account"}
              </h1>
              
              {isLogin ? (
                <LoginForm redirect={redirect} />
              ) : (
                <RegisterForm redirect={redirect} />
              )}
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                  <a 
                    href={isLogin ? `/auth/register?redirect=${encodeURIComponent(redirect)}` : `/auth/login?redirect=${encodeURIComponent(redirect)}`}
                    className="ml-1 text-primary hover:text-amber-600 font-medium"
                    onClick={(e) => {
                      e.preventDefault();
                      setLocation(isLogin 
                        ? `/auth/register?redirect=${encodeURIComponent(redirect)}` 
                        : `/auth/login?redirect=${encodeURIComponent(redirect)}`);
                    }}
                  >
                    {isLogin ? "Register now" : "Sign in"}
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default AuthPage;
