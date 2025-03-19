import { features } from 'process';
import React, { useState } from 'react';

const Pricing = () => {
  // Example FAQ Data
  const faqData = [
    {
      question: 'What is included in the Free Plan?',
      answer: 'Limited access to AI tools, perfect for trying out the service.',
    },
    {
      question: 'Can I upgrade my Plan anytime?',
      answer: 'Yes, you can manage your plan settings easily from your account dashboard.',
    },
    {
      question: 'Is there a money-back guarantee?',
      answer: 'Yes, all plans come with a 3-day money-back guarantee.',
    },
    // Add more FAQs here...
  ];

  // Example Matrix Table Data
  const matrixData = [
    {
      feature: 'AI Video Titles',
      free: '5 titles (1 request)',
      basic: '40 titles (8 requests)',
      pro: '100 titles (20 requests)',
      creator: '250 titles (50 requests)',
    },
    {
      feature: 'AI Video Descriptions',
      free: '1 description (1 request)',
      basic: '10 descriptions (10 requests)',
      pro: '30 descriptions (30 requests)',
      creator: '80 descriptions (80 requests)',
    },
    {
      feature: 'AI Hashtag and Tag Generator',
      free: '5–10 hashtags (1 request)',
      basic: '10 sets (10 requests)',
      pro: '25 sets (25 requests)',
      creator: '60 sets (60 requests)',
    },
    {
      feature: 'AI Idea Finder',
      free: '5 ideas (1 request)',
      basic: '10 ideas (2 requests)',
      pro: '25 ideas (5 requests)',
      creator: '60 ideas (12 requests)',
    },
    {
      feature: 'AI Tweet Generator',
      free: '1 tweet (1 request)',
      basic: '5 tweets (5 requests)',
      pro: '12 tweets (12 requests)',
      creator: '30 tweets (30 requests)',
    },
    {
      feature: 'AI LinkedIn Post Generator',
      free: '1 post (1 request)',
      basic: '5 posts (5 requests)',
      pro: '12 posts (12 requests)',
      creator: '30 posts (30 requests)',
    },
    {
      feature: 'AI Reddit Post Generator',
      free: '1 post (1 request)',
      basic: '5 posts (5 requests)',
      pro: '12 posts (12 requests)',
      creator: '30 posts (30 requests)',
    },
    {
      feature: 'AI YouTube Community Post Generator',
      free: '1 post (1 request)',
      basic: '5 posts (5 requests)',
      pro: '12 posts (12 requests)',
      creator: '30 posts (30 requests)',
    },
    {
      feature: 'AI Script Generator (Small, Medium, Large)',
      free: '-',
      basic: '2 scripts (2 requests)',
      pro: '5 scripts (5 requests)',
      creator: '15 scripts (15 requests)',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white py-10 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4"></h2>
        <p className="text-gray-400 mb-12"></p>

        {/* Pricing Cards Section */}
        <div className="relative py-15 overflow-hidden bg-black">
          {/* Background Elements with Cyberpunk Glow */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-cyan-400/10 blur-[100px] rounded-full animate-float"
              style={{ animationDelay: '0.5s' }}
            ></div>
            <div
              className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-pink-500/10 blur-[100px] rounded-full animate-float"
              style={{ animationDelay: '1s' }}
            ></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.05)_0,transparent_60%)]"></div>
          </div>

          {/* Grid Overlay for Cyberpunk Effect */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

          <div className="container relative z-10 mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Choose Your <span className="text-cyan-400">Perfect Plan</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                All plans include a 3-day money-back guarantee.
              </p>
            </div>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Free Plan */}
              <div className="relative bg-black/40 p-8 rounded-xl border border-cyan-400/40 shadow-lg shadow-cyan-400/20 hover:shadow-cyan-400/40 transition-transform hover:scale-105 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                <h3 className="text-2xl font-semibold text-white mb-4">Free Plan</h3>
                <p className="text-4xl font-bold text-white mb-2">
                  $0 <span className="text-lg font-normal text-gray-400">/month</span>
                </p>
                <p className="text-gray-400 mb-6">Just Try</p>
                <ul className="space-y-3 mb-6 text-left text-gray-300">
                  <li> Limited Access To AI Video Titles</li>
                  <li> Limited Access To AI Video Descriptions</li>
                  <li> Limited Access To Hashtag and Tags Generator</li>
                  <li> Limited Access To Script Generator</li>
                  <li> Limited Access To Idea Finder</li>
                  <li> No Access To Multi-Platform Generation</li>
                </ul>
                <button className="w-full border border-cyan-400 text-cyan-400 py-2 rounded-lg hover:bg-cyan-400 hover:text-black transition duration-300">
                  Get Started
                </button>
              </div>

              {/* Basic Plan */}
              <div className="relative bg-black/40 p-8 rounded-xl border border-pink-500/40 shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40 transition-transform hover:scale-105 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-pink-500 text-black px-9 rounded-full text-sm font-semibold"></div>
                <h3 className="text-2xl font-semibold text-white mb-4">Basic</h3>
                <p className="text-4xl font-bold text-white mb-2">
                  $5 <span className="text-lg font-normal text-gray-400">/month</span>
                </p>
                <p className="text-gray-400 mb-6">For Hobbyists and New Creators</p>
                <ul className="space-y-3 mb-6 text-left text-gray-300">
                  <li> Access To AI Video Titles</li>
                  <li> Access To AI Video Descriptions</li>
                  <li> Access To Hashtag and Tags Generator</li>
                  <li> Access To Script Generator</li>
                  <li> Access To Idea Finder</li>
                  <li> Limited Access To Multi-Platform Generation</li>
                </ul>
                <button className="w-full bg-pink-500 text-black py-2 rounded-lg hover:bg-pink-600 transition duration-300">
                  Get Started
                </button>
              </div>

              {/* Pro Plan */}
              <div className="relative bg-black/40 p-8 rounded-xl border border-purple-500/40 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-transform hover:scale-105 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                <h3 className="text-2xl font-semibold text-white mb-4">Pro</h3>
                <p className="text-4xl font-bold text-white mb-2">
                  $15 <span className="text-lg font-normal text-gray-400">/month</span>
                </p>
                <p className="text-gray-400 mb-6">For Professional Creators</p>
                <ul className="space-y-3 mb-6 text-left text-gray-300">
                  <li> Complete Access To AI Video Titles</li>
                  <li> Complete Access To AI Video Descriptions</li>
                  <li> Complete Access To Hashtag and Tags Generator</li>
                  <li> Complete Access To Script Generator</li>
                  <li> Complete Access To Idea Finder</li>
                  <li> Complete Access To Multi-Platform Post Generator</li>
                  <li> ✅ Tweet Generator</li>
                  <li> ✅ Reddit Post Generator</li>
                  <li> ✅ LinkedIn Post Generator</li>
                  <li> ✅ YouTube Community Post Generator</li>
                
                </ul>
                <button className="w-full border border-purple-500 text-purple-500 py-2 rounded-lg hover:bg-purple-500 hover:text-black transition duration-300">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Matrix Table */}
        <div className="mt-16">
          <h2 className="text-3xl font-semibold mb-8">Generations Per Request/ Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left table-auto">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-700">Feature</th>
                  <th className="py-2 px-4 border-b border-gray-700">Free</th>
                  <th className="py-2 px-4 border-b border-gray-700">Basic</th>
                  <th className="py-2 px-4 border-b border-gray-700">Pro</th>
                </tr>
              </thead>
              <tbody>
                {matrixData.map((item, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b border-gray-700">{item.feature}</td>
                    <td className="py-2 px-4 border-b border-gray-700">{item.free}</td>
                    <td className="py-2 px-4 border-b border-gray-700">{item.basic}</td>
                    <td className="py-2 px-4 border-b border-gray-700">{item.pro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQs */}
        <div className="mt-16">
          <h2 className="text-3xl font-semibold mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqData.map((faq, index) => {
              const [isOpen, setIsOpen] = useState(false);
              return (
                <div key={index} className="border border-gray-700 p-4 rounded-lg">
                  <h3
                    className="font-semibold cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    {faq.question}
                  </h3>
                  {isOpen && <p className="text-gray-400 mt-2">{faq.answer}</p>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 py-8 border-t border-gray-700">
          <p className="text-center text-gray-400">
            &copy; {new Date().getFullYear()} ClipVobe. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Pricing;