import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion } from "framer-motion";

interface VendorGalleryProps {
  images: string[];
}

const VendorGallery = ({ images }: VendorGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState(false);
  
  if (!images || images.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No gallery images available
      </div>
    );
  }
  
  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((activeIndex + 1) % images.length);
  };
  
  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((activeIndex - 1 + images.length) % images.length);
  };
  
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <Dialog key={index} open={open && activeIndex === index} onOpenChange={(o) => {
            setOpen(o);
            if (o) setActiveIndex(index);
          }}>
            <DialogTrigger asChild>
              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="aspect-square rounded-lg overflow-hidden cursor-pointer"
              >
                <img 
                  src={image} 
                  alt={`Gallery image ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </DialogTrigger>
            <DialogContent className="max-w-4xl bg-black/90 border-none p-0">
              <div className="relative w-full h-full">
                <button 
                  className="absolute top-4 right-4 text-white bg-black/50 p-1 rounded-full z-10"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-6 w-6" />
                </button>
                <div className="flex items-center justify-center h-[80vh]">
                  <button 
                    className="absolute left-4 text-white bg-black/50 p-2 rounded-full z-10"
                    onClick={handlePrev}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <img 
                    src={images[activeIndex]} 
                    alt={`Gallery image ${activeIndex + 1}`} 
                    className="max-h-full max-w-full object-contain"
                  />
                  <button 
                    className="absolute right-4 text-white bg-black/50 p-2 rounded-full z-10"
                    onClick={handleNext}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-0 right-0 text-center text-white">
                  {activeIndex + 1} of {images.length}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};

export default VendorGallery;
