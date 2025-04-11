import { Link } from "wouter";
import { motion } from "framer-motion";

interface Category {
  id: number;
  title: string;
  description: string;
  image: string;
}

const categories: Category[] = [
  {
    id: 1,
    title: "Wedding Venues",
    description: "Find the perfect setting for your special day",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Birthday Parties",
    description: "Create unforgettable birthday celebrations",
    image: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Corporate Events",
    description: "Professional planning for business functions",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const EventCategories = () => {
  return (
    <section className="py-16 bg-cream" id="categories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold text-gray-900">
            EXPLORE OUR <span className="text-primary">BEST BOOKING EVENT</span>
          </h2>
          <div className="heading-divider"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most popular services and event types that have delighted our clients
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
        >
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={category.image} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
          alt={category.title} 
        />
      </div>
      <div className="p-6 text-center">
        <h3 className="text-xl font-display font-bold mb-2">{category.title}</h3>
        <p className="text-gray-600 mb-4">{category.description}</p>
        <Link 
          href={`/vendors?category=${encodeURIComponent(category.title)}`}
          className="text-primary hover:text-amber-600 font-medium flex items-center justify-center"
        >
          Explore <i className="ml-2">→</i>
        </Link>
      </div>
    </motion.div>
  );
};

export default EventCategories;
