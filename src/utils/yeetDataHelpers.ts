import { formatValueTo, fromWei, charLimit } from "@daohaus/utils";
import { YeeterItem } from "./types";
import { format, formatDistanceToNow } from "date-fns";
import { MarqueeItem } from "../components/YeetMarquee";
import { STATUS_WINDOW_LENGTH } from "./constants";

export const calcProgressPerc = (a: string, b: string) => {
  let div = Number(a) / Number(b);

  if (div > 0 && div < 0.04) div = 0.04;
  return Number(div) * 100;
};

export const calcDurationPerc = (start: string, end: string) => {
  const now = new Date().getTime() / 1000;
  const yeetDuration = Number(end) - Number(start);
  const currentDuration = Number(end) - Number(now);
  const durationUsed = yeetDuration - currentDuration;

  return (durationUsed / yeetDuration) * 100;
};

export const calcYeetIsActive = (yeeter: YeeterItem) => {
  const now = new Date().getTime() / 1000;

  return Number(yeeter.startTime) < now && Number(yeeter.endTime) > now;
};

export const calcMMIsOver = (endTime: string) => {
  const now = new Date().getTime() / 1000;

  return Number(endTime) < now;
};

export const calcYeetIsEnded = (yeeter: YeeterItem) => {
  const now = new Date().getTime() / 1000;

  return Number(yeeter.endTime) < now;
};

export const calcYeetIsComing = (yeeter: YeeterItem) => {
  const now = new Date().getTime() / 1000;

  return Number(yeeter.startTime) > now;
};

export const calcYeetIsComingSoon = (yeeter: YeeterItem) => {
  const now = new Date().getTime() / 1000;

  return (
    Number(yeeter.startTime) > now &&
    Number(yeeter.startTime) - now <= STATUS_WINDOW_LENGTH
  );
};

export const calcYeetIsNew = (yeeter: YeeterItem) => {
  const now = new Date().getTime() / 1000;
  return now - Number(yeeter.createdAt) < STATUS_WINDOW_LENGTH;
};

export const calcYeetIsEndingSoon = (yeeter: YeeterItem) => {
  const now = new Date().getTime() / 1000;
  return (
    Number(yeeter.endTime) - now > 0 &&
    Number(yeeter.endTime) - now <= STATUS_WINDOW_LENGTH
  );
};

export const calcYeetReachedGoal = (
  safeBalance: string,
  yeeter: YeeterItem
) => {
  return Number(safeBalance) >= Number(yeeter.goal);
};

export const formatTimeRemaining = (yeeter: YeeterItem) => {
  return formatDistanceToNow(new Date(Number(yeeter.endTime) * 1000), {
    addSuffix: true,
  });
};

export const formatTimeRemainingShort = (yeeter: YeeterItem) => {
  return formatDistanceToNow(new Date(Number(yeeter.endTime) * 1000), {
    addSuffix: true,
    includeSeconds: true,
  });
};

export const formatTimeUntilPresale = (yeeter: YeeterItem) => {
  return formatDistanceToNow(new Date(Number(yeeter.startTime) * 1000), {
    addSuffix: true,
    includeSeconds: true,
  });
};

export const formatMinContribution = (yeeter: YeeterItem) => {
  return formatValueTo({
    value: fromWei(yeeter.minTribute),
    decimals: 5,
    format: "number",
  });
};

export const formatMemberBalance = (balance: string) => {
  return formatValueTo({
    value: fromWei(balance),
    decimals: 5,
    format: "number",
  });
};

export const formatLootForMin = (yeeter: YeeterItem) => {
  const loot = BigInt(yeeter.minTribute) * BigInt(yeeter.multiplier);
  return formatValueTo({
    value: fromWei(loot.toString()),
    decimals: 5,
    format: "number",
  });
};

export const formatLootForMinSimple = (
  minTribute: string,
  multiplier: string
) => {
  const loot = BigInt(minTribute) * BigInt(multiplier);
  return formatValueTo({
    value: fromWei(loot.toString()),
    decimals: 5,
    format: "number",
  });
};

export const formatLootForAmount = (yeeter: YeeterItem, amount: string) => {
  const loot = BigInt(amount) * BigInt(yeeter.multiplier);
  return formatValueTo({
    value: fromWei(loot.toString()),
    decimals: 5,
    format: "number",
  });
};

export const formatMarqueeData = (item: MarqueeItem) => {
  if (item.amount && item.verb === "exited") {
    return `${formatValueTo({
      value: fromWei(item.amount),
      decimals: 3,
      format: "numberShort",
    })} ${item.symbol} ${item.verb}`;
  }
  if (item.amount) {
    return `${formatValueTo({
      value: fromWei(item.amount),
      decimals: 3,
      format: "numberShort",
    })} ETH ${item.verb} ${item.symbol} ${
      item.description ? ` - ${charLimit(item.description, 20)}` : ""
    }`;
  } else {
    return `${item.verb} ${item.symbol} ${
      item.description ? ` - ${charLimit(item.description, 20)}` : ""
    }`;
  }
};

export const calcPercToGoal = (yeeter: YeeterItem) => {
  if (Number(yeeter.goal) === 0) return null;
  if (Number(yeeter.safeBalance) > Number(yeeter.goal)) return `goal met`;
  return `${(Number(yeeter.safeBalance) / Number(yeeter.goal)) * 100}% to goal`;
};

export const getCampaignStatus = (
  yeeter: YeeterItem,
  executed: boolean,
  canExecute: boolean,
  goalAchieved: boolean
) => {
  // campaign over and executed success
  // campaign over and can be executed
  // campaign over and fail to meet goal
  // campaign active
  // campaign coming soon

  const statusEnum = {
    SUCCESS: "SUCCESS",
    CAN_EXECUTE: "CAN EXECUTE",
    FAIL: "FAIL",
    ACTIVE: "ACTIVE",
    COMING_SOON: "COMING SOON",
  };

  if (yeeter.isEnded) {
    if (executed && goalAchieved) {
      return statusEnum.SUCCESS;
    } else if (goalAchieved && canExecute) {
      return statusEnum.CAN_EXECUTE;
    } else {
      return statusEnum.FAIL;
    }
  }

  if (yeeter.isActive) {
    return statusEnum.ACTIVE;
  }

  if (yeeter.isComing) {
    return statusEnum.COMING_SOON;
  }

  return statusEnum.ACTIVE;
};
