import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  fullName: text("full_name"),
  phone: text("phone"),
  profileImage: text("profile_image"),
  isVendor: boolean("is_vendor").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  fullName: true,
  phone: true,
  profileImage: true,
  isVendor: true,
});

// Vendor model
export const vendors = pgTable("vendors", {
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
  gallery: json("gallery").$type<string[]>(),
  services: json("services").$type<string[]>(),
  featuredEvent: json("featured_event").$type<string>(),
  rating: integer("rating"),
  reviewCount: integer("review_count"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertVendorSchema = createInsertSchema(vendors).pick({
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
  featuredEvent: true,
});

// Event Request model
export const eventRequests = pgTable("event_requests", {
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
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertEventRequestSchema = createInsertSchema(eventRequests).pick({
  userId: true,
  vendorId: true,
  eventType: true,
  eventDate: true,
  guestCount: true,
  startTime: true,
  duration: true,
  budget: true,
  additionalDetails: true,
});

// Reviews model
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  vendorId: integer("vendor_id").notNull(),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  eventType: text("event_type"),
  eventDate: text("event_date"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertReviewSchema = createInsertSchema(reviews).pick({
  userId: true,
  vendorId: true,
  rating: true,
  comment: true,
  eventType: true,
  eventDate: true,
});

// Type definitions
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Vendor = typeof vendors.$inferSelect;
export type InsertVendor = z.infer<typeof insertVendorSchema>;

export type EventRequest = typeof eventRequests.$inferSelect;
export type InsertEventRequest = z.infer<typeof insertEventRequestSchema>;

export type Review = typeof reviews.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;

// Enums
export const EVENT_TYPES = [
  "Wedding",
  "Birthday",
  "Corporate Event",
  "Anniversary",
  "Baby Shower",
  "Graduation",
  "Holiday Party",
  "Other"
] as const;

export const VENDOR_CATEGORIES = [
  "Venue",
  "Catering",
  "Photography",
  "Decoration",
  "Music & Entertainment",
  "Event Planning",
  "Transportation",
  "Florist"
] as const;
