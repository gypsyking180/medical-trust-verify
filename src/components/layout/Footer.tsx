
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Twitter, Facebook, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link to="/" className="flex items-center text-xl font-bold text-primary">
              <Heart className="mr-2 text-secondary" size={24} />
              careBridge
            </Link>
            <p className="text-gray-500 mt-2 text-sm">
              A decentralized medical crowdfunding platform powered by blockchain technology.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Facebook</span>
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">LinkedIn</span>
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">GitHub</span>
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">Platform</h3>
            <ul role="list" className="mt-4 space-y-4">
              <li>
                <Link to="/campaigns" className="text-base text-gray-500 hover:text-gray-900">
                  Browse Campaigns
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-base text-gray-500 hover:text-gray-900">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/apply" className="text-base text-gray-500 hover:text-gray-900">
                  Become a Verifier
                </Link>
              </li>
              <li>
                <Link to="/create-campaign" className="text-base text-gray-500 hover:text-gray-900">
                  Start a Campaign
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">Support</h3>
            <ul role="list" className="mt-4 space-y-4">
              <li>
                <Link to="/faq" className="text-base text-gray-500 hover:text-gray-900">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-base text-gray-500 hover:text-gray-900">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-base text-gray-500 hover:text-gray-900">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-base text-gray-500 hover:text-gray-900">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">Connect</h3>
            <form className="mt-4 sm:flex sm:max-w-md">
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                type="email"
                name="email-address"
                id="email-address"
                autoComplete="email"
                required
                className="appearance-none min-w-0 w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary focus:placeholder-gray-400"
                placeholder="Enter your email"
              />
              <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="w-full bg-primary border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-primary/90"
                >
                  Subscribe
                </button>
              </div>
            </form>
            <p className="mt-3 text-sm text-gray-500">
              Get updates on new campaigns and platform features
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 flex flex-col items-center">
          <p className="mt-2 text-center text-base text-gray-400">
            &copy; {new Date().getFullYear()} careBridge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
