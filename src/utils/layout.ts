import { getTotalSteps as getStoreSteps } from "src/consts/estimateSteps";
import type { ShortTradeEnum } from "@assets/info/estimateOptions";

export const getTotalSteps = (estimateType: string) => {
  return getStoreSteps(estimateType as ShortTradeEnum);
};
