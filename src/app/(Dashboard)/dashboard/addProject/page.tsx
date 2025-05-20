'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import toast from 'react-hot-toast'

type FormData = {
  title: string
  description: string
  technologies: string
  isFeatured: boolean
  thumbnailFile?: FileList
  screenshots?: FileList
  tags?: string
}

export default function AddProjectPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      // Upload thumbnail to Cloudinary
      let thumbnailUrl = ''
      if (data.thumbnailFile && data.thumbnailFile[0]) {
        thumbnailUrl = await uploadToCloudinary(data.thumbnailFile[0])
      }

      // Prepare project data
      const projectData = {
        title: data.title,
        description: data.description,
        technologies: data.technologies.split(',').map(tech => tech.trim()),
        thumbnail: thumbnailUrl,
        isFeatured: data.isFeatured,
        tags: data.tags ? data.tags.split(',').map(tag => tag.trim()) : [],
        screenshots: [] 
      }

      // Submit to API
      await axios.post('https://portfolio-server-mocha-omega.vercel.app/api/project', projectData)
      
      toast.success('Project added successfully!')
      router.push('dashboard/project')
    } catch (error) {
      console.error('Error adding project:', error)
        toast.error('Failed to add project. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)
   formData.append('upload_preset', 'blogImage'); 
    
    const response = await axios.post(
      'https://api.cloudinary.com/v1_1/dbtskylxt/image/upload', 
      formData
    );
    
    return response.data.secure_url
  }

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setThumbnailPreview(URL.createObjectURL(file))
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Add New Project</h1>
        <Link 
          href="/dashboard/project" 
          className="text-white hover:text-gray-200 p-2 rounded bg-blue-500"
        >
          Back to Projects
        </Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 gap-6">
          {/* Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Project Title*
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('title', { required: 'Title is required' })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Description*
            </label>
            <textarea
              rows={4}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('description', { required: 'Description is required' })}
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          {/* Technologies */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Technologies* (comma separated)
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('technologies', { required: 'Technologies are required' })}
              placeholder="React, Node.js, MongoDB"
            />
            {errors.technologies && (
              <p className="text-red-500 text-sm mt-1">{errors.technologies.message}</p>
            )}
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Thumbnail*
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('thumbnailFile', { required: 'Thumbnail is required' })}
              onChange={handleThumbnailChange}
            />
            {errors.thumbnailFile && (
              <p className="text-red-500 text-sm mt-1">{errors.thumbnailFile.message}</p>
            )}
            {thumbnailPreview && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Preview:</p>
                <Image
                  src={thumbnailPreview} 
                  alt="Thumbnail preview" 
                  width={20}
                    height={20}
                  className="h-32 w-32 object-cover rounded"
                />
              </div>
            )}
          </div>

          {/* Tags */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Tags (comma separated)
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('tags')}
              placeholder="web,mobile,responsive"
            />
          </div>

          {/* Featured */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isFeatured"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              {...register('isFeatured')}
            />
            <label htmlFor="isFeatured" className="ml-2 block text-gray-700">
              Featured Project
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 rounded-lg text-white ${isSubmitting ? 'bg-blue-400' : 'bg-blue-500 hover:bg-blue-600'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              {isSubmitting ? 'Adding Project...' : 'Add Project'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}