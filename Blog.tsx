import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { title } from "node:process";

// Define TypeScript interface for blog posts
interface BlogPost {
  id: number;
  category: string[];
  title: string;
  description: string;
  author: string;
  date: string;
  image: string;
  fullContent?: string;
}

// Blog posts data
const blogPosts: BlogPost[] = [
  {
    id: 1,
    category: ["", ""],
    title: "Under Construction",
    description:
      "Under Construction: Our blog is being built. We can't wait to share our stories, tips, and news with you soon!",
    author: "Sarvagya Gupta",
    date: "15 Feb 2024",
    image: "https://plus.unsplash.com/premium_photo-1721955487786-76802cbf0812?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    fullContent: `"We're sorry, but our blog isn't quite ready yet. We're busy crafting amazing content for you. Check back soon!"
`,
  },
  

];

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Render the full blog post view
  const renderFullPost = (post: BlogPost) => (
    <div className="max-w-5xl mx-auto py-6 animate-fadeIn">
      <button
        onClick={() => setSelectedPost(null)}
        className="mb-6 bg-transparent border border-white text-white px-4 py-2 rounded-full hover:bg-white hover:text-black transition-colors duration-300 shadow-md"
      >
        ← Back to Blog List
      </button>
      <div className="bg-[#111] rounded-xl p-6 shadow-lg flex flex-col gap-6">
        <div>
          <div className="flex gap-3 mb-4">
            {post.category.map((cat) => (
              <span key={cat} className="text-sm font-medium text-gray-400">
                {cat}
              </span>
            ))}
          </div>
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        </div>
        <div className="text-gray-300 leading-relaxed">
          <div dangerouslySetInnerHTML={{ __html: post.fullContent || "Full content coming soon!" }} />
        </div>
        <div className="flex items-center gap-3 text-gray-500 text-sm mt-4">
          <span>{post.author}</span>
          <span>•</span>
          <span>{post.date}</span>
        </div>
      </div>
    </div>
  );

  // Render the blog post list view
  const renderBlogList = () => (
    <div className="max-w-5xl mx-auto animate-fadeIn">
      <h1 className="text-3xl font-bold mb-4 text-center">Blog Posts</h1>
      <p className="text-gray-400 text-center mb-8">
        Discover the latest insights and tutorials.
      </p>
      <div className="grid gap-6">
        {blogPosts.map((post) => (
          <Card
            key={post.id}
            className="cursor-pointer transition-transform transform hover:scale-105"
            onClick={() => setSelectedPost(post)}
          >
            <CardContent className="p-4">
              <div className="flex flex-col gap-3">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-md"
                />
                <div className="flex gap-2">
                  {post.category.map((cat) => (
                    <span
                      key={cat}
                      className="text-xs font-semibold text-gray-500 bg-gray-800 px-2 py-1 rounded-full"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
                <h2 className="text-xl font-bold">{post.title}</h2>
                <p className="text-gray-400">{post.description}</p>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <span>{post.author}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      {selectedPost ? renderFullPost(selectedPost) : renderBlogList()}
    </div>
  );
}
