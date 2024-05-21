export type YeeterItem = {
  id: string;
  createdAt: string;
  dao: {
    id: string;
  };
  balance: string;
  safeBalance: string;
  endTime: string;
  startTime: string;
  isShares: boolean;
  multiplier: string;
  minTribute: string;
  goal: string;
  yeetCount: string;
  isActive: boolean;
  isEnded: boolean;
  isComingSoon: boolean;
  reachedGoal: boolean;
  vault: string;
  timeRemaining: string;
};

export type YeeterMetadata = {
  daoId: string;
  icon?: string;
  links?: string[];
  missionStatement?: string;
  projectDetails?: string;
};

export type YeetsItem = {
  amount: string;
  contributor: string;
  createdAt: string;
  id: string;
  message: string;
  shares: string;
};
