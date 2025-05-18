'use client';
import Image from 'next/image';
import React from 'react';
import { FaUser, FaEnvelope, FaComment } from 'react-icons/fa';
import contactImg from '@/assets/contact.jpg';
import toast from 'react-hot-toast';

const ContactSection = () => {

  const handleSendMessage = () => {
    toast.success('Message sent successfully!');
  };
  return (
    <section className="w-full mx-auto  bg-white">
      <h2 className="text-3xl font-bold text-gray-900 text-center pt-10">Get in Touch</h2>
      <div className="flex flex-col md:flex-row bg-whites overflow-hidden">
        {/* Left Side - Image */}
        <div className="md:w-1/2 ">
          <Image
            src={contactImg}
            alt="Contact"
            className="w-full h-full object-cover"
            width={500}
            height={400}
          />
        </div>
        
        {/* Right Side - Form */}
        <div className="md:w-1/2 p-8">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <div className="relative mt-1">
                <FaUser className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <div className="relative mt-1">
                <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <div className="relative mt-1">
                <FaComment className="absolute left-3 top-3 text-gray-400" />
                <textarea
                  rows={5}
                  placeholder="Your Message"
                  className="w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              onClick={handleSendMessage}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
