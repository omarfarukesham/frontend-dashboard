import Image from 'next/image';
import Link from 'next/link';
import { FaUser, FaCalendar } from 'react-icons/fa';

interface Blog {
  _id: string;
  title: string;
  content: string;
  image?: string;
  author: {
    name: string;
  };
  name: string;
  createdAt: string;
  comments?: number;
}

interface BlogCardProps {
  blogs: Blog[];
}

const BlogCard = ({ blogs }: BlogCardProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4">
      {blogs.map((blog) => (
        <article 
          key={blog._id} 
          className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300"
        >
          <Link href={`/blogs/${blog._id}`}>
            {blog?.image && (
              <div className="relative h-48 w-full">
                <Image
                  src={blog?.image}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}
            
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                {blog.title}
              </h2>
              
              <p className="text-gray-600 mb-4 line-clamp-3">
                {blog.content}
              </p>
              
              <div className="flex items-center text-sm text-gray-500 space-x-4">
                <div className="flex items-center">
                  <FaUser className="mr-2" />
                  <span>{blog.author.name}</span>
                </div>
                
                <div className="flex items-center">
                  <FaCalendar className="mr-2" />
                  <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                </div>
                
                
              </div>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
};

export default BlogCard;