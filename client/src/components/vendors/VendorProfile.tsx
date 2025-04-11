import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Vendor, Review } from "@shared/schema";
import VendorGallery from "./VendorGallery";
import { MapPin, Phone, Mail, Globe, Star, StarHalf, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface VendorProfileProps {
  vendorId: number;
}

const VendorProfile = ({ vendorId }: VendorProfileProps) => {
  const { data: vendor, isLoading: vendorLoading } = useQuery<Vendor>({
    queryKey: [`/api/vendors/${vendorId}`],
  });

  const { data: reviews, isLoading: reviewsLoading } = useQuery<Review[]>({
    queryKey: [`/api/reviews?vendorId=${vendorId}`],
  });

  if (vendorLoading) {
    return <div className="p-12 text-center">Loading vendor details...</div>;
  }

  if (!vendor) {
    return <div className="p-12 text-center">Vendor not found</div>;
  }

  return (
    <div className="bg-cream min-h-screen">
      {/* Hero Section */}
      <div 
        className="h-80 bg-cover bg-center relative"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url('${vendor.coverImage || vendor.profileImage}')` 
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
        <div className="container mx-auto px-4 h-full flex items-end pb-8 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
            <div className="w-32 h-32 rounded-lg overflow-hidden border-4 border-white shadow-xl bg-white">
              <img 
                src={vendor.profileImage || "https://via.placeholder.com/128"} 
                alt={vendor.businessName} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-white">
              <h1 className="text-3xl md:text-4xl font-display font-bold">{vendor.businessName}</h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex">
                  {[...Array(Math.floor(vendor.rating || 0))].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-primary" fill="currentColor" />
                  ))}
                  {vendor.rating && vendor.rating % 1 >= 0.5 && (
                    <StarHalf className="h-5 w-5 text-primary" fill="currentColor" />
                  )}
                </div>
                <span className="text-sm">({vendor.reviewCount || 0} reviews)</span>
                <span className="mx-2">•</span>
                <span className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {vendor.city}, {vendor.state}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-8">
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Link href={`/request-info/${vendorId}`}>
            <Button size="lg" className="cta-button">
              Request Info
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
            Save to Favorites
          </Button>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 mb-6">
            <TabsTrigger 
              value="about" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary px-6 py-3"
            >
              About
            </TabsTrigger>
            <TabsTrigger 
              value="gallery" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary px-6 py-3"
            >
              Gallery
            </TabsTrigger>
            <TabsTrigger 
              value="reviews" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary px-6 py-3"
            >
              Reviews
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="about" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h2 className="text-2xl font-display font-bold mb-4">About {vendor.businessName}</h2>
                  <p className="text-gray-700 mb-6">{vendor.description}</p>
                  
                  <h3 className="text-xl font-display font-bold mb-3">Services Offered</h3>
                  <ul className="list-disc pl-5 text-gray-700 mb-6">
                    {vendor.services?.map((service, index) => (
                      <li key={index} className="mb-1">{service}</li>
                    ))}
                  </ul>
                  
                  <h3 className="text-xl font-display font-bold mb-3">Featured Event</h3>
                  <p className="text-gray-700">
                    <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      {vendor.featuredEvent}
                    </span>
                  </p>
                </div>
              </div>
              
              <div className="md:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h3 className="text-xl font-display font-bold mb-4">Contact Information</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <MapPin className="h-5 w-5 text-primary mt-0.5 mr-3" />
                      <span className="text-gray-700">
                        {vendor.address}<br />
                        {vendor.city}, {vendor.state} {vendor.zipCode}
                      </span>
                    </li>
                    <li className="flex items-center">
                      <Phone className="h-5 w-5 text-primary mr-3" />
                      <a href={`tel:${vendor.phone}`} className="text-gray-700 hover:text-primary">
                        {vendor.phone}
                      </a>
                    </li>
                    <li className="flex items-center">
                      <Mail className="h-5 w-5 text-primary mr-3" />
                      <a href={`mailto:${vendor.email}`} className="text-gray-700 hover:text-primary">
                        {vendor.email}
                      </a>
                    </li>
                    {vendor.website && (
                      <li className="flex items-center">
                        <Globe className="h-5 w-5 text-primary mr-3" />
                        <a 
                          href={vendor.website} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-gray-700 hover:text-primary"
                        >
                          Website
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-display font-bold mb-4">Business Hours</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-gray-700">Monday - Friday</span>
                      <span className="text-gray-700 flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-primary" /> 9:00 AM - 6:00 PM
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-700">Saturday</span>
                      <span className="text-gray-700 flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-primary" /> 10:00 AM - 4:00 PM
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-700">Sunday</span>
                      <span className="text-gray-700 flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-primary" /> Closed
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="gallery" className="mt-0">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-display font-bold mb-6">Gallery</h2>
              <VendorGallery images={vendor.gallery || []} />
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-0">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-display font-bold mb-6">Client Reviews</h2>
              
              {reviewsLoading ? (
                <div className="text-center py-8">Loading reviews...</div>
              ) : reviews && reviews.length > 0 ? (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <motion.div 
                      key={review.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="border-b border-gray-200 pb-6 last:border-b-0"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
                          <div>
                            <h4 className="font-bold text-gray-900">Client #{review.userId}</h4>
                            <p className="text-sm text-gray-500">{review.eventType}, {review.eventDate}</p>
                          </div>
                        </div>
                        <div className="flex">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-primary" fill="currentColor" />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No reviews yet. Be the first to leave a review!
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default VendorProfile;
