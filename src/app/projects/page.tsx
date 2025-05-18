'use client';
import Image,{ StaticImageData } from 'next/image';
import { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import Link from 'next/link';
import { projectsData } from '@/_data/fakeData';



const ProjectsSection = () => {
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [showDetails, setShowDetails] = useState<{
    id: number;
    title: string;
    description: string;
    image: StaticImageData;
    techStack: string[];
    github: string;
  } | null>(null);

  const loadMore = () => setVisibleProjects((prev) => prev + 2);

  return (
    <section id="projects" className="py-16 bg-white dark:bg-gray-100">
      <div className="container mx-auto px-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-800 mb-8">
          My Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.slice(0, visibleProjects).map((project) => (
            <div
              key={project.id}
              className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md p-6 transition-transform transform hover:scale-105"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {project.title}
              </h3>
              <Image
                src={project.image}
                alt={project.title}
                width={500}
                height={300}
                className="w-full h-40 object-cover mb-4 rounded-md"
              />
              <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
              <div className="flex items-center space-x-4">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 dark:text-white hover:text-blue-500"
                >
                  <FaGithub className="text-2xl" />
                </a>
                <button
                  onClick={() => setShowDetails(project)}
                  className="text-blue-500 font-medium hover:underline"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
        {visibleProjects < projectsData.length && (
          <div className="text-center mt-8">
            <button
              onClick={loadMore}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Load More
            </button>
          </div>
        )}
      </div>

      {showDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-lg w-full relative">
            <button
              onClick={() => setShowDetails(null)}
              className="absolute top-4 right-4 text-gray-800 dark:text-white hover:text-red-500"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              {showDetails.title}
            </h3>
            <Image
                src={showDetails.image}
                alt={showDetails.title}
                width={500}
                height={300}
                className="w-full object-cover mb-4 rounded-md"
              />
            <p className="text-gray-600 dark:text-gray-300 mb-4">{showDetails.description}</p>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Tech Stack:</h4>
            <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300">
              {showDetails.techStack.map((tech, index) => (
                <li key={index}>{tech}</li>
              ))}
            </ul>
            <div className="mt-6">
              <Link
                href={showDetails.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                View GitHub Repo
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
