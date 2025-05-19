import { Facebook, Home, Instagram, Linkedin, Mail, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Footer Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <div className="mr-2 h-10 w-10 bg-blue-600 rounded-md flex items-center justify-center">
                <Home className="text-white" size={24} />
              </div>
              <span className="text-xl font-bold">Migra Aflux</span>
            </div>
            <p className="text-gray-300 mb-4">
              Discover exclusive properties and marketplace items — all in one place.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Browse Properties</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Explore Marketplace</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Contact</a></li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">Property Listing</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Property Management</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Marketplace Selling</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Interior Design</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Home Renovation</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="mr-2 text-gray-300 flex-shrink-0 mt-1" size={16} />
                <span className="text-gray-300">info@migraflux.com</span>
              </li>
              <li className="text-gray-300">
                123 Main Street, Suite 100<br />
                San Francisco, CA 94101
              </li>
              <li>
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
                  Send Message
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Migra Aflux. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 text-sm hover:text-white">Privacy Policy</a>
              <a href="#" className="text-gray-400 text-sm hover:text-white">Terms of Service</a>
              <a href="#" className="text-gray-400 text-sm hover:text-white">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};