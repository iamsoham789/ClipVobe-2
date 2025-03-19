import React, { useState } from 'react';
import { Home, Copy } from 'lucide-react';
import { Button } from '../ui/button';
import { useToast } from '../../hooks/use-toast';
import { supabase } from '../../integrations/supabase/client';

const TitleGenerator: React.FC<{
  handleNavigation: (itemId: string, subItemId?: string) => void;
}> = ({ handleNavigation }) => {
  const [contentType, setContentType] = useState('YouTube Video');
  const [topic, setTopic] = useState('');
  const [titles, setTitles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateContent = async () => {
    setIsLoading(true);

    try {
      if (!topic.trim()) {
        throw new Error('Please enter a topic');
      }

      const result = await supabase.functions.invoke('generate-titles', {
        body: { topic, type: contentType },
      });

      if (result.error) throw new Error(result.error.message);

      if (result.data?.titles) {
        setTitles(result.data.titles);
        toast({
          title: 'Titles Generated',
          description: `Generated ${result.data.titles.length} title suggestions`,
        });
      }
    } catch (error: any) {
      console.error('Error in title generation:', error);
      toast({
        title: 'Generation Failed',
        description: error.message || 'Failed to generate titles',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied to clipboard',
      description: 'Content has been copied to your clipboard',
    });
  };

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className="flex items-center mb-2">
        <button onClick={() => handleNavigation('dashboard')} className="text-gray-400 hover:text-white mr-2">
          <Home size={16} />
        </button>
        <span className="text-gray-500 mx-2">/</span>
        <span className="text-gray-500 mr-2">Generate Content</span>
        <span className="text-gray-500 mx-2">/</span>
        <span className="text-white">Title Generator</span>
      </div>

      {/* Dynamic Heading */}
      <h2 className="text-2xl font-bold text-white">
        AI-Generated {contentType} Titles
      </h2>
      <p className="text-gray-300">
        Enter a topic and get catchy, SEO friendly {contentType.toLowerCase()} title suggestions.
      </p>

      {/* Input Fields */}
      <div className="glass-card p-6 rounded-xl space-y-4">
        <div className="space-y-2">
          {/* Content Type Dropdown */}
          <label htmlFor="content-type" className="text-white font-medium">
            Content Type:
          </label>
          <select
            id="content-type"
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-clipvobe-cyan"
          >
            <option value="YouTube Video">YouTube Video</option>
            <option value="Blog Post">Blog Post</option>
            <option value="Instagram Post">Instagram Post</option>
            <option value="LinkedIn Post">LinkedIn Post</option>
            <option value="Reddit Post">Reddit Post</option>
          </select>
        </div>

        {/* Topic Input */}
        <div className="space-y-2">
          <label htmlFor="topic" className="text-white font-medium">
            Topic:
          </label>
          <input
            id="topic"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="E.g., Artificial Intelligence, Cooking, Gaming..."
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-clipvobe-cyan"
          />
        </div>

        {/* Generate Button */}
        <Button
          onClick={generateContent}
          disabled={!topic.trim() || isLoading}
          isLoading={isLoading}
          className="w-full"
        >
          Generate Titles
        </Button>
      </div>

      {/* Generated Titles */}
      {titles.length > 0 && (
        <div className="glass-card p-6 rounded-xl">
          <h3 className="text-white font-semibold mb-4">Generated Titles:</h3>
          <ul className="space-y-3">
            {titles.map((title, idx) => (
              <li key={idx} className="flex items-start justify-between p-3 bg-gray-800 rounded-lg group hover:bg-gray-700 transition-colors">
                <span className="text-white">{title}</span>
                <button
                  onClick={() => copyToClipboard(title)}
                  className="text-gray-400 hover:text-clipvobe-cyan opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Copy size={18} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TitleGenerator;
