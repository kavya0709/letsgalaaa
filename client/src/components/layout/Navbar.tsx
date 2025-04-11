import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import useAuth from "@/hooks/use-auth";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Heart, Search, User } from "lucide-react";

const Navbar = () => {
  const [location] = useLocation();
  const { toast } = useToast();
  const { user, logout } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <img 
                className="h-8 w-auto" 
                src="https://img.icons8.com/color/96/null/party-baloons.png" 
                alt="Let's Gala Logo" 
              />
              <span className="ml-2 text-2xl font-display font-bold text-gray-900">
                Let's<span className="text-primary">Gala</span>
              </span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <NavLink href="/" active={location === "/"}>Home</NavLink>
              <NavLink href="/vendors" active={location === "/vendors"}>All Vendors</NavLink>
              <NavLink href="/#categories" active={false}>Categories</NavLink>
              <NavLink href="/#how-it-works" active={false}>How It Works</NavLink>
              <NavLink href="/#contact" active={false}>Contact Us</NavLink>
            </div>
          </div>
          <div className="flex items-center">
            <div className="hidden md:ml-4 md:flex md:items-center">
              <button 
                className="bg-white p-1 rounded-full text-gray-400 hover:text-primary focus:outline-none"
                aria-label="Favorites"
              >
                <Heart className="h-6 w-6" />
              </button>
              <button 
                className="ml-3 bg-white p-1 rounded-full text-gray-400 hover:text-primary focus:outline-none"
                aria-label="Search"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="h-6 w-6" />
              </button>
              
              {user ? (
                <div className="ml-4 relative flex items-center space-x-4">
                  <Link href="/clients">
                    <Button variant="ghost" className="text-gray-600 hover:text-primary">My Requests</Button>
                  </Link>
                  <Link href="/profile">
                    <Button variant="ghost" className="text-gray-600 hover:text-primary">
                      <User className="h-5 w-5 mr-1" /> Profile
                    </Button>
                  </Link>
                  <Button onClick={handleLogout} variant="destructive">
                    Logout
                  </Button>
                </div>
              ) : (
                <Link href="/auth/login" className="ml-8">
                  <Button className="bg-[#FF9800] hover:bg-[#E68A00]">
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
            
            {/* Mobile menu */}
            <div className="flex items-center md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="mr-2">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <div className="flex flex-col space-y-4 mt-8">
                    <Link href="/" className="text-xl font-medium px-2 py-2 rounded-md hover:bg-gray-100">
                      Home
                    </Link>
                    <Link href="/vendors" className="text-xl font-medium px-2 py-2 rounded-md hover:bg-gray-100">
                      All Vendors
                    </Link>
                    <Link href="/#categories" className="text-xl font-medium px-2 py-2 rounded-md hover:bg-gray-100">
                      Categories
                    </Link>
                    <Link href="/#how-it-works" className="text-xl font-medium px-2 py-2 rounded-md hover:bg-gray-100">
                      How It Works
                    </Link>
                    <Link href="/#contact" className="text-xl font-medium px-2 py-2 rounded-md hover:bg-gray-100">
                      Contact Us
                    </Link>
                    
                    <div className="pt-4 border-t border-gray-200">
                      {user ? (
                        <>
                          <Link href="/clients" className="block px-2 py-2 text-xl font-medium rounded-md hover:bg-gray-100">
                            My Requests
                          </Link>
                          <Link href="/profile" className="block px-2 py-2 text-xl font-medium rounded-md hover:bg-gray-100">
                            <span className="flex items-center">
                              <User className="h-5 w-5 mr-2" /> My Profile
                            </span>
                          </Link>
                          <button 
                            onClick={handleLogout}
                            className="mt-2 w-full text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md"
                          >
                            Logout
                          </button>
                        </>
                      ) : (
                        <Link href="/auth/login" className="block w-full">
                          <Button className="w-full bg-[#FF9800] hover:bg-[#E68A00]">
                            Sign In
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
      
      {/* Search overlay */}
      {isSearchOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-md p-4 animate-in fade-in">
          <div className="max-w-7xl mx-auto">
            <div className="relative">
              <input 
                type="text"
                placeholder="Search for vendors, venues, or services..."
                className="w-full py-2 pl-10 pr-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <button 
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                onClick={() => setIsSearchOpen(false)}
              >
                &times;
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

interface NavLinkProps {
  href: string;
  active: boolean;
  children: React.ReactNode;
}

const NavLink = ({ href, active, children }: NavLinkProps) => {
  return (
    <Link href={href} className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
      active 
        ? "border-primary text-gray-900" 
        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
    }`}>
      {children}
    </Link>
  );
};

export default Navbar;
