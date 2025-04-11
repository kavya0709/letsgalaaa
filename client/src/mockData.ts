import { User, Vendor, EventRequest, Review } from "@shared/schema";

// Mock Users
export const users: User[] = [
  {
    id: 1,
    username: "kavya",
    email: "kavyaks0709@gmail.com",
    password: "password123",
    fullName: "Kavya Karthikeyan",
    phone: "555-123-4567",
    profileImage: "https://randomuser.me/api/portraits/women/2.jpg",
    isVendor: false,
    createdAt: new Date()
  },
  {
    id: 2,
    username: "vendor1",
    email: "vendor1@example.com",
    password: "password123",
    fullName: "Sarah Johnson",
    phone: "555-234-5678",
    profileImage: "https://randomuser.me/api/portraits/women/1.jpg",
    isVendor: true,
    createdAt: new Date()
  },
  {
    id: 3,
    username: "vendor2",
    email: "vendor2@example.com",
    password: "password123",
    fullName: "Michael Wilson",
    phone: "555-345-6789",
    profileImage: "https://randomuser.me/api/portraits/men/2.jpg",
    isVendor: true,
    createdAt: new Date()
  }
];

// Mock Vendors
export const vendors: Vendor[] = [
  {
    id: 1,
    userId: 2,
    businessName: "Harmony Gardens",
    description: "A beautiful outdoor venue perfect for weddings and formal events with stunning garden settings and elegant facilities.",
    category: "Venue",
    city: "San Francisco",
    state: "CA",
    address: "123 Garden Way",
    zipCode: "94107",
    phone: "555-123-4567",
    email: "info@harmonygardens.com",
    website: "https://harmonygardens.com",
    profileImage: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509927083803-4bd519298ac4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    services: ["Outdoor ceremonies", "Indoor receptions", "Catering options", "Decoration services"],
    featuredEvent: "Spring Garden Wedding",
    rating: 5,
    reviewCount: 24,
    createdAt: new Date()
  },
  {
    id: 2,
    userId: 3,
    businessName: "Elite Catering Co.",
    description: "Providing exceptional catering services for all types of events. Our chefs create customized menus that delight guests.",
    category: "Catering",
    city: "Los Angeles",
    state: "CA",
    address: "456 Culinary Blvd",
    zipCode: "90001",
    phone: "555-987-6543",
    email: "info@elitecatering.com",
    website: "https://elitecatering.com",
    profileImage: "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547573854-74d2a71d0826?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1563900607799-39dea6a97e4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    services: ["Custom menus", "Staff service", "Bar service", "Equipment rental"],
    featuredEvent: "Corporate Holiday Party",
    rating: 5,
    reviewCount: 18,
    createdAt: new Date()
  },
  {
    id: 3,
    userId: 4,
    businessName: "Capture Moments Photography",
    description: "Professional photography services that capture the essence and emotions of your special events.",
    category: "Photography",
    city: "New York",
    state: "NY",
    address: "789 Lens Avenue",
    zipCode: "10001",
    phone: "555-234-5678",
    email: "info@capturemoments.com",
    website: "https://capturemoments.com",
    profileImage: "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1502759683299-cdcd6974244f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1591604021695-0c69b7c05981?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    services: ["Event photography", "Portrait sessions", "Album creation", "Digital file delivery"],
    featuredEvent: "Spring Wedding",
    rating: 5,
    reviewCount: 32,
    createdAt: new Date()
  },
  {
    id: 4,
    userId: 5,
    businessName: "Blooming Bouquets",
    description: "Creating stunning floral arrangements for weddings and special events. Customized designs for any theme or color scheme.",
    category: "Decoration",
    city: "Chicago",
    state: "IL",
    address: "321 Petal Street",
    zipCode: "60601",
    phone: "555-345-6789",
    email: "info@bloomingbouquets.com",
    website: "https://bloomingbouquets.com",
    profileImage: "https://images.unsplash.com/photo-1563241151-526bcd10c7b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1508182314998-3bd49473002f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1563241151-526bcd10c7b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1501446529957-6226bd447c46?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1561118825-d12bd0e9e0c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    services: ["Bridal bouquets", "Centerpieces", "Venue decoration", "Arch and altar arrangements"],
    featuredEvent: "Winter Wonderland Wedding",
    rating: 4,
    reviewCount: 15,
    createdAt: new Date()
  },
  {
    id: 5,
    userId: 6,
    businessName: "Rhythmic Beats Entertainment",
    description: "Full-service DJ and entertainment company specializing in weddings, corporate events, and private parties.",
    category: "Music & Entertainment",
    city: "Miami",
    state: "FL",
    address: "567 Melody Lane",
    zipCode: "33101",
    phone: "555-456-7890",
    email: "info@rhythmicbeats.com",
    website: "https://rhythmicbeats.com",
    profileImage: "https://images.unsplash.com/photo-1571747149938-e89396403181?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1571747149938-e89396403181?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560359614-870d1fe7d611?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    services: ["DJ services", "Live band options", "Lighting", "Sound systems"],
    featuredEvent: "Miami Beach Corporate Party",
    rating: 4,
    reviewCount: 12,
    createdAt: new Date()
  },
  {
    id: 6,
    userId: 7,
    businessName: "Dream Events Planning",
    description: "Full-service event planning and coordination for weddings, corporate events, and social gatherings.",
    category: "Event Planning",
    city: "San Francisco",
    state: "CA",
    address: "890 Planner Avenue",
    zipCode: "94107",
    phone: "555-567-8901",
    email: "info@dreamevents.com",
    website: "https://dreamevents.com",
    profileImage: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1542372147193-a7aca54189cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    services: ["Full planning", "Day-of coordination", "Vendor management", "Budget planning"],
    featuredEvent: "Luxury Anniversary Celebration",
    rating: 5,
    reviewCount: 28,
    createdAt: new Date()
  }
];

