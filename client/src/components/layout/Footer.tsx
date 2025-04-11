import { Link } from "wouter";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="section-dark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center mb-6">
              <img 
                className="h-8 w-auto" 
                src="https://img.icons8.com/color/96/null/party-baloons.png" 
                alt="Let's Gala Logo" 
              />
              <span className="ml-2 text-2xl font-display font-bold">
                Let's<span className="text-primary">Gala</span>
              </span>
            </div>
            <p className="text-gray-400 mb-6">
              Your premier platform for finding and booking the best event services and venues.
            </p>
            <div className="flex space-x-4">
              <SocialLink icon={<Facebook size={18} />} href="#" />
              <SocialLink icon={<Instagram size={18} />} href="#" />
              <SocialLink icon={<Twitter size={18} />} href="#" />
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-display font-bold mb-6">For Clients</h4>
            <ul className="space-y-3">
              <FooterLink href="/#how-it-works">How It Works</FooterLink>
              <FooterLink href="/vendors">Browse Vendors</FooterLink>
              <FooterLink href="/#categories">Event Categories</FooterLink>
              <FooterLink href="#">Planning Guides</FooterLink>
              <FooterLink href="#">Client Reviews</FooterLink>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-display font-bold mb-6">For Vendors</h4>
            <ul className="space-y-3">
              <FooterLink href="#">Join as Vendor</FooterLink>
              <FooterLink href="#">Vendor Dashboard</FooterLink>
              <FooterLink href="#">Marketing Tools</FooterLink>
              <FooterLink href="#">Success Stories</FooterLink>
              <FooterLink href="#">Vendor Support</FooterLink>
            </ul>
          </div>
          
          <div id="contact">
            <h4 className="text-lg font-display font-bold mb-6">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mt-1 mr-3 text-primary" size={18} />
                <span className="text-gray-400">
                  123 Event St, Suite 100<br />San Francisco, CA 94107
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 text-primary" size={18} />
                <a href="tel:5551234567" className="text-gray-400 hover:text-primary">
                  (555) 123-4567
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 text-primary" size={18} />
                <a href="mailto:info@letsgala.com" className="text-gray-400 hover:text-primary">
                  info@letsgala.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Let'sGala. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-primary text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-primary text-sm">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-primary text-sm">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterLink = ({ href, children }: FooterLinkProps) => {
  return (
    <li>
      <Link 
        href={href}
        className="text-gray-400 hover:text-primary"
      >
        {children}
      </Link>
    </li>
  );
};

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
}

const SocialLink = ({ href, icon }: SocialLinkProps) => {
  return (
    <a 
      href={href}
      className="text-gray-400 hover:text-primary transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon}
    </a>
  );
};

export default Footer;
