import Image from 'next/image';
import { FaUser, FaCalendar, FaClock, FaComments } from 'react-icons/fa';


  const BlogDetails = async ({ params }: { params: Promise<{ blogId: string }> }) => {
    const { blogId } = await params;
    const res = await fetch(`https://assignment-3-gray-seven.vercel.app/api/blogs/${blogId}`, {
      cache: 'no-store',
    });
    const { data: blog } = await res.json();

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {blog.title}
        </h1>
        
        <div className="flex flex-wrap items-center text-gray-600 gap-4 mb-6">
          <div className="flex items-center text-black">
            <FaUser className="mr-2" />
            <span className='text-black'>{blog?.author?.name}</span>
          </div>
          <div className="flex items-center">
            <FaCalendar className="mr-2" />
            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
          </div>
        
            <div className="flex items-center">
              <FaClock className="mr-2" />
              <span>3 min read</span>
            </div>
            <div className="flex items-center">
              <FaComments className="mr-2" />
              <span>{blog.comments} comments</span>
            </div>
         
        </div>
      </header>

      {/* Featured Image */}
      {blog.image && (
        <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-lg max-w-none text-black">
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Author</h2>
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-blue-500 ">
                <Image
                    src="https://randomuser.me/api/portraits    
                    /women/1.jpg"
                    alt="image"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                />
                </div>
                <div>
                <h3 className="text-lg font-semibold text-gray-900">Omar Faruk</h3>
                <p className="text-gray-600">Software Engineer</p>
                </div>
            </div>
        </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Table of Contents</h2>
      </div>

      {/* Comments Section */}
      <section className="mt-12 pt-8 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Comments</h2>
        {/* Add your comments component here */}
      </section>

      {/* Related Posts */}
      <section className="mt-12 pt-8 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Posts</h2>
        {/* Add your related posts component here */}
      </section>
    </article>
  );
}

export default BlogDetails