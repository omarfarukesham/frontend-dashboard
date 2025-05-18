// import BlogsCard from '@/components/shared/BlogsCard';
import BlogsCard from '@/components/BlogCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blogs',
  description: 'Stay updated with the latest blogs and articles.',
};


interface Blog {
    _id: string;
    title: string;
    content: string;
    image: string;
    author: {
      name: string;
    }
    name: string;
    createdAt: string;
    comments?: number;
  }

const fetchBlogs = async (): Promise<Blog[]> => {
  const res = await fetch('https://assignment-3-gray-seven.vercel.app/api/blogs', {
    cache: 'no-store',
  });
  const { data } = await res.json();
  return data;
};

const BlogsPage = async () => {
  const blogs = await fetchBlogs();
  

  return (
    <div className="mx-auto p-6 bg-gray-100 w-full">
      <h1 className="text-4xl font-bold mb-8 text-center text-black">Latest Blogs{blogs.length}</h1>
      <BlogsCard blogs={blogs} />
    </div>
  );
};

export default BlogsPage;

