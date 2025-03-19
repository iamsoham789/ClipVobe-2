import React, { useState } from 'react';
import { Home, Copy } from 'lucide-react';
import { Button } from '../ui/button';
import { useToast } from '../../hooks/use-toast';

const LinkedInPostGenerator: React.FC<{
  handleNavigation: (itemId: string, subItemId?: string) => void;
}> = ({ handleNavigation }) => {
  const [postTopic, setPostTopic] = useState('');
  const [generatedPost, setGeneratedPost] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English'); // Default language
  const { toast } = useToast();

  // Supported languages
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi' },
    { code: 'ru', name: 'Russian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
  ];

  const generatePost = async () => {
    setIsLoading(true);

    try {
      if (!postTopic.trim()) {
        throw new Error('Please enter a topic or message');
      }

      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('Gemini API key is missing. Check your .env file.');
      }

      const prompt = `Generate a professional LinkedIn post about "${postTopic}" in ${selectedLanguage} language, focusing on thought leadership or industry insights, max 3000 characters (LinkedIn post limit).`;
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { maxOutputTokens: 3000, temperature: 0.7 },
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API request failed with status ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
        throw new Error('No post data returned from the API');
      }

      const post = data.candidates[0].content.parts[0].text.trim();
      if (post.length > 3000) {
        throw new Error('Generated post exceeds 3000 characters. Please try again.');
      }

      setGeneratedPost(post);
      toast({
        title: 'Post Generated',
        description: `A LinkedIn post has been successfully generated in ${selectedLanguage}`,
      });
    } catch (error: any) {
      console.error('Error in post generation:', error);
      toast({
        title: 'Generation Failed',
        description: error.message || 'Failed to generate post. Check the console for details.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (generatedPost) {
      navigator.clipboard.writeText(generatedPost);
      toast({
        title: 'Copied to clipboard',
        description: 'Post copied to your clipboard',
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center mb-2">
        <button onClick={() => handleNavigation('dashboard')} className="text-gray-400 hover:text-white mr-2">
          <Home size={16} />
        </button>
        <span className="text-gray-500 mx-2">/</span>
        <span className="text-gray-500 mr-2">Multi-Platform Post Generator</span>
        <span className="text-gray-500 mx-2">/</span>
        <span className="text-white">LinkedIn Post Generator</span>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-white">AI-Generated LinkedIn Posts</h2>
      <p className="text-gray-300">Enter a topic and get professional LinkedIn post suggestions (max 3000 characters).</p>

      {/* Input Section */}
      <div className="glass-card p-6 rounded-xl space-y-4">
        <div className="space-y-2">
          <label htmlFor="post-topic" className="text-white font-medium">
            Post Topic or Message:
          </label>
          <input
            id="post-topic"
            type="text"
            value={postTopic}
            onChange={(e) => setPostTopic(e.target.value)}
            placeholder="E.g., Leadership tips, Industry trends, Career advice..."
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-clipvobe-cyan"
          />
        </div>

        {/* Language Selection */}
        <div className="space-y-2">
          <label htmlFor="language" className="text-white font-medium">
            Language:
          </label>
          <select
            id="language"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-clipvobe-cyan"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.name}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <Button 
          onClick={generatePost} 
          disabled={!postTopic.trim() || isLoading}
          isLoading={isLoading}
          className="w-full"
        >
          Generate Post
        </Button>
      </div>

      {/* Output Section */}
      {generatedPost && (
        <div className="glass-card p-6 rounded-xl">
          <h3 className="text-white font-semibold mb-4">Generated LinkedIn Post:</h3>
          <div className="flex items-start justify-between p-3 bg-gray-800 rounded-lg group hover:bg-gray-700 transition-colors">
            <span className="text-white">{generatedPost}</span>
            <button 
              onClick={copyToClipboard}
              className="text-gray-400 hover:text-clipvobe-cyan opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Copy size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkedInPostGenerator;