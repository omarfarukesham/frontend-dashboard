'use client';
import { FaHandshake, FaShoppingCart, FaTools, FaFileContract, FaChartLine, FaShieldAlt, FaComments } from 'react-icons/fa';
import { SiSap } from 'react-icons/si';

const skills = [
  { name: 'SAP Administration', icon: <SiSap className="text-4xl text-blue-500" /> },
  { name: 'Vendor Management', icon: <FaHandshake className="text-4xl text-green-500" /> },
  { name: 'Procurement Processes', icon: <FaShoppingCart className="text-4xl text-teal-400" /> },
  { name: 'System Troubleshooting', icon: <FaTools className="text-4xl text-gray-700" /> },
  { name: 'Contract Management', icon: <FaFileContract className="text-4xl text-orange-500" /> },
  { name: 'Workflow Optimization', icon: <FaChartLine className="text-4xl text-purple-500" /> },
  { name: 'Compliance and Standards', icon: <FaShieldAlt className="text-4xl text-red-500" /> },
  { name: 'Communication and Coordination', icon: <FaComments className="text-4xl text-blue-400" /> },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-16 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12">
          My Skills
        </h2>
        <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-8">
          Here’s a quick look at the tools and technologies I work with to build high-performance web applications:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all hover:scale-105 hover:shadow-xl"
            >
              <div className="mb-4">{skill.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {skill.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
