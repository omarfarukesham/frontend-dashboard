'use client';
import Link from 'next/link'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Image from 'next/image'
import LoadingPage from '@/app/loading';

type Project = {
  _id: string
  title: string
  description: string
  technologies: string[]
  thumbnail: string
  isFeatured: boolean
  createdAt: string
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await axios.get('https://portfolio-server-mocha-omega.vercel.app/api/project')
      setProjects(response.data.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching projects:', error)
      setLoading(false)
    }
  }

  const deleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return
    try {
      await axios.delete(`https://portfolio-server-mocha-omega.vercel.app/api/project/${id}`)
      setProjects(projects.filter(project => project._id !== id))
    } catch (error) {
      console.error('Error deleting project:', error)
    }
  }



  if (loading) return <LoadingPage />

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Link 
          href="/dashboard/addProject"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Project
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Technologies</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Featured</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {projects.map((project) => (
              <tr key={project._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {project.thumbnail && (
                      <div className="flex-shrink-0 h-10 w-10">
                        <Image className="h-10 w-10 rounded" width={20} height={20} src={project.thumbnail} alt={project.title} />
                      </div>
                    )}
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{(project.title).slice(0,20)}</div>
                      
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500 line-clamp-1">{(project.description).slice(0, 20)} ...</div>
                  </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {project.technologies.join(', ')}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${project.isFeatured ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {project.isFeatured ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link 
                    href={`/dashboard/project/${project._id}`}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteProject(project._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}