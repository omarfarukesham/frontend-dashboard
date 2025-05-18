'use client';

import { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}

const dummyMessages: Message[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'Project Inquiry',
    message: 'I would like to discuss a potential project...',
    date: '2024-03-20'
  },
  {
    id: '2', 
    name: 'Sarah Smith',
    email: 'sarah@example.com',
    subject: 'Collaboration Request',
    message: 'We are interested in collaborating...',
    date: '2024-03-19'
  },
  // Add more dummy messages as needed
];

export default function ClientMessage() {
  const [loading] = useState(false);

  return (
    <div className="bg-white min-h-screen p-8 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Client Messages</h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <FaSpinner className="animate-spin h-8 w-8 text-indigo-600" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dummyMessages.map((msg, index) => (
                <tr key={msg.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{msg.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{msg.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{msg.subject}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <p className="truncate max-w-xs">{msg.message}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(msg.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}