lib/subscription/types.tsexport type SubscriptionTier = 'free' | 'pro' | 'enterprise';

export interface SubscriptionFeatures {
  videoExport: boolean;
  maxExportDuration: number; // seconds
  customShaders: boolean;
  communityShare: boolean;
  obsIntegration: boolean;
  advancedEffects: boolean;
  prioritySupport: boolean;
}

export const TIER_FEATURES: Record<SubscriptionTier, SubscriptionFeatures> = {
  free: {
    videoExport: false,
    maxExportDuration: 0,
    customShaders: false,
    communityShare: true,
    obsIntegration: false,
    advancedEffects: false,
    prioritySupport: false,
  },
  pro: {
    videoExport: true,
    maxExportDuration: 600, // 10 minutes
    customShaders: true,
    communityShare: true,
    obsIntegration: true,
    advancedEffects: true,
    prioritySupport: false,
  },
  enterprise: {
    videoExport: true,
    maxExportDuration: 3600, // 1 hour
    customShaders: true,
    communityShare: true,
    obsIntegration: true,
    advancedEffects: true,
    prioritySupport: true,
  },
};

export interface UserSubscription {
  tier: SubscriptionTier;
  status: 'active' | 'canceled' | 'past_due';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  stripeCustomerId: string;
}

export function hasFeature(tier: SubscriptionTier, feature: keyof SubscriptionFeatures): boolean {
  return TIER_FEATURES[tier][feature];
}
