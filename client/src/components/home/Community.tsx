import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";

const Community = () => {
  return (
    <section className="py-16 bg-cream border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold text-gray-900">
            CONNECT WITH OUR <span className="text-primary">BEAUTIFUL COMMUNITY</span>
          </h2>
          <div className="heading-divider"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of event planners and vendors in our vibrant community
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-lg shadow-md p-8 md:p-12 flex flex-col md:flex-row items-center justify-between"
        >
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">
              Ready to plan your next celebration?
            </h3>
            <p className="text-gray-600">
              Connect with top vendors and venues in your area
            </p>
          </div>
          <Link href="/auth/register">
            <Button size="lg" className="cta-button">
              Register Now
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Community;
