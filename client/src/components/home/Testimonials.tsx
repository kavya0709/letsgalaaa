import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface Testimonial {
  id: number;
  content: string;
  author: string;
  eventType: string;
  eventDate: string;
  image: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    content: "Let'sGala made planning our wedding so much easier. We found the perfect venue and amazing vendors all in one place!",
    author: "Sarah J.",
    eventType: "Wedding",
    eventDate: "June 2023",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    rating: 5
  },
  {
    id: 2,
    content: "The corporate event we planned through Let'sGala was a huge success. The platform made finding vendors who understood our brand simple.",
    author: "Michael T.",
    eventType: "Corporate Event",
    eventDate: "April 2023",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5
  },
  {
    id: 3,
    content: "My daughter's sweet sixteen was perfect thanks to the amazing decorator we found through Let'sGala. The process was seamless!",
    author: "Jennifer W.",
    eventType: "Birthday Party",
    eventDate: "May 2023",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 4.5
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold text-gray-900">
            CLIENT <span className="text-primary">TESTIMONIALS</span>
          </h2>
          <div className="heading-divider"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from our satisfied clients about their experience with Let'sGala
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
        >
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex mb-4">
        {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
          <Star key={i} className="h-5 w-5 text-primary" fill="currentColor" />
        ))}
        {testimonial.rating % 1 > 0 && (
          <Star className="h-5 w-5 text-primary" fill="currentColor" strokeWidth={0} strokeDasharray="64" strokeDashoffset="32" />
        )}
      </div>
      <p className="text-gray-600 italic mb-4 font-light">"{testimonial.content}"</p>
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
          <img 
            src={testimonial.image} 
            className="w-full h-full object-cover" 
            alt={testimonial.author} 
          />
        </div>
        <div>
          <h4 className="font-bold text-gray-900">{testimonial.author}</h4>
          <p className="text-sm text-gray-500">{testimonial.eventType}, {testimonial.eventDate}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Testimonials;
