import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Vendor } from "@shared/schema";
import VendorCard from "./VendorCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

interface VendorGridProps {
  initialCategory?: string;
  initialCity?: string;
  initialSearch?: string;
}

const VendorGrid = ({ initialCategory, initialCity, initialSearch }: VendorGridProps) => {
  const [category, setCategory] = useState(initialCategory || "all");
  const [city, setCity] = useState(initialCity || "all");
  const [search, setSearch] = useState(initialSearch || "");
  const [searchInput, setSearchInput] = useState(initialSearch || "");
  
  // Convert "all" to empty string for API calls
  const categoryParam = category === "all" ? "" : category;
  const cityParam = city === "all" ? "" : city;
  
  const { data: vendors, isLoading, error } = useQuery<Vendor[]>({
    queryKey: ["/api/vendors", { category: categoryParam, city: cityParam, search }],
  });
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
  };
  
  const clearFilters = () => {
    setCategory("all");
    setCity("all");
    setSearch("");
    setSearchInput("");
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Input
              type="text"
              placeholder="Search vendors..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          </div>
          
          <div className="md:w-64">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Venue">Venue</SelectItem>
                <SelectItem value="Catering">Catering</SelectItem>
                <SelectItem value="Photography">Photography</SelectItem>
                <SelectItem value="Decoration">Decoration</SelectItem>
                <SelectItem value="Music & Entertainment">Music & Entertainment</SelectItem>
                <SelectItem value="Event Planning">Event Planning</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="md:w-64">
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger>
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="San Francisco">San Francisco</SelectItem>
                <SelectItem value="Los Angeles">Los Angeles</SelectItem>
                <SelectItem value="New York">New York</SelectItem>
                <SelectItem value="Chicago">Chicago</SelectItem>
                <SelectItem value="Miami">Miami</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex gap-2">
            <Button type="submit" className="cta-button">
              <Filter className="h-4 w-4 mr-2" /> Filter
            </Button>
            {(category !== "all" || city !== "all" || search) && (
              <Button variant="outline" onClick={clearFilters}>
                Clear
              </Button>
            )}
          </div>
        </form>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-[400px]">
              <Skeleton className="h-56 w-full" />
              <div className="mt-4 space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <div className="flex justify-between">
                  <Skeleton className="h-8 w-1/4" />
                  <Skeleton className="h-10 w-1/3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-10">
          <p className="text-red-500">Failed to load vendors. Please try again later.</p>
        </div>
      ) : vendors?.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-md">
          <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">No vendors found</h3>
          <p className="text-gray-600">
            We couldn't find any vendors matching your criteria. Try adjusting your filters.
          </p>
          <Button onClick={clearFilters} className="mt-4">
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vendors?.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      )}
    </div>
  );
};

export default VendorGrid;
