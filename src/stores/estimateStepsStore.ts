import type { ShortTradeEnum } from "@models/estimateOptions";
import { persistentAtom } from '@nanostores/persistent';

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