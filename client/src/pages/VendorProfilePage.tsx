import { useEffect } from "react";
import { useParams } from "wouter";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import VendorProfile from "@/components/vendors/VendorProfile";
import { Vendor } from "@shared/schema";

const VendorProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const vendorId = parseInt(id);
  
  // Fetch vendor data for title
  const { data: vendor, isLoading } = useQuery<Vendor>({
    queryKey: [`/api/vendors/${vendorId}`],
  });
  
  // Scroll to top on initial load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>
          {isLoading 
            ? "Loading Vendor Details | Let'sGala" 
            : `${vendor?.businessName || "Vendor"} | Let'sGala`}
        </title>
        <meta 
          name="description" 
          content={vendor?.description || "View vendor details and services for your event planning needs."} 
        />
      </Helmet>
      
      <VendorProfile vendorId={vendorId} />
    </>
  );
};

export default VendorProfilePage;
