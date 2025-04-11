// server/index.ts
import express3 from "express";

// server/routes.ts
import express from "express";
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  vendors;
  eventRequests;
  reviews;
  userIdCounter;
  vendorIdCounter;
  eventRequestIdCounter;
  reviewIdCounter;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.vendors = /* @__PURE__ */ new Map();
    this.eventRequests = /* @__PURE__ */ new Map();
    this.reviews = /* @__PURE__ */ new Map();
    this.userIdCounter = 1;
    this.vendorIdCounter = 1;
    this.eventRequestIdCounter = 1;
    this.reviewIdCounter = 1;
    this.initSampleData();
  }
  // User methods
  async getUsers() {
    return Array.from(this.users.values());
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    );
  }
  async getUserByEmail(email) {
    return Array.from(this.users.values()).find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );
  }
  async createUser(insertUser) {
    const id = this.userIdCounter++;
    const createdAt = /* @__PURE__ */ new Date();
    const user = { ...insertUser, id, createdAt };
    this.users.set(id, user);
    return user;
  }
  async updateUser(id, userData) {
    const user = this.users.get(id);
    if (!user) return void 0;
    const updatedUser = { ...user, ...userData };
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  // Vendor methods
  async getVendors(filters) {
    let vendors2 = Array.from(this.vendors.values());
    if (filters) {
      if (filters.category) {
        vendors2 = vendors2.filter(
          (vendor) => vendor.category.toLowerCase() === filters.category?.toLowerCase()
        );
      }
      if (filters.city) {
        vendors2 = vendors2.filter(
          (vendor) => vendor.city.toLowerCase() === filters.city?.toLowerCase()
        );
      }
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        vendors2 = vendors2.filter(
          (vendor) => vendor.businessName.toLowerCase().includes(searchTerm) || vendor.description.toLowerCase().includes(searchTerm) || vendor.city.toLowerCase().includes(searchTerm) || vendor.state.toLowerCase().includes(searchTerm)
        );
      }
    }
    return vendors2;
  }
  async getVendor(id) {
    return this.vendors.get(id);
  }
  async getVendorByUserId(userId) {
    return Array.from(this.vendors.values()).find(
      (vendor) => vendor.userId === userId
    );
  }
  async createVendor(insertVendor) {
    const id = this.vendorIdCounter++;
    const createdAt = /* @__PURE__ */ new Date();
    const vendor = {
      ...insertVendor,
      id,
      createdAt,
      rating: 0,
      reviewCount: 0
    };
    this.vendors.set(id, vendor);
    return vendor;
  }
  async updateVendor(id, vendorData) {
    const vendor = this.vendors.get(id);
    if (!vendor) return void 0;
    const updatedVendor = { ...vendor, ...vendorData };
    this.vendors.set(id, updatedVendor);
    return updatedVendor;
  }
  async getFeaturedVendors(limit = 6) {
    const vendors2 = Array.from(this.vendors.values()).sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, limit);
    return vendors2;
  }
  // Event Request methods
  async getEventRequests() {
    return Array.from(this.eventRequests.values());
  }
  async getEventRequest(id) {
    return this.eventRequests.get(id);
  }
  async getEventRequestsByUserId(userId) {
    return Array.from(this.eventRequests.values()).filter(
      (request) => request.userId === userId
    );
  }
  async getEventRequestsByVendorId(vendorId) {
    return Array.from(this.eventRequests.values()).filter(
      (request) => request.vendorId === vendorId
    );
  }
  async createEventRequest(insertRequest) {
    const id = this.eventRequestIdCounter++;
    const createdAt = /* @__PURE__ */ new Date();
    const request = {
      ...insertRequest,
      id,
      createdAt,
      status: "pending"
    };
    this.eventRequests.set(id, request);
    return request;
  }
  async updateEventRequest(id, requestData) {
    const request = this.eventRequests.get(id);
    if (!request) return void 0;
    const updatedRequest = { ...request, ...requestData };
    this.eventRequests.set(id, updatedRequest);
    return updatedRequest;
  }
  // Review methods
  async getReviews() {
    return Array.from(this.reviews.values());
  }
  async getReview(id) {
    return this.reviews.get(id);
  }
  async getReviewsByVendorId(vendorId) {
    return Array.from(this.reviews.values()).filter(
      (review) => review.vendorId === vendorId
    );
  }
  async createReview(insertReview) {
    const id = this.reviewIdCounter++;
    const createdAt = /* @__PURE__ */ new Date();
    const review = { ...insertReview, id, createdAt };
    this.reviews.set(id, review);
    const vendor = this.vendors.get(insertReview.vendorId);
    if (vendor) {
      const vendorReviews = await this.getReviewsByVendorId(vendor.id);
      const totalRating = vendorReviews.reduce((sum, review2) => sum + review2.rating, 0) + insertReview.rating;
      const avgRating = Math.round(totalRating / (vendorReviews.length + 1) * 10) / 10;
      this.vendors.set(vendor.id, {
        ...vendor,
        rating: avgRating,
        reviewCount: vendorReviews.length + 1
      });
    }
    return review;
  }
  // Initialize with sample data
  initSampleData() {
    const user1 = this.createUser({
      username: "client1",
      password: "password123",
      email: "client1@example.com",
      fullName: "John Doe",
      phone: "555-123-4567",
      isVendor: false
    });
    const user2 = this.createUser({
      username: "vendor1",
      password: "password123",
      email: "vendor1@example.com",
      fullName: "Jane Smith",
      phone: "555-987-6543",
      isVendor: true
    });
    const user3 = this.createUser({
      username: "vendor2",
      password: "password123",
      email: "vendor2@example.com",
      fullName: "Robert Johnson",
      phone: "555-567-8910",
      isVendor: true
    });
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
      featuredEvent: "Wedding"
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
      featuredEvent: "Birthday"
    });
    this.createVendor({
      userId: 3,
      // Reusing existing user for demo
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
      featuredEvent: "Corporate Event"
    });
    this.createEventRequest({
      userId: 1,
      vendorId: 1,
      eventType: "Wedding",
      eventDate: "2024-12-15",
      guestCount: 100,
      startTime: "17:00",
      duration: 5,
      budget: 1e4,
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
      budget: 5e3,
      additionalDetails: "30th birthday celebration with an elegant theme."
    });
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
};
var storage = new MemStorage();

