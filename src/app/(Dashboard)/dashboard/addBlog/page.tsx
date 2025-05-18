'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';

interface BlogData {
  title: string;
  content: string;
  image: string;
  published: boolean;
  author: string;
}

export default function AddBlog() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const { register, handleSubmit, reset, formState: { errors } } = useForm<BlogData>();

  const onSubmit = async (data: BlogData) => {
    setLoading(true);
    setMessage({ type: '', text: '' });
    
    try {
      const authUser = sessionStorage.getItem('authUser');
      const token = sessionStorage.getItem('authToken');

      if (!authUser || !token) {
        setMessage({ type: 'error', text: 'Please login to create a blog' });
        return;
      }
  
      const { id } = JSON.parse(authUser);
      
      const response = await fetch('https://assignment-3-gray-seven.vercel.app/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...data,
          author: id, 
          token,
          published: true
        })
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.message || 'Failed to create blog');
      }
  
      setMessage({ type: 'success', text: 'Blog created successfully!' });
      reset();
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Failed to create blog'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-white min-h-screen p-8 rounded-xl shadow-lg max-w-4xl mx-auto mt-8'>
      <h1 className='text-3xl font-bold text-gray-900 mb-8'>Create New Blog</h1>

      {message.text && (
        <div className={`p-4 rounded-md mb-6 ${
          message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Blog Title
          </label>
          <input
            {...register('title', { required: 'Title is required' })}
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter blog title"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image URL
          </label>
          <input
            {...register('image', { required: 'Image URL is required' })}
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter image URL"
          />
          {errors.image && (
            <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>
          <textarea
            {...register('content', { 
              required: 'Content is required',
              minLength: { value: 50, message: 'Content must be at least 50 characters' }
            })}
            rows={6}
            className="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Write your blog content here..."
          />
          {errors.content && (
            <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
          )}
        </div>

        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`flex items-center justify-center px-6 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              loading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Creating...
              </>
            ) : (
              'Create Blog'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}