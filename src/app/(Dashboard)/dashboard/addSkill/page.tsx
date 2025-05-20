'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

type FormData = {
  name: string;
  icon: FileList;
};

const AddSkill = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
    const router = useRouter();
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // First upload the icon to Cloudinary
      const iconUrl = await uploadToCloudinary(data.icon[0]);
      
      // Then send the data to your API
      await axios.post('https://portfolio-server-mocha-omega.vercel.app/api/skill', {
        name: data.name,
        icon: iconUrl
      });
      
      reset();
      toast.success('Skill added successfully');
        router.push('/dashboard/skill');
    } catch (error) {
      console.error('Error adding skill:', error);
        toast.error('Failed to add skill');
    } finally {
      setIsSubmitting(false);
    }
  };

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'blogImage'); 
    
    const response = await axios.post(
      'https://api.cloudinary.com/v1_1/dbtskylxt/image/upload', 
      formData
    );
    
    return response.data.secure_url;
  };

  return (
    <div className='max-w-6xl mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-4'>Add Skill</h1>
      <form 
        onSubmit={handleSubmit(onSubmit)}
        className='bg-white p-6 rounded-lg shadow-md'
      >
        <div className='mb-4'>
          <label htmlFor='name' className='block text-gray-700 font-bold mb-2'>
            Skill Name
          </label>
          <input
            id='name'
            type='text'
            className='border border-gray-300 rounded-lg p-2 w-full'
            {...register('name', { required: 'Skill name is required' })}
          />
          {errors.name && (
            <p className='text-red-500 text-sm mt-1'>{errors.name.message}</p>
          )}
        </div>
        
        <div className='mb-4'>
          <label htmlFor='icon' className='block text-gray-700 font-bold mb-2'>
            Skill Icon
          </label>
          <input
            id='icon'
            type='file'
            accept='image/*'
            className='border border-gray-300 rounded-lg p-2 w-full'
            {...register('icon', { required: 'Icon is required' })}
          />
          {errors.icon && (
            <p className='text-red-500 text-sm mt-1'>{errors.icon.message}</p>
          )}
        </div>

        <button
          type='submit'
          disabled={isSubmitting}
          className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Adding...' : 'Add Skill'}
        </button>
      </form>
    </div>
  );
};

export default AddSkill;