// server/routes.ts
import { z } from "zod";

// shared/schema.ts
import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  fullName: text("full_name"),
  phone: text("phone"),
  profileImage: text("profile_image"),
  isVendor: boolean("is_vendor").default(false),
  createdAt: timestamp("created_at").defaultNow()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  fullName: true,
  phone: true,
  profileImage: true,
  isVendor: true
});
var vendors = pgTable("vendors", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  businessName: text("business_name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  website: text("website"),
  address: text("address"),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zipCode: text("zip_code"),
  profileImage: text("profile_image"),
  coverImage: text("cover_image"),
  gallery: json("gallery").$type(),
  services: json("services").$type(),
  featuredEvent: json("featured_event").$type(),
  rating: integer("rating"),
  reviewCount: integer("review_count"),
  createdAt: timestamp("created_at").defaultNow()
});
var insertVendorSchema = createInsertSchema(vendors).pick({
  userId: true,
  businessName: true,
  description: true,
  category: true,
  phone: true,
  email: true,
  website: true,
  address: true,
  city: true,
  state: true,
  zipCode: true,
  profileImage: true,
  coverImage: true,
  gallery: true,
  services: true,
  featuredEvent: true
});
var eventRequests = pgTable("event_requests", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  vendorId: integer("vendor_id").notNull(),
  eventType: text("event_type").notNull(),
  eventDate: text("event_date").notNull(),
  guestCount: integer("guest_count").notNull(),
  startTime: text("start_time").notNull(),
  duration: integer("duration").notNull(),
  budget: integer("budget"),
  additionalDetails: text("additional_details"),
  status: text("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow()
});
var insertEventRequestSchema = createInsertSchema(eventRequests).pick({
  userId: true,
  vendorId: true,
  eventType: true,
  eventDate: true,
  guestCount: true,
  startTime: true,
  duration: true,
  budget: true,
  additionalDetails: true
});
var reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  vendorId: integer("vendor_id").notNull(),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  eventType: text("event_type"),
  eventDate: text("event_date"),
  createdAt: timestamp("created_at").defaultNow()
});
var insertReviewSchema = createInsertSchema(reviews).pick({
  userId: true,
  vendorId: true,
  rating: true,
  comment: true,
  eventType: true,
  eventDate: true
});
var EVENT_TYPES = [
  "Wedding",
  "Birthday",
  "Corporate Event",
  "Anniversary",
  "Baby Shower",
  "Graduation",
  "Holiday Party",
  "Other"
];
var VENDOR_CATEGORIES = [
  "Venue",
  "Catering",
  "Photography",
  "Decoration",
  "Music & Entertainment",
  "Event Planning",
  "Transportation",
  "Florist"
];

