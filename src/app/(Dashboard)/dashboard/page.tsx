'use client';

import { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaSpinner } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

interface Blog {
  _id: string;
  title: string;
  content: string;
  image: string;
  author: {
    name: string;
  };
  createdAt: string;
}

const DashboardPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchBlogs = async () => {
    try {
      const token = sessionStorage.getItem('authToken');
      const response = await fetch('https://assignment-3-gray-seven.vercel.app/api/blogs', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch blogs');
      
      const data = await response.json();
      setBlogs(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    
    try {
      const token = sessionStorage.getItem('authToken');
      const response = await fetch(`https://assignment-3-gray-seven.vercel.app/api/blogs/${deleteId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to delete blog');
      
      setBlogs(blogs.filter(blog => blog._id !== deleteId));
      setDeleteId(null); 
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete blog');
    }
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = blogs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(blogs.length / itemsPerPage);

  return (
    <div className='bg-white min-h-screen p-8 rounded-xl shadow-lg'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl font-bold text-gray-900'>Blog Dashboard</h1>
        <Link 
          href="/dashboard/addBlog"
          className='bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700'
        >
          Add New Blog
        </Link>
      </div>

      {error && (
        <div className='bg-red-50 text-red-700 p-4 rounded-md mb-6'>
          {error}
        </div>
      )}

      {loading ? (
        <div className='flex justify-center items-center h-64'>
          <FaSpinner className='animate-spin h-8 w-8 text-indigo-600' />
        </div>
      ) : (
        <>
          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>SL</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Title</th>

                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Author</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Image</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Date</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {currentItems.map((blog, index) => (
                  <tr key={blog._id} className='hover:bg-gray-50'>
                    <td className='px-6 py-4 whitespace-nowrap text-black'>{index + 1}</td>
                    <td className='px-6 py-4 whitespace-nowrap text-black'>{blog.title}</td>
                    <td className='px-6 py-4 whitespace-nowrap text-black'>{blog.author.name}</td>
                    <td className='px-6 py-4'>
                        <Image 
                            src={blog.image} 
                            alt={blog.title} 
                            width={40}  // Increase width
                            height={40} // Increase height
                            className='h-10 w-10 object-cover rounded-lg'
                            priority     // Add priority loading
                            quality={100} // Set max quality
                        />
                    </td>
                    <td className='px-6 py-4 text-black'>
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap space-x-2'>
                      <Link
                        href={`/dashboard/${blog._id}`}
                        className='text-indigo-600 hover:text-indigo-900 mr-3'
                      >
                        <FaEdit className='inline' />
                      </Link>
                      <button
                        onClick={() => setDeleteId(blog._id)}
                        className='text-red-600 hover:text-red-900'
                      >
                        <FaTrash className='inline' />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className='flex justify-center items-center space-x-2 mt-6'>
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className='px-3 py-1 rounded-md bg-gray-400 disabled:opacity-50'
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === index + 1 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-400 text-white hover:bg-gray-500'
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className='px-3 py-1 rounded-md bg-gray-700 disabled:opacity-50'
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4 text-red-500">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this blog? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-white hover:bg-gray-400 bg-indigo-600 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;