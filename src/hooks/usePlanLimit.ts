
import { useState } from 'react';
import { checkBasicPlanLimit, BasicPlanLimits } from '../utils/PlanLimits';
import { checkFreePlanAvailability, updateFreePlanUsage } from '../lib/features';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';

export const usePlanLimit = (feature: keyof BasicPlanLimits) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const checkLimit = async () => {
    if (!user) return false;
    
    setIsLoading(true);
    try {
      // Check user's subscription status
      const { data: subscription } = await supabase
        .from('subscriptions')
        .select('plan')
        .eq('user_id', user.id)
        .single();

      if (!subscription) {
        // Free plan logic
        const canProceed = await checkFreePlanAvailability(user.id, feature);
        if (canProceed) {
          await updateFreePlanUsage(user.id, feature);
        }
        return canProceed;
      } else {
        // Paid plan logic
        return await checkBasicPlanLimit(user.id, feature);
      }
    } catch (error) {
      toast.error(error.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { checkLimit, isLoading };
};