// Mock Event Requests
export const eventRequests: EventRequest[] = [
  {
    id: 1,
    userId: 1,
    vendorId: 1,
    eventType: "Wedding",
    eventDate: "2025-05-15",
    startTime: "14:00",
    duration: 6, 
    guestCount: 150,
    budget: 15000,
    additionalDetails: "Looking for a garden venue with capacity for 150 guests. We're planning an outdoor ceremony followed by an indoor reception.",
    status: "pending",
    createdAt: new Date()
  },
  {
    id: 2,
    userId: 1,
    vendorId: 2,
    eventType: "Corporate Party",
    eventDate: "2025-04-30",
    startTime: "18:00",
    duration: 4,
    guestCount: 75,
    budget: 5000,
    additionalDetails: "End of year company celebration. Would need catering for a cocktail-style reception with passed appetizers.",
    status: "accepted",
    createdAt: new Date()
  },
  {
    id: 3,
    userId: 1,
    vendorId: 3,
    eventType: "Birthday",
    eventDate: "2025-04-20",
    startTime: "13:00",
    duration: 4,
    guestCount: 30,
    budget: 1000,
    additionalDetails: "Looking for a photographer for my daughter's 16th birthday celebration. Event will be 4 hours long.",
    status: "completed",
    createdAt: new Date()
  }
];

// Mock Reviews
export const reviews: Review[] = [
  {
    id: 1,
    userId: 1,
    vendorId: 1,
    rating: 5,
    comment: "Harmony Gardens provided the perfect setting for our wedding. The staff was incredibly helpful and the venue was absolutely gorgeous.",
    eventType: "Wedding",
    eventDate: "2025-01-15",
    createdAt: new Date()
  },
  {
    id: 2,
    userId: 1,
    vendorId: 2,
    rating: 4,
    comment: "Elite Catering provided delicious food for our corporate event. The presentation was beautiful and the staff was professional.",
    eventType: "Corporate Event",
    eventDate: "2025-02-20",
    createdAt: new Date()
  },
  {
    id: 3,
    userId: 2,
    vendorId: 3,
    rating: 5,
    comment: "Capture Moments did an amazing job with our event photography. The photos captured all the special moments perfectly.",
    eventType: "Birthday",
    eventDate: "2025-03-10",
    createdAt: new Date()
  }
];

