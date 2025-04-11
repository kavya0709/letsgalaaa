import { useState, useEffect, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { User } from "@shared/schema";
import { mockApi } from "@/mockData";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
}

export default function useAuth() {
  const queryClient = useQueryClient();
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  });

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Check for stored user in local storage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setAuthState({
            user: JSON.parse(storedUser),
            isLoading: false,
            error: null,
          });
        } else {
          // For demo purposes, automatically load Kavya's profile as default
          const defaultUser = await mockApi.getUser(1); // Kavya's profile
          if (defaultUser) {
            localStorage.setItem("user", JSON.stringify(defaultUser));
            setAuthState({
              user: defaultUser,
              isLoading: false,
              error: null,
            });
          } else {
            setAuthState({
              user: null,
              isLoading: false,
              error: null,
            });
          }
        }
      } catch (error) {
        console.error("Auth status check error:", error);
        setAuthState({
          user: null,
          isLoading: false,
          error: error instanceof Error ? error : new Error("Unknown error"),
        });
      }
    };

    checkAuthStatus();
  }, []);

  // Login function
  const login = useCallback(async (username: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      
      // Use mock API for frontend-only implementation
      const user = await mockApi.login(username, password);
      
      // Store user in state and local storage
      localStorage.setItem("user", JSON.stringify(user));
      setAuthState({
        user,
        isLoading: false,
        error: null,
      });
      
      return user;
    } catch (error) {
      console.error("Login error:", error);
      setAuthState({
        user: null,
        isLoading: false,
        error: error instanceof Error ? error : new Error("Login failed"),
      });
      throw error;
    }
  }, []);

  // Logout function
  const logout = useCallback(() => {
    // Clear user from state and local storage
    localStorage.removeItem("user");
    setAuthState({
      user: null,
      isLoading: false,
      error: null,
    });
    
    // Clear all queries from the cache
    queryClient.clear();
  }, [queryClient]);

  // Update user function
  const updateUser = useCallback((userData: Partial<User>) => {
    if (!authState.user) return;
    
    const updatedUser = { ...authState.user, ...userData };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setAuthState(prev => ({
      ...prev,
      user: updatedUser,
    }));
  }, [authState.user]);

  return {
    user: authState.user,
    isLoading: authState.isLoading,
    error: authState.error,
    login,
    logout,
    updateUser,
  };
}
