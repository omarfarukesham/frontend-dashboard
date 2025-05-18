import Image from 'next/image';
import profileImg from '@/assets/removebg.png'; 
import Link from 'next/link';
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';

export const metadata = {
  title: "About Me",
  description: "Learn more about Mohammad Anas, an experienced administrator with over 4 years of experience in SAP and administrative management.",
};

export default function AboutPage() {
  return (
    <main className="w-[90%] mx-auto min-h-screen py-16">
      <section className="flex flex-col md:flex-row items-center">
        {/* Profile Image */}
        <div className="rounded-full overflow-hidden mb-8 md:mb-0 md:mr-12">
          <Image src={profileImg} alt="Mohammad Anas Profile" className="object-cover" />
        </div>

        {/* About Section */}
        <div className="text-gray-800">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Me</h1>
          <p className="text-lg leading-relaxed">
            I am a skilled <span className="font-semibold">Administrator</span> with over <span className="font-semibold">4 years of experience</span> in managing administrative tasks and SAP support. Currently working at <span className="font-semibold">SHANAMIN</span> in Dammam, Saudi Arabia, I specialize in vendor registration, system maintenance, and troubleshooting within the SAP environment.
          </p>
          <p className="text-lg leading-relaxed mt-4">
            My expertise includes managing procurement processes, contract handling, and ensuring compliance with company policies and regulatory standards. I have a proven track record of streamlining workflows and enhancing system efficiency.
          </p>
          <p className="text-lg leading-relaxed mt-4">
            I am passionate about improving administrative procedures and building effective communication channels to resolve operational issues quickly and efficiently.
          </p>
        </div>
      </section>

      {/* Technical Skills */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Skills</h2>
        <ul className="list-disc list-inside space-y-2 text-black">
          <li>SAP system administration and troubleshooting</li>
          <li>Vendor registration and management</li>
          <li>Procurement and contract handling</li>
          <li>Regulatory compliance and documentation</li>
          <li>Workflow optimization and system efficiency</li>
        </ul>
      </section>

      {/* Work Philosophy */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Work Philosophy</h2>
        <p className="text-lg leading-relaxed text-black">
          I believe in maintaining accuracy, improving system processes, and fostering smooth communication between vendors and teams. I strive to enhance efficiency and resolve issues effectively.
        </p>
      </section>

      {/* Contact Section */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Me</h2>
        <p className="text-lg leading-relaxed text-black">
          Feel free to reach out if you have any questions or need professional support. I’m open to discussing new opportunities and collaborations.
        </p>

        <div className="mt-6 space-y-4">
          <div className="flex items-center space-x-4">
            <FaEnvelope className="text-blue-500 text-2xl" />
            <p className="text-lg text-black">
              <span className="font-semibold">Email:</span> <a href="mailto:anas@example.com" className="text-blue-500 hover:underline">anas@example.com</a>
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <FaLinkedin className="text-blue-600 text-2xl" />
            <p className="text-lg text-black">
              <span className="font-semibold">LinkedIn:</span> <Link href="https://linkedin.com/in/anas" className="text-blue-500 hover:underline" target="_blank">https://www.linkedin.com/in/anas</Link>
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <FaGithub className="text-gray-800 text-2xl" />
            <p className="text-lg text-black">
              <span className="font-semibold">GitHub:</span> <Link href="https://github.com/anas" className="text-blue-500 hover:underline" target="_blank">https://github.com/anas</Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
