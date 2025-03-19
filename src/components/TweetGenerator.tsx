import { useToast } from '@chakra-ui/react';
import { usePlanLimit } from './planLimits'; // Assuming this file contains the usePlanLimit hook

const TweetGenerator = () => {
  const toast = useToast();
  const { checkLimit, isLoading: checkingLimit } = usePlanLimit('tweetGenerator');

  const handleGenerate = async () => {
    const canProceed = await checkLimit();
    if (!canProceed) {
      toast({
        title: "Usage Limit Reached",
        description: "You've reached your Basic Plan limit for tweet generation. Please upgrade to continue.",
        variant: "destructive"
      });
      return;
    }
    // ...rest of your tweet generation logic...
  };

  return (
    <div>
      {/* ...rest of your component JSX... */}
      <button onClick={handleGenerate} disabled={checkingLimit}>
        Generate Tweet
      </button>
    </div>
  );
};

export default TweetGenerator;


// planLimits.js
import { useState, useEffect } from 'react';

const planLimits = {
  basic: {
    tweetGenerator: 10, // Example limit: 10 tweets
  },
};

const usePlanLimit = (generatorType) => {
  const [limit, setLimit] = useState(null);
  const [usage, setUsage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLimit = async () => {
      //Simulate fetching from database or server. Replace with actual data fetching
      const userPlan = 'basic'; // Replace with actual user plan retrieval
      const currentLimit = planLimits[userPlan][generatorType];
      setLimit(currentLimit);
      const storedUsage = 0; //Replace with actual usage retrieval from storage.
      setUsage(storedUsage);
      setIsLoading(false);
    };
    fetchLimit();
  }, []);

  const checkLimit = async () => {
    if (isLoading || limit === null || usage === null){
      return false;
    }
    if (usage < limit) {
      //Update usage after successful generation
      setUsage(usage + 1);
      //Persist usage update. Replace with actual storage mechanism.
      return true;
    }
    return false;
  };

  return { checkLimit, isLoading };
};

export { usePlanLimit };