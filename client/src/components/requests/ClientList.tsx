import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EventRequest, Vendor } from "@shared/schema";
import { format, parseISO } from "date-fns";
import { Phone } from "lucide-react";
import { motion } from "framer-motion";

interface ClientListProps {
  userId: number;
}

const ClientList = ({ userId }: ClientListProps) => {
  const { data: requests, isLoading: requestsLoading } = useQuery<EventRequest[]>({
    queryKey: [`/api/event-requests?userId=${userId}`],
  });

  // Fetch vendor details for each request
  const { data: vendors, isLoading: vendorsLoading } = useQuery<Vendor[]>({
    queryKey: ["/api/vendors"],
  });

  const isLoading = requestsLoading || vendorsLoading;

  // Helper function to get vendor name
  const getVendorName = (vendorId: number) => {
    const vendor = vendors?.find(v => v.id === vendorId);
    return vendor ? vendor.businessName : "Unknown Vendor";
  };

  // Helper function to get vendor image
  const getVendorImage = (vendorId: number) => {
    const vendor = vendors?.find(v => v.id === vendorId);
    return vendor?.profileImage || "https://via.placeholder.com/100";
  };

  // Sort requests by date (most recent first)
  const sortedRequests = requests?.slice().sort((a, b) => {
    return new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime();
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-display font-bold">My Event Requests</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="text-sm" asChild>
            <Link href="/vendors">Find More Vendors</Link>
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm2 1h12v1H4V6zm0 3h12v1H4V9zm0 3h12v1H4v-1z" clipRule="evenodd" />
            </svg>
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : sortedRequests && sortedRequests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedRequests.map((request) => (
            <RequestCard 
              key={request.id} 
              request={request} 
              vendorName={getVendorName(request.vendorId)}
              vendorImage={getVendorImage(request.vendorId)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-white rounded-lg shadow-sm">
          <h3 className="text-xl font-display font-bold text-gray-900 mb-2">No requests found</h3>
          <p className="text-gray-600 mb-6">
            You haven't submitted any event requests yet.
          </p>
          <Button className="cta-button" asChild>
            <Link href="/vendors">Browse Vendors</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

interface RequestCardProps {
  request: EventRequest;
  vendorName: string;
  vendorImage: string;
}

const RequestCard = ({ request, vendorName, vendorImage }: RequestCardProps) => {
  // Format date from string or Date object
  const formatEventDate = (dateString: string | Date) => {
    if (typeof dateString === 'string') {
      try {
        return format(parseISO(dateString), 'MM/dd/yyyy');
      } catch {
        return dateString; // Return as is if parsing fails
      }
    }
    return format(dateString, 'MM/dd/yyyy');
  };

  // Status badge color
  const statusColor = () => {
    switch(request.status) {
      case 'pending': return 'bg-amber-100 text-amber-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'declined': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="p-4 flex gap-4">
            <div className="h-16 w-16 rounded-full overflow-hidden">
              <img 
                src={vendorImage} 
                alt={vendorName}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{request.eventType}</h3>
                  <p className="text-sm text-gray-500">{vendorName}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor()}`}>
                {request.status ? request.status.charAt(0).toUpperCase() + request.status.slice(1) : "N/A"}
                </span>
              </div>
              
              <div className="mt-3 grid grid-cols-2 gap-x-2 gap-y-1 text-sm">
                <div>
                  <p className="text-gray-500">Preferred Date</p>
                  <p className="font-medium">{formatEventDate(request.eventDate)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Total Budget</p>
                  <p className="font-medium">${request.budget || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-gray-500">Start Time</p>
                  <p className="font-medium">{request.startTime}</p>
                </div>
                <div>
                  <p className="text-gray-500">Duration</p>
                  <p className="font-medium">{request.duration} hours</p>
                </div>
                <div>
                  <p className="text-gray-500">Guest Count</p>
                  <p className="font-medium">{request.guestCount}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t p-4 flex justify-end">
            <Button className="cta-button" size="sm">
              <Phone className="h-4 w-4 mr-2" />
              CALL
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ClientList;
