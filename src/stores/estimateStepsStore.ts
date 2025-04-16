import { persistentAtom } from '@nanostores/persistent'
import type { ShortTradeEnum } from "@models/estimateOptions";
import posthog from "posthog-js";
import { estimateSteps } from "src/consts";

// Interface for the estimate steps store
export interface EstimateStepsState {
    currentStep: string | null;
    estimateType: ShortTradeEnum | null;
}

// Create the estimate steps store
export const estimateStepsStore = persistentAtom<EstimateStepsState>('estimate-steps-store', {
    currentStep: null,
    estimateType: null,
}, {
    encode: JSON.stringify,
    decode: JSON.parse
});