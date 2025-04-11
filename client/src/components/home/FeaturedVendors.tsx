import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Vendor } from "@shared/schema";
import { Star, StarHalf, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const FeaturedVendors = () => {
  const { data: vendors, isLoading, error } = useQuery<Vendor[]>({
    queryKey: ["/api/vendors/featured"],
  });

  return (
    <section className="section-dark py-16 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold">
            FEATURED <span className="text-primary">VENDORS</span>
          </h2>
          <div className="heading-divider"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Meet our top-rated event professionals who consistently deliver exceptional experiences
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[400px] bg-gray-800 rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-red-400">Failed to load vendors. Please try again later.</p>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.2 }}
          >
            {vendors?.slice(0, 3).map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </motion.div>
        )}
        
        <div className="mt-12 text-center">
          <Link href="/vendors">
            <Button 
              size="lg" 
              className="cta-button text-lg shadow-lg"
            >
              View All Vendors
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

interface VendorCardProps {
  vendor: Vendor;
}

const VendorCard = ({ vendor }: VendorCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="h-56 overflow-hidden">
        <img 
          src={vendor.profileImage || "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6"} 
          className="w-full h-full object-cover" 
          alt={vendor.businessName} 
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-display font-bold">{vendor.businessName}</h3>
          <div className="flex">
            {[...Array(Math.floor(vendor.rating || 0))].map((_, i) => (
              <Star key={i} className="h-4 w-4 text-primary" fill="currentColor" />
            ))}
            {vendor.rating && vendor.rating % 1 >= 0.5 && (
              <StarHalf className="h-4 w-4 text-primary" fill="currentColor" />
            )}
          </div>
        </div>
        <p className="text-gray-400 mb-3 line-clamp-2">{vendor.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-300 flex items-center">
            <MapPin className="h-4 w-4 mr-1 text-primary" />
            {vendor.city}, {vendor.state}
          </span>
          <Link href={`/vendors/${vendor.id}`}>
            <Button className="cta-button">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedVendors;
