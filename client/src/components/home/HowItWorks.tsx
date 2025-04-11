import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface Step {
  id: number;
  number: number;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    id: 1,
    number: 1,
    title: "Search",
    description: "Browse our vast selection of venues and vendors"
  },
  {
    id: 2,
    number: 2,
    title: "Compare",
    description: "Review options, prices, and availability"
  },
  {
    id: 3,
    number: 3,
    title: "Book",
    description: "Secure your date with our trusted vendors"
  },
  {
    id: 4,
    number: 4,
    title: "Celebrate",
    description: "Enjoy your perfectly planned event"
  }
];

const HowItWorks = () => {
  return (
    <section className="section-dark py-16 text-white" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold">
            HOW IT <span className="text-primary">WORKS</span>
          </h2>
          <div className="heading-divider"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Planning your event is easy with our simple 4-step process
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
        >
          {steps.map((step) => (
            <ProcessStep key={step.id} step={step} />
          ))}
        </motion.div>
        
        <div className="mt-12 text-center">
          <Link href="/vendors">
            <Button 
              size="lg" 
              className="cta-button text-lg shadow-lg"
            >
              Start Planning
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

interface ProcessStepProps {
  step: Step;
}

const ProcessStep = ({ step }: ProcessStepProps) => {
  return (
    <motion.div 
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: step.id * 0.1 }}
    >
      <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mx-auto mb-4 text-black text-2xl font-bold">
        {step.number}
      </div>
      <h3 className="text-xl font-display font-bold mb-3">{step.title}</h3>
      <p className="text-gray-400">{step.description}</p>
    </motion.div>
  );
};

export default HowItWorks;