// server/routes.ts
async function registerRoutes(app2) {
  const router = express.Router();
  router.post("/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const existingUsername = await storage.getUserByUsername(userData.username);
      if (existingUsername) {
        return res.status(400).json({ message: "Username already exists" });
      }
      const existingEmail = await storage.getUserByEmail(userData.email);
      if (existingEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }
      const newUser = await storage.createUser(userData);
      const { password, ...userWithoutPassword } = newUser;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create user" });
    }
  });
  router.get("/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const { password, ...userWithoutPassword } = user;
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user" });
    }
  });
  router.patch("/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const updatedUser = await storage.updateUser(id, req.body);
      if (!updatedUser) {
        return res.status(404).json({ message: "Failed to update user" });
      }
      const { password, ...userWithoutPassword } = updatedUser;
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Failed to update user" });
    }
  });
  router.post("/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
      const user = await storage.getUserByUsername(username);
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
      const { password: userPassword, ...userWithoutPassword } = user;
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Login failed" });
    }
  });
  router.get("/vendors", async (req, res) => {
    try {
      const { category, city, search } = req.query;
      const filters = {};
      if (category) filters.category = category;
      if (city) filters.city = city;
      if (search) filters.search = search;
      const vendors2 = await storage.getVendors(filters);
      res.status(200).json(vendors2);
    } catch (error) {
      res.status(500).json({ message: "Failed to get vendors" });
    }
  });
  router.get("/vendors/featured", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit) : 6;
      const featuredVendors = await storage.getFeaturedVendors(limit);
      res.status(200).json(featuredVendors);
    } catch (error) {
      res.status(500).json({ message: "Failed to get featured vendors" });
    }
  });
  router.get("/vendors/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const vendor = await storage.getVendor(id);
      if (!vendor) {
        return res.status(404).json({ message: "Vendor not found" });
      }
      res.status(200).json(vendor);
    } catch (error) {
      res.status(500).json({ message: "Failed to get vendor" });
    }
  });
  router.post("/vendors", async (req, res) => {
    try {
      const vendorData = insertVendorSchema.parse(req.body);
      const user = await storage.getUser(vendorData.userId);
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      const existingVendor = await storage.getVendorByUserId(vendorData.userId);
      if (existingVendor) {
        return res.status(400).json({ message: "User is already a vendor" });
      }
      const newVendor = await storage.createVendor(vendorData);
      await storage.updateUser(user.id, { isVendor: true });
      res.status(201).json(newVendor);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid vendor data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create vendor" });
    }
  });
  router.patch("/vendors/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const vendor = await storage.getVendor(id);
      if (!vendor) {
        return res.status(404).json({ message: "Vendor not found" });
      }
      const updatedVendor = await storage.updateVendor(id, req.body);
      if (!updatedVendor) {
        return res.status(404).json({ message: "Failed to update vendor" });
      }
      res.status(200).json(updatedVendor);
    } catch (error) {
      res.status(500).json({ message: "Failed to update vendor" });
    }
  });
  router.get("/event-requests", async (req, res) => {
    try {
      const userId = req.query.userId ? parseInt(req.query.userId) : void 0;
      const vendorId = req.query.vendorId ? parseInt(req.query.vendorId) : void 0;
      let requests;
      if (userId) {
        requests = await storage.getEventRequestsByUserId(userId);
      } else if (vendorId) {
        requests = await storage.getEventRequestsByVendorId(vendorId);
      } else {
        requests = await storage.getEventRequests();
      }
      res.status(200).json(requests);
    } catch (error) {
      res.status(500).json({ message: "Failed to get event requests" });
    }
  });
  router.get("/event-requests/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const request = await storage.getEventRequest(id);
      if (!request) {
        return res.status(404).json({ message: "Event request not found" });
      }
      res.status(200).json(request);
    } catch (error) {
      res.status(500).json({ message: "Failed to get event request" });
    }
  });
  router.post("/event-requests", async (req, res) => {
    try {
      const requestData = insertEventRequestSchema.parse(req.body);
      const user = await storage.getUser(requestData.userId);
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      const vendor = await storage.getVendor(requestData.vendorId);
      if (!vendor) {
        return res.status(400).json({ message: "Vendor not found" });
      }
      const newRequest = await storage.createEventRequest(requestData);
      res.status(201).json(newRequest);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid event request data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create event request" });
    }
  });
  router.patch("/event-requests/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const request = await storage.getEventRequest(id);
      if (!request) {
        return res.status(404).json({ message: "Event request not found" });
      }
      const updatedRequest = await storage.updateEventRequest(id, req.body);
      if (!updatedRequest) {
        return res.status(404).json({ message: "Failed to update event request" });
      }
      res.status(200).json(updatedRequest);
    } catch (error) {
      res.status(500).json({ message: "Failed to update event request" });
    }
  });
  router.get("/reviews", async (req, res) => {
    try {
      const vendorId = req.query.vendorId ? parseInt(req.query.vendorId) : void 0;
      let reviews2;
      if (vendorId) {
        reviews2 = await storage.getReviewsByVendorId(vendorId);
      } else {
        reviews2 = await storage.getReviews();
      }
      res.status(200).json(reviews2);
    } catch (error) {
      res.status(500).json({ message: "Failed to get reviews" });
    }
  });
  router.post("/reviews", async (req, res) => {
    try {
      const reviewData = insertReviewSchema.parse(req.body);
      const user = await storage.getUser(reviewData.userId);
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      const vendor = await storage.getVendor(reviewData.vendorId);
      if (!vendor) {
        return res.status(400).json({ message: "Vendor not found" });
      }
      const newReview = await storage.createReview(reviewData);
      res.status(201).json(newReview);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid review data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create review" });
    }
  });
  router.get("/categories", (_req, res) => {
    res.status(200).json(VENDOR_CATEGORIES);
  });
  router.get("/event-types", (_req, res) => {
    res.status(200).json(EVENT_TYPES);
  });
  app2.use("/api", router);
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express2 from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express2.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express3();
app.use(express3.json());
app.use(express3.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
