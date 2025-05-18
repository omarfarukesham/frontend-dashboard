import Link from 'next/link';
import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-10">
      <div className="container mx-auto px-4">
        {/* Footer Top Section */}
        <div className="flex flex-col md:flex-row justify-between mb-8">
          {/* About Section */}
          <div className="mb-6 md:mb-0 md:w-1/3">
            <h4 className="text-lg font-semibold text-white mb-4">About Me</h4>
            <p className="text-sm leading-relaxed">
              I am a passionate full-stack developer with 3+ years of experience in the JavaScript ecosystem. I work with clients worldwide, delivering high-quality mobile and web solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="mb-6 md:mb-0 md:w-1/3">
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:underline">Home</Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline">About</Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:underline">Blogs</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="md:w-1/3">
            <h4 className="text-lg font-semibold text-white mb-4">Follow Me</h4>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-white">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-white">
                <FaTwitter size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-white">
                <FaLinkedin size={24} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-white">
                <FaGithub size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="border-t border-gray-700 pt-4 text-center">
          <p className="text-sm">&copy; 2025 Anas Blog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
