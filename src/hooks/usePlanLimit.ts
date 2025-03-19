
import { useState } from 'react';
import { checkBasicPlanLimit, BasicPlanLimits } from '../utils/PlanLimits';
import { useAuth } from '../contexts/AuthContext';

export const usePlanLimit = (feature: keyof BasicPlanLimits) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const checkLimit = async () => {
    if (!user) return false;
    
    setIsLoading(true);
    const canProceed = await checkBasicPlanLimit(user.id, feature);
    setIsLoading(false);
    
    return canProceed;
  };

  return { checkLimit, isLoading };
};
