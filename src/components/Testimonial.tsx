'use client';
import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    name: 'Nabila Toufiq',
    country: 'USA',
    feedback:
      'Working with Omar on our mobile app development project was an absolute pleasure. His expertise and creativity were impressive!',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    id: 2,
    name: 'Ahmed Al-Mutairi',
    country: 'Saudi Arabia',
    feedback:
      'Omar delivered our project on time with outstanding quality. His problem-solving skills are exceptional!',
    image: 'https://randomuser.me/api/portraits/men/10.jpg',
  },
  {
    id: 3,
    name: 'Wei Ling',
    country: 'Singapore',
    feedback:
      'Omar is highly professional and knowledgeable. I look forward to collaborating with him again!',
    image: 'https://randomuser.me/api/portraits/women/8.jpg',
  },
  {
    id: 4,
    name: 'Tashi Dorji',
    country: 'Bhutan',
    feedback:
      'An excellent experience working with Omar! His attention to detail and dedication made the project a success.',
    image: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
  {
    id: 5,
    name: 'Nashra Alam',
    country: 'Bangladesh',
    feedback:
      'Omar’s expertise in mobile development helped us bring our idea to life. Highly recommended!',
    image: 'https://randomuser.me/api/portraits/women/5.jpg',
  },
];

const TestimonialPage = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true });

  return (
    <div className="w-full mx-auto  bg-gradient-to-r from-blue-500 to-purple-600 text-white py-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Client Testimonials</h2>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="min-w-[300px] md:min-w-[450px] p-6 bg-white text-black shadow-md rounded-lg mx-4"
            >
              <div className="flex items-center space-x-4 mb-4">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                    width={64}
                    height={64}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold text-black">{testimonial.name}</h3>
                  <p className="text-sm text-black">{testimonial.country}</p>
                </div>
              </div>
              <p className="text-black leading-relaxed italic">
                <FaQuoteLeft className="inline-block text-blue-500 mr-2" />
                {testimonial.feedback}
                <FaQuoteRight className="inline-block text-blue-500 ml-2" />
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialPage;