// Helper functions to simulate API calls with mock data
export const mockApi = {
  // User-related functions
  getUsers: () => Promise.resolve(users),
  getUser: (id: number) => Promise.resolve(users.find(user => user.id === id)),
  getUserByUsername: (username: string) => Promise.resolve(users.find(user => user.username === username)),
  login: (username: string, password: string) => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      return Promise.resolve(user);
    }
    return Promise.reject(new Error("Invalid username or password"));
  },
  register: (userData: Partial<User>) => {
    const newUser: User = {
      id: users.length + 1,
      username: userData.username || "",
      email: userData.email || "",
      password: userData.password || "",
      fullName: userData.fullName || null,
      phone: userData.phone || null,
      profileImage: userData.profileImage || null,
      isVendor: userData.isVendor || false,
      createdAt: new Date()
    };
    users.push(newUser);
    return Promise.resolve(newUser);
  },
  
  // Vendor-related functions
  getVendors: (filters?: Partial<{category: string, city: string, search: string}>) => {
    let filteredVendors = [...vendors];
    
    if (filters) {
      if (filters.category && filters.category !== "all") {
        filteredVendors = filteredVendors.filter(v => v.category === filters.category);
      }
      
      if (filters.city && filters.city !== "all") {
        filteredVendors = filteredVendors.filter(v => v.city === filters.city);
      }
      
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredVendors = filteredVendors.filter(v => 
          v.businessName.toLowerCase().includes(searchLower) ||
          v.description.toLowerCase().includes(searchLower)
        );
      }
    }
    
    return Promise.resolve(filteredVendors);
  },
  getVendor: (id: number) => Promise.resolve(vendors.find(vendor => vendor.id === id)),
  // Since 'featured' isn't in our schema, we'll use rating to determine featured vendors
  getFeaturedVendors: (limit: number = 3) => Promise.resolve(
    vendors
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, limit)
  ),
  
  // Event Request-related functions
  getEventRequests: () => Promise.resolve(eventRequests),
  getEventRequest: (id: number) => Promise.resolve(eventRequests.find(req => req.id === id)),
  getEventRequestsByUserId: (userId: number) => Promise.resolve(eventRequests.filter(req => req.userId === userId)),
  getEventRequestsByVendorId: (vendorId: number) => Promise.resolve(eventRequests.filter(req => req.vendorId === vendorId)),
  createEventRequest: (request: Partial<EventRequest>) => {
    const newRequest: EventRequest = {
      id: eventRequests.length + 1,
      userId: request.userId || 0,
      vendorId: request.vendorId || 0,
      eventType: request.eventType || "",
      eventDate: request.eventDate || "2025-05-01",
      startTime: request.startTime || "12:00",
      duration: request.duration || 4,
      guestCount: request.guestCount || 0,
      budget: request.budget || 0,
      additionalDetails: request.additionalDetails || "",
      status: "pending",
      createdAt: new Date()
    };
    eventRequests.push(newRequest);
    return Promise.resolve(newRequest);
  },
  
  // Review-related functions
  getReviews: () => Promise.resolve(reviews),
  getReviewsByVendorId: (vendorId: number) => Promise.resolve(reviews.filter(review => review.vendorId === vendorId)),
  createReview: (reviewData: Partial<Review>) => {
    const newReview: Review = {
      id: reviews.length + 1,
      userId: reviewData.userId || 0,
      vendorId: reviewData.vendorId || 0,
      rating: reviewData.rating || 0,
      comment: reviewData.comment || "",
      eventType: reviewData.eventType || "Wedding",
      eventDate: reviewData.eventDate || "2025-04-15",
      createdAt: new Date()
    };
    reviews.push(newReview);
    return Promise.resolve(newReview);
  }
};