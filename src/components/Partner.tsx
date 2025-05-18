'use client';
import Image from 'next/image';

const partnerCountries = [
  {
    id: 1,
    name: 'USA',
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg', // Flag image URL for USA
  },
  {
    id: 2,
    name: 'Sweden',
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Flag_of_Sweden.svg', // Flag image URL for Sweden
  },
  {
    id: 3,
    name: 'Saudi Arabia',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Flag_of_Saudi_Arabia.svg', // Flag image URL for Saudi Arabia
  },
  {
    id: 4,
    name: 'Bhutan',
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Flag_of_Bhutan.svg', // Flag image URL for Bhutan
  },
  {
    id: 5,
    name: 'Singapore',
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Flag_of_Singapore.svg', // Flag image URL for Singapore
  },
];

const ProudPartnerSection = () => {
  return (
    <section id="partners" className="py-16 bg-gray-100 dark:bg-[#B0C4DE]">
      <div className="container mx-auto px-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-black mb-8">
          Working Proudly with my Valuable Clients
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
          {partnerCountries.map((partner) => (
            <div
              key={partner.id}
              className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-transform transform hover:scale-105"
            >
              <Image
                src={partner.image}
                alt={partner.name}
                width={100}
                height={60}
                className="w-full h-auto mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{partner.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProudPartnerSection;
