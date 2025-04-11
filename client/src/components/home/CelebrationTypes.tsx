import { motion } from "framer-motion";
import { Link } from "wouter";

interface CelebrationType {
  id: number;
  title: string;
  subtitle: string;
  image: string;
}

const celebrationTypes: CelebrationType[] = [
  {
    id: 1,
    title: "Weddings",
    subtitle: "Make your special day perfect",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Birthdays",
    subtitle: "Celebrate another year in style",
    image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Corporate",
    subtitle: "Professional events for business",
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Social Gatherings",
    subtitle: "Memorable get-togethers",
    image: "https://images.unsplash.com/photo-1507504031003-b417219a0fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const CelebrationTypes = () => {
  return (
    <section className="py-16 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold text-gray-900">
            TYPES OF <span className="text-primary">CELEBRATION</span>
          </h2>
          <div className="heading-divider"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We offer specialized planning for a variety of events to make your celebration unforgettable
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
        >
          {celebrationTypes.map((type) => (
            <CelebrationCard key={type.id} type={type} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

interface CelebrationCardProps {
  type: CelebrationType;
}

const CelebrationCard = ({ type }: CelebrationCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.4 }}
    >
      <Link href={`/vendors?eventType=${encodeURIComponent(type.title)}`}>
        <div className="group relative h-64 rounded-lg overflow-hidden shadow-md cursor-pointer">
          <img 
            src={type.image} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
            alt={type.title}
          />
          <div className="gradient-overlay"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-xl font-display font-bold text-white">{type.title}</h3>
            <p className="text-gray-200 text-sm mt-1">{type.subtitle}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CelebrationTypes;
