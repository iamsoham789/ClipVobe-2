import React, { useState } from 'react';
import { Home, Copy } from 'lucide-react';
import { Button } from '../ui/button';
import { useToast } from '../../hooks/use-toast';

const TweetGenerator: React.FC<{
  handleNavigation: (itemId: string, subItemId?: string) => void;
}> = ({ handleNavigation }) => {
  const [tweetTopic, setTweetTopic] = useState('');
  const [generatedTweet, setGeneratedTweet] = useState<string>('');
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

  const generateTweet = async () => {
    setIsLoading(true);

    try {
      if (!tweetTopic.trim()) {
        throw new Error('Please enter a topic');
      }

      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('Gemini API key is missing. Check your .env file.');
      }

      const prompt = `Generate a tweet about "${tweetTopic}" in ${selectedLanguage} language, max 280 characters.`;
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }],
              },
            ],
            generationConfig: {
              maxOutputTokens: 280,
              temperature: 0.7, // Adjust for creativity
            },
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API request failed with status ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
        throw new Error('No tweet data returned from the API');
      }

      const tweet = data.candidates[0].content.parts[0].text.trim();
      if (tweet.length > 280) {
        throw new Error('Generated tweet exceeds 280 characters. Please try again.');
      }

      setGeneratedTweet(tweet);
      toast({
        title: 'Tweet Generated',
        description: `A tweet has been successfully generated in ${selectedLanguage}`,
      });
    } catch (error: any) {
      console.error('Error in tweet generation:', error);
      toast({
        title: 'Generation Failed',
        description: error.message || 'Failed to generate tweet. Check the console for details.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (generatedTweet) {
      navigator.clipboard.writeText(generatedTweet);
      toast({
        title: 'Copied to clipboard',
        description: 'Tweet copied to your clipboard',
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
        <span className="text-white">Tweet Generator</span>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-white">AI-Generated Tweets</h2>
      <p className="text-gray-300">Enter a topic and get engaging tweet suggestions (max 280 characters).</p>

      {/* Input Section */}
      <div className="glass-card p-6 rounded-xl space-y-4">
        <div className="space-y-2">
          <label htmlFor="tweet-topic" className="text-white font-medium">
            Tweet Topic:
          </label>
          <input
            id="tweet-topic"
            type="text"
            value={tweetTopic}
            onChange={(e) => setTweetTopic(e.target.value)}
            placeholder="E.g., AI trends, Travel tips, Life hacks..."
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
          onClick={generateTweet} 
          disabled={!tweetTopic.trim() || isLoading}
          isLoading={isLoading}
          className="w-full"
        >
          Generate Tweet
        </Button>
      </div>

      {/* Output Section */}
      {generatedTweet && (
        <div className="glass-card p-6 rounded-xl">
          <h3 className="text-white font-semibold mb-4">Generated Tweet:</h3>
          <div className="flex items-start justify-between p-3 bg-gray-800 rounded-lg group hover:bg-gray-700 transition-colors">
            <span className="text-white">{generatedTweet}</span>
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

export default TweetGenerator;