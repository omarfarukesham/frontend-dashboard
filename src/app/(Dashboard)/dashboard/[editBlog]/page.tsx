'use client';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { use } from 'react';
import TiptapEditor from '@/components/ReactQuillEditor';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface BlogData {
  title: string;
  content: string;
  image: string;
  published: boolean;
  author: string;
}

const EditBlogPage = ({ params }: { params: Promise<{ editBlog: string }> }) => {
  const { editBlog } = use(params);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });
  const router = useRouter()

  const { 
    register, 
    handleSubmit, 
    setValue, 
    reset, 
    formState: { errors } 
  } = useForm<BlogData>({
    defaultValues: {
      published: true
    }
  });

  useEffect(() => {
    const fetchBlogData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://portfolio-server-mocha-omega.vercel.app/api/blogs/${editBlog}`, {
          cache: 'no-store',
        });
        
        if (!res.ok) {
          throw new Error('Failed to fetch blog data');
        }
        
        const { data: blog } = await res.json();
        reset({
          title: blog.title,
          content: blog.content,
          image: blog.image,
          published: blog.published,
          author: blog.author
        });
        setContent(blog.content);
      } catch (error) {
        setMessage({ 
          type: 'error', 
          text: error instanceof Error ? error.message : 'Failed to load blog data' 
        });
      } finally {
        setLoading(false);
        setInitialLoad(false);
      }
    };

    fetchBlogData();
  }, [editBlog, reset]);

  const onSubmit = async (data: BlogData) => {
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const authUser = sessionStorage.getItem('authUser');
      const token = sessionStorage.getItem('authToken');

      if (!authUser || !token) {
        throw new Error('Please login to edit the blog');
      }

      const response = await fetch(`https://portfolio-server-mocha-omega.vercel.app/api/blogs/${editBlog}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          ...data, 
          content, // Ensure we use the latest editor content
          token 
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to update blog');
      }

    toast.success('Blog updated successfully!');
    router.push('/dashboard');
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Failed to update blog' 
      });
    } finally {
      setLoading(false);
    }
  };

  if (initialLoad) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FaSpinner className="animate-spin text-4xl text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen p-8 rounded-xl shadow-lg max-w-4xl mx-auto mt-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Blog</h1>

      {message.text && (
        <div
          className={`p-4 rounded-md mb-6 ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-700' 
              : 'bg-red-50 text-red-700'
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Blog Title *
          </label>
          <input
            {...register('title', { 
              required: 'Title is required',
              minLength: {
                value: 5,
                message: 'Title must be at least 5 characters'
              }
            })}
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter blog title"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">
              {errors.title.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image URL *
          </label>
          <input
            {...register('image', { 
              required: 'Image URL is required',
              pattern: {
                value: /^(https?:\/\/).+\.(jpg|jpeg|png|gif|webp)$/i,
                message: 'Please enter a valid image URL'
              }
            })}
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter image URL"
          />
          {errors.image && (
            <p className="mt-1 text-sm text-red-600">
              {errors.image.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content *
          </label>
          <TiptapEditor 
            content={content} 
            onChange={(newContent) => {
              setContent(newContent);
              setValue('content', newContent, { shouldValidate: true });
            }} 
          />
          {errors.content && (
            <p className="mt-1 text-sm text-red-600">
              {errors.content.message}
            </p>
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
                Updating...
              </>
            ) : (
              'Update Blog'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlogPage;