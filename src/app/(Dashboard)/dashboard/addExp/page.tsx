/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const AddExperiencePage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();


  const onSubmit = async (data: any) => {
    try {
      // Convert technologies string to array
      data.technologies = data.technologies
        .split(',')
        .map((t: string) => t.trim());

      const res = await fetch(
        'https://portfolio-server-mocha-omega.vercel.app/api/experience',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) {
        const error = await res.json();
        toast.error(error.message || 'Failed to submit experience');
        return;
      }
      reset();
      toast.success('Experience submitted successfully!');
      router.push('/dashboard/experience');
    } catch (error) {
      console.error(error);
     toast.error('Failed to submit experience');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">Experience</h1>
      <p className="text-gray-600 mb-6">
        This is the experience page. You can add your experience here.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-white p-6 rounded shadow"
      >
        <div>
          <label className="block font-medium">Company</label>
          <input
            {...register('company', { required: true })}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Role</label>
          <input
            {...register('role', { required: true })}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            {...register('description', { required: true })}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Start Date</label>
          <input
            type="date"
            {...register('startDate', { required: true })}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">End Date</label>
          <input
            type="date"
            {...register('endDate')}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Location</label>
          <input
            {...register('location')}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">
            Technologies (comma separated)
          </label>
          <input
            {...register('technologies')}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input type="checkbox" {...register('isCurrent')} />
          <label>Currently working here</label>
        </div>

        <div>
          <label className="block font-medium">Company Icon URL</label>
          <input
            {...register('companyIcon')}
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default AddExperiencePage;
