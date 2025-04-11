import express, { type Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { 
  insertUserSchema, 
  insertVendorSchema, 
  insertEventRequestSchema, 
  insertReviewSchema,
  EVENT_TYPES,
  VENDOR_CATEGORIES
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  const router = express.Router();
  
  // Users API
  router.post("/users", async (req: Request, res: Response) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if username already exists
      const existingUsername = await storage.getUserByUsername(userData.username);
      if (existingUsername) {
        return res.status(400).json({ message: "Username already exists" });
      }
      
      // Check if email already exists
      const existingEmail = await storage.getUserByEmail(userData.email);
      if (existingEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }
      
      const newUser = await storage.createUser(userData);
      // Don't return the password in the response
      const { password, ...userWithoutPassword } = newUser;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create user" });
    }
  });
  
  router.get("/users/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const user = await storage.getUser(id);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Don't return the password in the response
      const { password, ...userWithoutPassword } = user;
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user" });
    }
  });
  
  router.patch("/users/:id", async (req: Request, res: Response) => {
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
      
      // Don't return the password in the response
      const { password, ...userWithoutPassword } = updatedUser;
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Failed to update user" });
    }
  });
  
  // Auth API
  router.post("/auth/login", async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
      
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
      
      // Don't return the password in the response
      const { password: userPassword, ...userWithoutPassword } = user;
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Login failed" });
    }
  });
  
  // Vendors API
  router.get("/vendors", async (req: Request, res: Response) => {
    try {
      const { category, city, search } = req.query;
      
      const filters: Partial<{category: string, city: string, search: string}> = {};
      if (category) filters.category = category as string;
      if (city) filters.city = city as string;
      if (search) filters.search = search as string;
      
      const vendors = await storage.getVendors(filters);
      res.status(200).json(vendors);
    } catch (error) {
      res.status(500).json({ message: "Failed to get vendors" });
    }
  });
  
  router.get("/vendors/featured", async (req: Request, res: Response) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 6;
      const featuredVendors = await storage.getFeaturedVendors(limit);
      res.status(200).json(featuredVendors);
    } catch (error) {
      res.status(500).json({ message: "Failed to get featured vendors" });
    }
  });
  
  router.get("/vendors/:id", async (req: Request, res: Response) => {
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
  
  router.post("/vendors", async (req: Request, res: Response) => {
    try {
      const vendorData = insertVendorSchema.parse(req.body);
      
      // Check if user exists
      const user = await storage.getUser(vendorData.userId);
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      
      // Check if user is already a vendor
      const existingVendor = await storage.getVendorByUserId(vendorData.userId);
      if (existingVendor) {
        return res.status(400).json({ message: "User is already a vendor" });
      }
      
      const newVendor = await storage.createVendor(vendorData);
      
      // Update user to be a vendor
      await storage.updateUser(user.id, { isVendor: true });
      
      res.status(201).json(newVendor);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid vendor data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create vendor" });
    }
  });
  
  router.patch("/vendors/:id", async (req: Request, res: Response) => {
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
  
  // Event Requests API
  router.get("/event-requests", async (req: Request, res: Response) => {
    try {
      const userId = req.query.userId ? parseInt(req.query.userId as string) : undefined;
      const vendorId = req.query.vendorId ? parseInt(req.query.vendorId as string) : undefined;
      
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
  
  router.get("/event-requests/:id", async (req: Request, res: Response) => {
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
  
  router.post("/event-requests", async (req: Request, res: Response) => {
    try {
      const requestData = insertEventRequestSchema.parse(req.body);
      
      // Check if user exists
      const user = await storage.getUser(requestData.userId);
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      
      // Check if vendor exists
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
  
  router.patch("/event-requests/:id", async (req: Request, res: Response) => {
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
  
  // Reviews API
  router.get("/reviews", async (req: Request, res: Response) => {
    try {
      const vendorId = req.query.vendorId ? parseInt(req.query.vendorId as string) : undefined;
      
      let reviews;
      if (vendorId) {
        reviews = await storage.getReviewsByVendorId(vendorId);
      } else {
        reviews = await storage.getReviews();
      }
      
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Failed to get reviews" });
    }
  });
  
  router.post("/reviews", async (req: Request, res: Response) => {
    try {
      const reviewData = insertReviewSchema.parse(req.body);
      
      // Check if user exists
      const user = await storage.getUser(reviewData.userId);
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      
      // Check if vendor exists
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
  
  // Categories and Event Types
  router.get("/categories", (_req: Request, res: Response) => {
    res.status(200).json(VENDOR_CATEGORIES);
  });
  
  router.get("/event-types", (_req: Request, res: Response) => {
    res.status(200).json(EVENT_TYPES);
  });
  
  // Register all routes with /api prefix
  app.use("/api", router);
  
  const httpServer = createServer(app);
  return httpServer;
}
