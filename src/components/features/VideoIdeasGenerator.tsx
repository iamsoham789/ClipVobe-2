import React, { useState } from 'react';
import { Home, Copy } from 'lucide-react';
import { Button } from '../ui/button';
import { useToast } from '../../hooks/use-toast';
import { supabase } from '../../integrations/supabase/client';

const IdeaGenerator: React.FC<{
  handleNavigation: (itemId: string, subItemId?: string) => void;
}> = ({ handleNavigation }) => {
  const [contentType, setContentType] = useState('YouTube Video');
  const [topic, setTopic] = useState('');
  const [ideas, setIdeas] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateIdeas = async () => {
    setIsLoading(true);

    try {
      if (!topic.trim()) {
        throw new Error('Please enter a topic');
      }

      const result = await supabase.functions.invoke('generate-ideas', {
        body: { topic, type: contentType },
      });

      if (result.error) throw new Error(result.error.message);

      if (result.data?.ideas) {
        setIdeas(result.data.ideas);
        toast({
          title: 'Ideas Generated',
          description: 'AI-generated content ideas are ready.',
        });
      }
    } catch (error: any) {
      console.error('Error in idea generation:', error);
      toast({
        title: 'Generation Failed',
        description: error.message || 'Failed to generate content ideas',
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
      description: 'Content ideas have been copied to your clipboard',
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
        <span className="text-white">Idea Generator</span>
      </div>

      {/* Dynamic Heading */}
      <h2 className="text-2xl font-bold text-white">
        AI-Generated {contentType} Ideas
      </h2>
      <p className="text-gray-300">
        Enter a topic to generate creative and engaging ideas for your {contentType.toLowerCase()}.
      </p>

      {/* Input Fields */}
      <div className="glass-card p-6 rounded-xl space-y-4">
        {/* Content Type Dropdown */}
        <div className="space-y-2">
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
            <option value="Instagram Video">Instagram Video</option>
            <option value="Blog Post">Blog Post</option>
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
            placeholder={`E.g., Fitness tips, AI tools, Travel destinations...`}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-clipvobe-cyan"
          />
        </div>

        {/* Generate Button */}
        <Button
          onClick={generateIdeas}
          disabled={!topic.trim() || isLoading}
          isLoading={isLoading}
          className="w-full"
        >
          Generate Ideas
        </Button>
      </div>

      {/* Generated Ideas */}
      {ideas && (
        <div className="glass-card p-6 rounded-xl">
          <h3 className="text-white font-semibold mb-4">Generated Ideas:</h3>
          <ul className="space-y-2">
            {ideas.map((idea, index) => (
              <li key={index} className="flex items-start justify-between p-3 bg-gray-800 rounded-lg group hover:bg-gray-700 transition-colors">
                <span className="text-white">{idea}</span>
                <button
                  onClick={() => copyToClipboard(idea)}
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

export default IdeaGenerator;
