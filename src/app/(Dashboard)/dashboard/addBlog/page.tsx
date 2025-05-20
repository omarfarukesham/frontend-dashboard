/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaSpinner, FaUpload } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import TiptapEditor from '@/components/ReactQuillEditor';
// import ReactQuillEditor from '@/components/ReactQuillEditor';


export default function AddBlog() {
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [content, setContent] = useState('');
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const router = useRouter();
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    
    setImageLoading(true);
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'blogImage');
    
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dbtskylxt/image/upload', 
        formData
      );
      setValue('image', response.data.secure_url);
      setMessage({ type: 'success', text: 'Image uploaded!' });
    } catch (error) {
      console.error('Image upload error:', error);
      toast.error('Image upload failed. Please try again.');
    } finally {
      setImageLoading(false);
    }
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const authUser = JSON.parse(sessionStorage.getItem('authUser') || '{}');
      const token = sessionStorage.getItem('authToken');
      
      if (!token) throw new Error('Please login');
      
      await axios.post('https://portfolio-server-mocha-omega.vercel.app/api/blogs', {
        ...data,
        content,
        author: authUser.id,
        published: true
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast.success('Blog created successfully!');
      router.push('/dashboard/blog');
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Blog</h1>
      
      {message.text && (
        <div className={`p-2 mb-4 rounded ${message.type === 'success' ? 'bg-green-100' : 'bg-red-100'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Title*</label>
          <input
            {...register('title', { required: true })}
            className="w-full p-2 border rounded"
          />
          {errors.title && <p className="text-red-500">Required</p>}
        </div>

        <div>
          <label className="block mb-1">Featured Image*</label>
          <div className="flex gap-2">
            <label className="flex items-center px-4 py-2 border rounded cursor-pointer">
              <FaUpload className="mr-2" />
              {imageLoading ? 'Uploading...' : 'Upload'}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
            <input
              {...register('image', { required: true })}
              readOnly
              className="flex-1 p-2 border rounded"
            />
          </div>
          {errors.image && <p className="text-red-500">Required</p>}
        </div>

        <div>
          <label className="block mb-1">Content*</label>
          <TiptapEditor content={content} onChange={setContent} />
          {!content && <p className="text-red-500">Required</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          {loading ? <FaSpinner className="animate-spin" /> : 'Publish'}
        </button>
      </form>
    </div>
  );
}