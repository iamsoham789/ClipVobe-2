
export interface BasicPlanLimits {
  videoTitles: { limit: 40, requests: 8 },
  videoDescriptions: { limit: 10, requests: 10 },
  hashtagGenerator: { limit: 10, requests: 10 },
  ideaFinder: { limit: 10, requests: 2 },
  tweetGenerator: { limit: 5, requests: 5 },
  linkedinPosts: { limit: 5, requests: 5 },
  redditPosts: { limit: 5, requests: 5 },
  youtubeCommunityPosts: { limit: 5, requests: 5 },
  scriptGenerator: { limit: 2, requests: 2 }
}

export const checkBasicPlanLimit = async (userId: string, feature: keyof BasicPlanLimits) => {
  try {
    const { data: usage } = await supabase
      .from('user_usage')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (!usage || usage[feature] < BasicPlanLimits[feature].requests) {
      // Increment usage
      await supabase.from('user_usage').upsert({
        user_id: userId,
        [feature]: (usage?.[feature] || 0) + 1
      });
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error checking plan limits:', error);
    return false;
  }
};
