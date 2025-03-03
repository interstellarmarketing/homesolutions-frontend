import { atom } from "nanostores";
import type { ShortTradeEnum } from "@assets/info/estimateOptions";

// Define the steps for each estimate type
export const estimateSteps = {
    // Roofing flow steps (9 steps total as per getTotalSteps)
    roofing: [
        "zip",
        "project-details",
        "action",
        "home-type",
        "credit-score",
        "address",
        "email",
        "phone-number",
        "contact",
        "finalize",
        "thank-you",
    ],
    // Default flow steps (5 steps total as per getTotalSteps)
    bathroom: [
        "zip",
        "action",
        "project-details",
        "address",
        "contact",
        "finalize",
        "thank-you",
    ],
    siding: [
        "zip",
        "action",
        "project-details",
        "address",
        "contact",
        "finalize",
        "thank-you",
    ],
    windows: [
        "zip",
        "action",
        "project-details",
        "address",
        "contact",
        "finalize",
        "thank-you",
    ],
};

// Interface for the estimate steps store
export interface EstimateStepsState {
    currentStep: string;
    estimateType: ShortTradeEnum | null;
}

// Create the estimate steps store
export const estimateStepsStore = atom<EstimateStepsState>({
    currentStep: "zip",
    estimateType: null,
});

// Helper function to get the current step index
export const getCurrentStepIndex = (estimateType: ShortTradeEnum, currentStep: string): number => {
    if (!estimateType || !estimateSteps[estimateType]) {
        return 0;
    }

    const index = estimateSteps[estimateType].indexOf(currentStep);
    return index >= 0 ? index : 0;
};

// Helper function to get the next step
export const getNextStep = (estimateType: ShortTradeEnum, currentStep: string): string | null => {
    if (!estimateType || !estimateSteps[estimateType]) {
        return null;
    }

    const currentIndex = getCurrentStepIndex(estimateType, currentStep);
    const nextIndex = currentIndex + 1;

    if (nextIndex < estimateSteps[estimateType].length) {
        return estimateSteps[estimateType][nextIndex];
    }

    return null;
};

// Helper function to get the previous step
export const getPreviousStep = (estimateType: ShortTradeEnum, currentStep: string): string | null => {
    if (!estimateType || !estimateSteps[estimateType]) {
        return null;
    }

    const currentIndex = getCurrentStepIndex(estimateType, currentStep);
    const prevIndex = currentIndex - 1;

    if (prevIndex >= 0) {
        return estimateSteps[estimateType][prevIndex];
    }

    return null;
};

// Helper function to get the total steps (to replace getTotalSteps from utils/layout.ts)
export const getTotalSteps = (estimateType: ShortTradeEnum): number => {
    if (!estimateType || !estimateSteps[estimateType]) {
        return 5; // Default as per the original implementation
    }

    // Subtract thank-you page from total count since it's not part of the step progress
    return estimateSteps[estimateType].length - 1;
};

// Helper function to get the current step number (1-based index)
export const getCurrentStepNumber = (estimateType: ShortTradeEnum, currentStep: string): number => {
    const index = getCurrentStepIndex(estimateType, currentStep);
    // Add 1 to convert from 0-based to 1-based index
    return index + 1;
}; 