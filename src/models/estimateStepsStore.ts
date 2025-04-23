import type { ShortTradeEnum } from "./estimateOptions";

// Interface for the estimate steps store
export interface EstimateStepsState {
    currentStep: string | null;
    estimateType: ShortTradeEnum | null;
}
