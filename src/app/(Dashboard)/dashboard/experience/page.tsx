'use client';

import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';
import Modal from '@/components/ConfirmationModal';
import toast from 'react-hot-toast';
import { FaEdit } from 'react-icons/fa';

interface Experience {
  _id: string;
  company: string;
  role: string;
  location?: string;
  startDate: string;
  endDate?: string | null;
  isCurrent: boolean;
}

const API_URL = 'https://portfolio-server-mocha-omega.vercel.app/api/experience';

const ExperiencePage = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    setLoading(true);
    const res = await fetch(API_URL);
    const data = await res.json();
    setExperiences(data?.data || []);
    setLoading(false);
  };

  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedId) return;

    try {
      const res = await fetch(`${API_URL}/${selectedId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Delete failed');

      setExperiences((prev) => prev.filter((exp) => exp._id !== selectedId));
      toast.success('Experience deleted successfully');
    } catch (error) {
      console.error('Error deleting:', error);
      toast.error('Failed to delete experience');
    } finally {
      setIsModalOpen(false);
      setSelectedId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Experience</h1>
        <Link 
          href="/dashboard/addExp"
          className='bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700'
        >
          Add New Experience
        </Link>
      </div>

      {loading ? (
        <p>Loading experiences...</p>
      ) : (
        <div className="overflow-x-auto border rounded shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {experiences.map((exp) => (
                <tr key={exp._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{exp.company}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{exp.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{exp.location || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(exp.startDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                    })}{' '}
                    -{' '}
                    {exp.isCurrent
                      ? 'Present'
                      : exp.endDate
                      ? new Date(exp.endDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                        })
                      : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center flex justify-center gap-4">
               
                       <Link
                        href={`experience/${exp._id}`}
                        className='text-indigo-600 hover:text-indigo-900 mr-3'
                      >
                        <FaEdit className='inline' />
                      </Link>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDeleteClick(exp._id)}
                      aria-label="Delete experience"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {experiences.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    No experiences found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this experience?"
      />
    </div>
  );
};

export default ExperiencePage;
