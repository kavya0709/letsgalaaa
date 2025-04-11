import Hero from "@/components/home/Hero";
import EventCategories from "@/components/home/EventCategories";
import FeaturedVendors from "@/components/home/FeaturedVendors";
import CelebrationTypes from "@/components/home/CelebrationTypes";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import Community from "@/components/home/Community";
import { Helmet } from "react-helmet";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Let'sGala - Plan Your Perfect Event</title>
        <meta name="description" content="Find the best vendors, venues, and services for your special occasion with Let'sGala." />
      </Helmet>
      
      <Hero />
      <EventCategories />
      <FeaturedVendors />
      <CelebrationTypes />
      <HowItWorks />
      <Testimonials />
      <Community />
    </>
  );
};

export default HomePage;
