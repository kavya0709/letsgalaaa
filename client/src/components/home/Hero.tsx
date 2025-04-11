import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section 
      className="relative h-[600px] flex items-center justify-center text-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight mb-4">
            Plan Your Perfect Event with Let'sGala
          </h1>
          <p className="text-xl text-white mb-8 font-light">
            Find the best vendors, venues, and services for your special occasion
          </p>
          <Link href="/vendors">
            <Button 
              size="lg" 
              className="cta-button text-lg shadow-lg"
            >
              Get Started
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
