export type YeeterItem = {
  id: string;
  createdAt: string;
  dao: {
    id: string;
  };
  endTime: string;
  startTime: string;
  isShares: boolean;
  multiplier: string;
  minTribute: string;
  goal: string;
  balance: string;
  yeetCount: string;
  isActive: boolean;
  isEnded: boolean;
  isComingSoon: boolean;
  isFull: boolean;
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
