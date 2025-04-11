import { useEffect } from "react";
import { useSearch } from "wouter";
import { Helmet } from "react-helmet";
import VendorGrid from "@/components/vendors/VendorGrid";
import { motion } from "framer-motion";

const VendorsPage = () => {
  // Parse search parameters
  const search = useSearch();
  const params = new URLSearchParams(search);
  const category = params.get("category") || "";
  const city = params.get("city") || "";
  const searchQuery = params.get("search") || "";
  
  // Scroll to top on initial load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Find Top Vendors | Let'sGala</title>
        <meta name="description" content="Browse and find the best event vendors in your area." />
      </Helmet>
      
      <section 
        className="relative py-16 md:py-24 bg-cover bg-center text-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight mb-4">
            Find Top Vendors Near You
          </h1>
          <p className="text-xl text-white mb-8 font-light">
            Browse our curated list of professional event service providers
          </p>
        </motion.div>
      </section>
      
      <div className="bg-cream py-8 min-h-screen">
        <VendorGrid 
          initialCategory={category} 
          initialCity={city} 
          initialSearch={searchQuery} 
        />
      </div>
    </>
  );
};

export default VendorsPage;
