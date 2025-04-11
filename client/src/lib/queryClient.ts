import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { mockApi } from "../mockData";

// Mock API request function for frontend-only development
export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  // Simulate network delay for a more realistic experience
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Create a response using the mock data
  const mockResponse = await handleMockRequest(method, url, data);
  
  return new Response(JSON.stringify(mockResponse), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

// Function to handle mock API requests
async function handleMockRequest(method: string, url: string, data?: unknown): Promise<any> {
  const urlPath = url.startsWith('/') ? url : `/${url}`;
  const urlObj = new URL(urlPath, window.location.origin);
  const path = urlObj.pathname;
  
  console.log(`Mock API request: ${method} ${path}`);
  
  // Handle user-related endpoints
  if (path === "/api/users" && method === "POST") {
    return mockApi.register(data as any);
  }
  
  if (path.startsWith("/api/users/") && method === "GET") {
    const userId = parseInt(path.split("/").pop() || "0");
    return mockApi.getUser(userId);
  }
  
  if (path === "/api/auth/login" && method === "POST") {
    try {
      const { username, password } = data as any;
      return await mockApi.login(username, password);
    } catch (error) {
      throw new Error("Invalid username or password");
    }
  }
  
  // Handle vendor-related endpoints
  if (path === "/api/vendors" && method === "GET") {
    const category = urlObj.searchParams.get("category") || "all";
    const city = urlObj.searchParams.get("city") || "all";
    const search = urlObj.searchParams.get("search") || "";
    return mockApi.getVendors({ category, city, search });
  }
  
  if (path === "/api/vendors/featured" && method === "GET") {
    return mockApi.getFeaturedVendors();
  }
  
  if (path.startsWith("/api/vendors/") && method === "GET") {
    const vendorId = parseInt(path.split("/").pop() || "0");
    return mockApi.getVendor(vendorId);
  }
  
  // Handle event request endpoints
  if (path === "/api/event-requests" && method === "GET") {
    const userId = urlObj.searchParams.get("userId");
    const vendorId = urlObj.searchParams.get("vendorId");
    
    if (userId) {
      return mockApi.getEventRequestsByUserId(parseInt(userId));
    } else if (vendorId) {
      return mockApi.getEventRequestsByVendorId(parseInt(vendorId));
    } else {
      return mockApi.getEventRequests();
    }
  }
  
  if (path === "/api/event-requests" && method === "POST") {
    return mockApi.createEventRequest(data as any);
  }
  
  if (path.startsWith("/api/event-requests/") && method === "GET") {
    const requestId = parseInt(path.split("/").pop() || "0");
    return mockApi.getEventRequest(requestId);
  }
  
  // Handle review endpoints
  if (path === "/api/reviews" && method === "GET") {
    const vendorId = urlObj.searchParams.get("vendorId");
    
    if (vendorId) {
      return mockApi.getReviewsByVendorId(parseInt(vendorId));
    } else {
      return mockApi.getReviews();
    }
  }
  
  if (path === "/api/reviews" && method === "POST") {
    return mockApi.createReview(data as any);
  }
  
  // Fallback for unhandled endpoints
  console.warn(`Unhandled mock API endpoint: ${path} (${method})`);
  return [];
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn = <T>(options: {
  on401: UnauthorizedBehavior;
}): QueryFunction<T | null> => async ({ queryKey }) => {
  try {
    // Use our mock implementation to handle API requests
    const url = queryKey[0] as string;
    const mockResponse = await handleMockRequest("GET", url);
    return mockResponse as T;
  } catch (err) {
    if ((err as Error).message === "Invalid username or password" && options.on401 === "returnNull") {
      return null;
    }
    throw err;
  }
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
