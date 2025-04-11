import { 
  User, InsertUser, Vendor, InsertVendor, 
  EventRequest, InsertEventRequest, Review, InsertReview
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUsers(): Promise<User[]>;
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<User>): Promise<User | undefined>;
  
  // Vendor operations
  getVendors(filters?: Partial<{category: string, city: string, search: string}>): Promise<Vendor[]>;
  getVendor(id: number): Promise<Vendor | undefined>;
  getVendorByUserId(userId: number): Promise<Vendor | undefined>;
  createVendor(vendor: InsertVendor): Promise<Vendor>;
  updateVendor(id: number, vendor: Partial<Vendor>): Promise<Vendor | undefined>;
  getFeaturedVendors(limit?: number): Promise<Vendor[]>;
  
  // Event Request operations
  getEventRequests(): Promise<EventRequest[]>;
  getEventRequest(id: number): Promise<EventRequest | undefined>;
  getEventRequestsByUserId(userId: number): Promise<EventRequest[]>;
  getEventRequestsByVendorId(vendorId: number): Promise<EventRequest[]>;
  createEventRequest(request: InsertEventRequest): Promise<EventRequest>;
  updateEventRequest(id: number, request: Partial<EventRequest>): Promise<EventRequest | undefined>;
  
  // Review operations
  getReviews(): Promise<Review[]>;
  getReview(id: number): Promise<Review | undefined>;
  getReviewsByVendorId(vendorId: number): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private vendors: Map<number, Vendor>;
  private eventRequests: Map<number, EventRequest>;
  private reviews: Map<number, Review>;
  
  private userIdCounter: number;
  private vendorIdCounter: number;
  private eventRequestIdCounter: number;
  private reviewIdCounter: number;
  
  constructor() {
    this.users = new Map();
    this.vendors = new Map();
    this.eventRequests = new Map();
    this.reviews = new Map();
    
    this.userIdCounter = 1;
    this.vendorIdCounter = 1;
    this.eventRequestIdCounter = 1;
    this.reviewIdCounter = 1;
    
    // Initialize with sample data
    this.initSampleData();
  }
  
  // User methods
  async getUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }
  
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    );
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );
  }
  
  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const createdAt = new Date();
    const user: User = { ...insertUser, id, createdAt };
    this.users.set(id, user);
    return user;
  }
  
  async updateUser(id: number, userData: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...userData };
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  
  // Vendor methods
  async getVendors(filters?: Partial<{category: string, city: string, search: string}>): Promise<Vendor[]> {
    let vendors = Array.from(this.vendors.values());
    
    if (filters) {
      if (filters.category) {
        vendors = vendors.filter(vendor => 
          vendor.category.toLowerCase() === filters.category?.toLowerCase()
        );
      }
      
      if (filters.city) {
        vendors = vendors.filter(vendor => 
          vendor.city.toLowerCase() === filters.city?.toLowerCase()
        );
      }
      
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        vendors = vendors.filter(vendor => 
          vendor.businessName.toLowerCase().includes(searchTerm) ||
          vendor.description.toLowerCase().includes(searchTerm) ||
          vendor.city.toLowerCase().includes(searchTerm) ||
          vendor.state.toLowerCase().includes(searchTerm)
        );
      }
    }
    
    return vendors;
  }
  
  async getVendor(id: number): Promise<Vendor | undefined> {
    return this.vendors.get(id);
  }
  
  async getVendorByUserId(userId: number): Promise<Vendor | undefined> {
    return Array.from(this.vendors.values()).find(
      (vendor) => vendor.userId === userId
    );
  }
  
  async createVendor(insertVendor: InsertVendor): Promise<Vendor> {
    const id = this.vendorIdCounter++;
    const createdAt = new Date();
    const vendor: Vendor = { 
      ...insertVendor, 
      id, 
      createdAt, 
      rating: 0, 
      reviewCount: 0 
    };
    this.vendors.set(id, vendor);
    return vendor;
  }
  
  async updateVendor(id: number, vendorData: Partial<Vendor>): Promise<Vendor | undefined> {
    const vendor = this.vendors.get(id);
    if (!vendor) return undefined;
    
    const updatedVendor = { ...vendor, ...vendorData };
    this.vendors.set(id, updatedVendor);
    return updatedVendor;
  }
  
  async getFeaturedVendors(limit: number = 6): Promise<Vendor[]> {
    // Get all vendors, sort by rating, and limit to the specified number
    const vendors = Array.from(this.vendors.values())
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, limit);
      
    return vendors;
  }
  
  // Event Request methods
  async getEventRequests(): Promise<EventRequest[]> {
    return Array.from(this.eventRequests.values());
  }
  
  async getEventRequest(id: number): Promise<EventRequest | undefined> {
    return this.eventRequests.get(id);
  }
  
  async getEventRequestsByUserId(userId: number): Promise<EventRequest[]> {
    return Array.from(this.eventRequests.values()).filter(
      (request) => request.userId === userId
    );
  }
  
  async getEventRequestsByVendorId(vendorId: number): Promise<EventRequest[]> {
    return Array.from(this.eventRequests.values()).filter(
      (request) => request.vendorId === vendorId
    );
  }
  
  async createEventRequest(insertRequest: InsertEventRequest): Promise<EventRequest> {
    const id = this.eventRequestIdCounter++;
    const createdAt = new Date();
    const request: EventRequest = { 
      ...insertRequest, 
      id, 
      createdAt, 
      status: "pending" 
    };
    this.eventRequests.set(id, request);
    return request;
  }
  
  async updateEventRequest(id: number, requestData: Partial<EventRequest>): Promise<EventRequest | undefined> {
    const request = this.eventRequests.get(id);
    if (!request) return undefined;
    
    const updatedRequest = { ...request, ...requestData };
    this.eventRequests.set(id, updatedRequest);
    return updatedRequest;
  }
  
  // Review methods
  async getReviews(): Promise<Review[]> {
    return Array.from(this.reviews.values());
  }
  
  async getReview(id: number): Promise<Review | undefined> {
    return this.reviews.get(id);
  }
  
  async getReviewsByVendorId(vendorId: number): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(
      (review) => review.vendorId === vendorId
    );
  }
  
  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = this.reviewIdCounter++;
    const createdAt = new Date();
    const review: Review = { ...insertReview, id, createdAt };
    this.reviews.set(id, review);
    
    // Update vendor rating
    const vendor = this.vendors.get(insertReview.vendorId);
    if (vendor) {
      const vendorReviews = await this.getReviewsByVendorId(vendor.id);
      const totalRating = vendorReviews.reduce((sum, review) => sum + review.rating, 0) + insertReview.rating;
      const avgRating = Math.round((totalRating / (vendorReviews.length + 1)) * 10) / 10;
      
      this.vendors.set(vendor.id, {
        ...vendor,
        rating: avgRating,
        reviewCount: vendorReviews.length + 1
      });
    }
    
    return review;
  }
  
  // Initialize with sample data
  private initSampleData() {
    // Sample users
    const user1 = this.createUser({
      username: "client1",
      password: "password123",
      email: "client1@example.com",
      fullName: "John Doe",
      phone: "555-123-4567",
      isVendor: false,
    });
    
    const user2 = this.createUser({
      username: "vendor1",
      password: "password123",
      email: "vendor1@example.com",
      fullName: "Jane Smith",
      phone: "555-987-6543",
      isVendor: true,
    });
    
    const user3 = this.createUser({
      username: "vendor2",
      password: "password123",
      email: "vendor2@example.com",
      fullName: "Robert Johnson",
      phone: "555-567-8910",
      isVendor: true,
    });
    
    // Sample vendors
    this.createVendor({
      userId: 2,
      businessName: "Harmony Gardens",
      description: "Luxury wedding and event venue with stunning garden views",
      category: "Venue",
      phone: "555-987-6543",
      email: "contact@harmonygardens.com",
      website: "https://www.harmonygardens.com",
      address: "123 Garden Lane",
      city: "San Francisco",
      state: "CA",
      zipCode: "94101",
      profileImage: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      coverImage: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1478146896981-b80fe463b330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      services: [
        "Indoor and outdoor wedding ceremonies",
        "Reception space for up to 200 guests",
        "Bridal suite and groom's quarters",
        "On-site catering services"
      ],
      featuredEvent: "Wedding",
    });
    
    this.createVendor({
      userId: 3,
      businessName: "Elite Decorations",
      description: "Premium event decoration services for all occasions",
      category: "Decoration",
      phone: "555-567-8910",
      email: "info@elitedecorations.com",
      website: "https://www.elitedecorations.com",
      address: "456 Design Blvd",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90001",
      profileImage: "https://images.unsplash.com/photo-1510076857177-7470076d4098?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      coverImage: "https://images.unsplash.com/photo-1510076857177-7470076d4098?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1510076857177-7470076d4098?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      services: [
        "Theme-based decoration packages",
        "Floral arrangements and centerpieces",
        "Lighting design and installation",
        "Custom props and backdrops"
      ],
      featuredEvent: "Birthday",
    });
    
    // Create several more vendors for variety
    this.createVendor({
      userId: 3, // Reusing existing user for demo
      businessName: "Gourmet Delights",
      description: "Exquisite catering service with customized menus",
      category: "Catering",
      phone: "555-111-2222",
      email: "info@gourmetdelights.com",
      website: "https://www.gourmetdelights.com",
      address: "789 Cuisine Ave",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      profileImage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      coverImage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      services: [
        "Customized menu planning",
        "Full-service staff",
        "Bar services",
        "Dessert stations"
      ],
      featuredEvent: "Corporate Event",
    });
    
    // Add sample event requests
    this.createEventRequest({
      userId: 1,
      vendorId: 1,
      eventType: "Wedding",
      eventDate: "2024-12-15",
      guestCount: 100,
      startTime: "17:00",
      duration: 5,
      budget: 10000,
      additionalDetails: "Looking for a venue with garden setting for a winter wedding."
    });
    
    this.createEventRequest({
      userId: 1,
      vendorId: 2,
      eventType: "Birthday",
      eventDate: "2024-10-20",
      guestCount: 50,
      startTime: "19:00",
      duration: 4,
      budget: 5000,
      additionalDetails: "30th birthday celebration with an elegant theme."
    });
    
    // Add sample reviews
    this.createReview({
      userId: 1,
      vendorId: 1,
      rating: 5,
      comment: "Amazing venue! Our wedding was perfect in every way.",
      eventType: "Wedding",
      eventDate: "2024-06-10"
    });
    
    this.createReview({
      userId: 1,
      vendorId: 2,
      rating: 4,
      comment: "Beautiful decorations. Everything looked great.",
      eventType: "Birthday",
      eventDate: "2024-05-15"
    });
  }
}

export const storage = new MemStorage();
