import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockApi } from "../mockData";
import { User, EventRequest } from "@shared/schema";
import { Loader2, Edit, LogOut, Mail, Phone, UserCircle, Calendar, Users, DollarSign, Clock, AlertCircle } from "lucide-react";
import useAuth from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

const ProfilePage = () => {
  const [_, navigate] = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState<EventRequest[]>([]);
  const [requestsLoading, setRequestsLoading] = useState(false);
  const { logout } = useAuth();
  const { toast } = useToast();
  
  useEffect(() => {
    // In a real app, this would use the authenticated user
    // For this frontend demo, we'll check localStorage first, then use mock data
    const loadUser = async () => {
      try {
        // Check for user in localStorage (from auth)
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          // If no stored user, use mock data for demo purposes
          const userData = await mockApi.getUser(1);
          setUser(userData || null);
        }
      } catch (error) {
        console.error("Failed to load user data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadUser();
  }, []);
  
  // Load user's event requests
  useEffect(() => {
    const loadRequests = async () => {
      if (!user) return;
      
      try {
        setRequestsLoading(true);
        const userRequests = await mockApi.getEventRequestsByUserId(user.id);
        setRequests(userRequests);
      } catch (error) {
        console.error("Failed to load event requests:", error);
      } finally {
        setRequestsLoading(false);
      }
    };
    
    if (user) {
      loadRequests();
    }
  }, [user]);
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account"
    });
    navigate('/');
  };
  
  const getInitials = (name: string | null) => {
    if (!name) return "U";
    return name.split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-16 p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Not Logged In</h2>
        <p className="mb-6">Please log in to view your profile.</p>
        <Button onClick={() => navigate("/auth")} className="cta-button">
          Go to Login
        </Button>
      </div>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>My Profile | Let's Gala</title>
      </Helmet>
      
      <div className="container max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Sidebar */}
          <div className="md:w-1/3">
            <Card className="h-full">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user.profileImage || undefined} alt={user.fullName || "User"} />
                    <AvatarFallback className="text-2xl">{getInitials(user.fullName)}</AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-2xl">{user.fullName || "User"}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Mail className="mr-2 h-4 w-4" />
                  {user.email}
                </div>
                {user.phone && (
                  <div className="flex items-center text-sm text-gray-500">
                    <Phone className="mr-2 h-4 w-4" />
                    {user.phone}
                  </div>
                )}
                {user.isVendor && (
                  <div className="flex items-center text-sm text-gray-500 mt-2">
                    <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
                      Vendor Account
                    </span>
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="flex flex-col gap-2">
                <Button variant="outline" className="w-full" onClick={() => navigate("/profile/edit")}>
                  <Edit className="mr-2 h-4 w-4" /> Edit Profile
                </Button>
                <Button variant="destructive" className="w-full" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" /> Log Out
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="md:w-2/3">
            <Tabs defaultValue="requests">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="requests">My Requests</TabsTrigger>
                <TabsTrigger value="settings">Account Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="requests" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Event Requests</CardTitle>
                    <CardDescription>
                      View and manage your event requests and bookings.
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="p-0">
                    {requestsLoading ? (
                      <div className="flex justify-center items-center p-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      </div>
                    ) : requests.length > 0 ? (
                      <div>
                        {requests.map((request) => (
                          <div key={request.id} className="border-b last:border-0 p-4 hover:bg-gray-50">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-lg font-medium">{request.eventType}</h3>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                (request.status || '') === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                (request.status || '') === 'accepted' ? 'bg-green-100 text-green-800' :
                                (request.status || '') === 'completed' ? 'bg-blue-100 text-blue-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {(request.status || 'Unknown').charAt(0).toUpperCase() + (request.status || 'Unknown').slice(1)}
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                              <div className="flex items-center text-gray-600">
                                <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                                {request.eventDate}
                              </div>
                              <div className="flex items-center text-gray-600">
                                <Clock className="h-4 w-4 mr-2 text-gray-400" />
                                {request.startTime}, {request.duration} hours
                              </div>
                              <div className="flex items-center text-gray-600">
                                <Users className="h-4 w-4 mr-2 text-gray-400" />
                                {request.guestCount} guests
                              </div>
                              <div className="flex items-center text-gray-600">
                                <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
                                ${(request.budget || 0).toLocaleString()}
                              </div>
                            </div>
                            
                            <div className="flex justify-end">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => navigate(`/request-info/${request.id}`)}
                              >
                                View Details
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-6 text-center">
                        <UserCircle className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                        <h3 className="text-lg font-medium">No Event Requests Yet</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Browse vendors and submit requests to plan your perfect event.
                        </p>
                        <Button className="mt-4 cta-button" onClick={() => navigate("/vendors")}>
                          Browse Vendors
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="settings" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>
                      Manage your account settings and preferences.
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border-b pb-4">
                        <h3 className="font-medium mb-1">Email Notifications</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Receive email notifications</span>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="emailNotif"
                              className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
                              defaultChecked
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-b pb-4">
                        <h3 className="font-medium mb-1">Privacy Settings</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Profile visibility</span>
                          <select
                            className="mt-1 block w-1/3 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                            defaultValue="public"
                          >
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                          </select>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-1">Account Management</h3>
                        <div className="flex flex-col space-y-2">
                          <Button variant="link" className="justify-start px-0 text-sm text-red-600 hover:text-red-800">
                            Reset Password
                          </Button>
                          <Button variant="link" className="justify-start px-0 text-sm text-red-600 hover:text-red-800">
                            Delete Account
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;