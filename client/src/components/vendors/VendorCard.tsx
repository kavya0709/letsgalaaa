import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Vendor } from "@shared/schema";
import { MapPin, Star, StarHalf } from "lucide-react";
import { motion } from "framer-motion";

interface VendorCardProps {
  vendor: Vendor;
}

const VendorCard = ({ vendor }: VendorCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5 }}
      className="transition-all duration-300"
    >
      <Card className="overflow-hidden bg-gray-900 text-white h-full">
        <div className="h-56 overflow-hidden">
          <img 
            src={vendor.profileImage || "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6"} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
            alt={vendor.businessName} 
          />
        </div>
        <CardContent className="p-6">
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
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default VendorCard;
