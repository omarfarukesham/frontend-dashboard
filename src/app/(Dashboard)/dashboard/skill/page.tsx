'use client'
import LoadingPage from '@/app/loading';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { FaTrash, FaPlus } from 'react-icons/fa';
import toast from 'react-hot-toast';
import ConfirmationModal from '@/components/ConfirmationModal';
import Link from 'next/link';

// Define interfaces
interface Skill {
    _id: string;
    name: string;
    icon: string;
}

const SkillPage = () => {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [skillToDelete, setSkillToDelete] = useState<string | null>(null);

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async (): Promise<void> => {
        setLoading(true);
        try {
            const response = await fetch('https://portfolio-server-mocha-omega.vercel.app/api/skill');
            if (!response.ok) {
                throw new Error('Failed to fetch skills');
            }
            const data = await response.json();
            setSkills(data.data);
        } catch (error) {
            toast.error('Error fetching skills');
            console.error('Fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (id: string): void => {
        setSkillToDelete(id);
        setIsModalOpen(true);
    };

    const confirmDelete = async (): Promise<void> => {
        if (!skillToDelete) return;
        
        try {
            const response = await fetch(`https://portfolio-server-mocha-omega.vercel.app/api/skill/${skillToDelete}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast.success('Skill deleted successfully');
                await fetchSkills();
            } else {
                throw new Error('Failed to delete skill');
            }
        } catch (error) {
            toast.error('Error deleting skill');
            console.error('Delete error:', error);
        } finally {
            setIsModalOpen(false);
            setSkillToDelete(null);
        }
    };

    if (loading) return <LoadingPage />;

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Skills Management</h1>
                <Link href="/dashboard/addSkill"  className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                    <FaPlus /> Add New Skill
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skill</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Icon</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {skills.map((skill) => (
                                <tr key={skill._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{skill.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Image 
                                            src={skill.icon}
                                            alt={skill.name}
                                            width={40}
                                            height={40}
                                            className="rounded-lg"
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button 
                                            onClick={() => handleDelete(skill._id)}
                                            className="text-red-500 hover:text-red-700 transition-colors"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Skill"
                message="Are you sure you want to delete this skill? This action cannot be undone."
            />
        </div>
    );
};

export default SkillPage;