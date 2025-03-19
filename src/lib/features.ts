
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
