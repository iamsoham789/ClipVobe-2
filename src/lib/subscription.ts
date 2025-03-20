
import { supabase } from './integrations/supabase/client';

export interface Subscription {
  user_id: string;
  plan: 'free' | 'basic' | 'pro';
  start_date: Date;
  end_date: Date;
  active: boolean;
}

export async function createSubscription(userId: string, plan: 'basic'): Promise<boolean> {
  const startDate = new Date();
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + 1);

  const { error } = await supabase
    .from('subscriptions')
    .insert({
      user_id: userId,
      plan: plan,
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
      active: true
    });

  return !error;
}

export async function getCurrentSubscription(userId: string): Promise<Subscription | null> {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .eq('active', true)
    .single();

  if (error || !data) return null;
  return data as Subscription;
}

export async function checkSubscriptionActive(userId: string): Promise<boolean> {
  const subscription = await getCurrentSubscription(userId);
  if (!subscription) return false;
  
  const now = new Date();
  const endDate = new Date(subscription.end_date);
  return now <= endDate;
}
