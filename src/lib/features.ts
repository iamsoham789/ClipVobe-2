
export interface FeatureLimits {
  videoTitles: number;
  videoDescriptions: number;
  hashtagSets: number;
  ideas: number;
  tweets: number;
  linkedinPosts: number;
  redditPosts: number;
  communityPosts: number;
  scripts: number;
}

export const PRO_PLAN_LIMITS: FeatureLimits = {
  videoTitles: 100,
  videoDescriptions: 30,
  hashtagSets: 25,
  ideas: 25,
  tweets: 12,
  linkedinPosts: 12,
  redditPosts: 12,
  communityPosts: 12,
  scripts: 5
};

export interface FeatureUsage extends FeatureLimits {
  lastResetDate: string;
}

export async function getFeatureUsage(userId: string): Promise<FeatureUsage | null> {
  const { data, error } = await supabase
    .from('feature_usage')
    .select('*')
    .eq('user_id', userId)
    .single();
  
  return data;
}

export async function updateFeatureUsage(
  userId: string, 
  feature: keyof FeatureLimits
): Promise<boolean> {
  const usage = await getFeatureUsage(userId);
  if (!usage) return false;

  const { error } = await supabase
    .from('feature_usage')
    .update({ [feature]: usage[feature] + 1 })
    .eq('user_id', userId);

  return !error;
}

export const FREE_PLAN_LIMITS = {
  videoTitles: 5,
  videoDescriptions: 1,
  hashtagSets: 1,
  ideas: 5,
  tweets: 1,
  linkedinPosts: 1,
  redditPosts: 1,
  communityPosts: 1,
  scripts: 0
};

export async function initializeUsageCounters(userId: string): Promise<boolean> {
  const { error } = await supabase
    .from('feature_usage')
    .insert([{
      user_id: userId,
      videoTitles: 0,
      videoDescriptions: 0,
      hashtagSets: 0,
      ideas: 0,
      tweets: 0,
      linkedinPosts: 0,
      redditPosts: 0,
      communityPosts: 0,
      scripts: 0,
      lastResetDate: new Date().toISOString(),
      plan: 'free',
      hasUsedFreePlan: false
    }]);

  return !error;
}

export async function checkFreePlanAvailability(userId: string, feature: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('feature_usage')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error || !data) return false;

  // If user has already used free plan
  if (data.hasUsedFreePlan) {
    throw new Error('Free plan usage completed. Please upgrade to continue using our services.');
  }

  // Check if within free plan limits
  const currentUsage = data[feature];
  const limit = FREE_PLAN_LIMITS[feature];

  if (currentUsage >= limit) {
    throw new Error(`Free plan limit reached for ${feature}. Please upgrade to continue.`);
  }

  return true;
}

export async function updateFreePlanUsage(userId: string, feature: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('feature_usage')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error || !data) return false;

  const currentUsage = data[feature];
  const updateData = {
    [feature]: currentUsage + 1,
    hasUsedFreePlan: true
  };

  const { error: updateError } = await supabase
    .from('feature_usage')
    .update(updateData)
    .eq('user_id', userId);

  return !updateError;
}

export async function resetMonthlyUsage(userId: string): Promise<boolean> {
  const { error } = await supabase
    .from('feature_usage')
    .update({
      videoTitles: 0,
      videoDescriptions: 0,
      hashtagSets: 0,
      ideas: 0,
      tweets: 0,
      linkedinPosts: 0,
      redditPosts: 0,
      communityPosts: 0,
      scripts: 0,
      lastResetDate: new Date().toISOString()
    })
    .eq('user_id', userId);

  return !error;
}

export async function checkFeatureAvailability(
  userId: string, 
  feature: keyof FeatureLimits
): Promise<boolean> {
  const usage = await getFeatureUsage(userId);
  if (!usage) return false;
  
  return usage[feature] < PRO_PLAN_LIMITS[feature];
}
