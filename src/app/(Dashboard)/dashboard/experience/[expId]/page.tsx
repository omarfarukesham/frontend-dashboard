'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface ExperienceData {
  company: string;
  role: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  technologies: string[];
  isCurrent: boolean;
  companyIcon: string;
}

const EditExperiencePage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.expId;
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ExperienceData>();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await fetch(
          `https://portfolio-server-mocha-omega.vercel.app/api/experience/${id}`
        );
        if (!res.ok) throw new Error('Failed to fetch experience');
        

        const data1 = await res.json();
        const data = data1?.data;        
    
        const formattedData = {
          ...data,
          startDate: new Date(data.startDate).toISOString().split('T')[0],
          endDate: data.endDate ? new Date(data.endDate).toISOString().split('T')[0] : '',
          technologies: data.technologies?.join(', ') || '',
        };

        reset(formattedData); 
        setLoading(false);
      } catch {
        toast.error('Error loading experience');
        setLoading(false);
      }
    };

    if (id) fetchExperience();
  }, [id, reset]);

  const onSubmit = async (data: ExperienceData) => {
    if (!id) return;
    setLoading(true);
    try {
      const formattedData = {
        ...data,
        technologies: data.technologies.toString().split(',').map(tech => tech.trim()),
      };

      console.log('Formatted Data:', formattedData);
      const res = await fetch(
        `https://portfolio-server-mocha-omega.vercel.app/api/experience/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formattedData),
        }
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to update experience');
      }

      toast.success('Experience updated successfully!');
      router.push('/dashboard/experience');
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : 'Failed to update experience');
    }
  };

    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      );
    }
  
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-6">Edit Experience</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Company</label>
            <input
              type="text"
              {...register('company', { required: true })}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Role</label>
            <input
              type="text"
              {...register('role', { required: true })}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              {...register('description', { required: true })}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-1 font-medium">Start Date</label>
              <input
                type="date"
                {...register('startDate', { required: true })}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-medium">End Date</label>
              <input
                type="date"
                {...register('endDate')}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          </div>
          <div>
            <label className="block mb-1 font-medium">Location</label>
            <input
              type="text"
              {...register('location', { required: true })}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Technologies (comma separated)</label>
            <input
              type="text"
              {...register('technologies', { required: true })}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register('isCurrent')}
              className="mr-2"
            />
            <label className="font-medium">Currently Working Here</label>
          </div>
          <div>
            <label className="block mb-1 font-medium">Company Icon URL</label>
            <input
              type="text"
              {...register('companyIcon')}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            {isSubmitting ? 'Updating...' : 'Update Experience'}
          </button>
        </form>
      </div>
    );
  };
  
  export default EditExperiencePage;