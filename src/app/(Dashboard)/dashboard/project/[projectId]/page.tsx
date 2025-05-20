'use client'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import toast from 'react-hot-toast'

type FormData = {
  title: string
  description: string
  technologies: string
  isFeatured: boolean
  thumbnailFile?: FileList
  existingThumbnail?: string
  tags?: string
}

export default function EditProjectPage() {
  const router = useRouter()
 const params = useParams();
  const id = params.projectId;
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>()
console.log('Project ID:', id)
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`https://portfolio-server-mocha-omega.vercel.app/api/project/${id}`)
        const project = response.data.data
        
        reset({
          title: project.title,
          description: project.description,
          technologies: project.technologies.join(', '),
          isFeatured: project.isFeatured,
          existingThumbnail: project.thumbnail,
          tags: project.tags?.join(', ') || ''
        })
        
        if (project.thumbnail) {
          setThumbnailPreview(project.thumbnail)
        }
      } catch (error) {
        console.error('Error fetching project:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProject()
  }, [id, reset])

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      let thumbnailUrl = data.existingThumbnail || ''
      
      // Upload new thumbnail if provided
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
        tags: data.tags ? data.tags.split(',').map(tag => tag.trim()) : []
      }

      // Update project
      await axios.patch(`https://portfolio-server-mocha-omega.vercel.app/api/project/${id}`, projectData)
      
        toast.success('Project updated successfully!')
      router.push('/dashboard/project')
    } catch (error) {
      console.error('Error updating project:', error)
        toast.error('Failed to update project. Please try again.')
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

  if (isLoading) return <div className="max-w-4xl mx-auto p-6">Loading project data...</div>

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Edit Project</h1>
        <Link 
          href="/dashboard/project" 
          className="text-gray-500 hover:text-gray-700"
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
              Thumbnail
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('thumbnailFile')}
              onChange={handleThumbnailChange}
            />
            {thumbnailPreview && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Preview:</p>
                <Image 
                  src={thumbnailPreview} 
                    width={128}
                    height={128}
                  alt="Thumbnail preview" 
                  className="h-32 w-32 object-cover rounded"
                />
              </div>
            )}
            <input type="hidden" {...register('existingThumbnail')} />
            {!thumbnailPreview && (
              <p className="text-sm text-gray-500 mt-2">Current thumbnail will be kept if no new file is selected</p>
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
          <div className="flex justify-end gap-4">
            <Link
              href="/dashboard/project"
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 rounded-lg text-white ${isSubmitting ? 'bg-blue-400' : 'bg-blue-500 hover:bg-blue-600'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              {isSubmitting ? 'Updating...' : 'Update Project'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}