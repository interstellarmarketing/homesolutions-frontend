import { defineAction } from 'astro:actions';
import { z } from 'astro/zod';
import { estimateStore, estimateParser, type TrackingParams } from '@stores/estimateProgress';

export const updateTrustedFormParams = defineAction({
    input: z.object({
        certUrl: z.string(),
        pingUrl: z.string(),
    }),
    handler: async (input) => {
        const { certUrl, pingUrl } = input;
        const existingStore = estimateStore.get();

        estimateStore.set({
            ...existingStore,
            trackingParams: {
                ...existingStore.trackingParams,
                trustedFormCertUrl: certUrl,
                trustedFormPingUrl: pingUrl,
            },
        });

        return { success: true };
    },
});

export const updatePosthogPersonId = defineAction({
    input: z.object({
        personId: z.string(),
    }),
    handler: async (input) => {
        const { personId } = input;
        const existingStore = estimateStore.get();

        estimateStore.set({
            ...existingStore,
            trackingParams: {
                ...existingStore.trackingParams,
                posthogPersonId: personId,
            },
        });

        return { success: true };
    },
});

export const updateUserAgent = defineAction({
    input: z.object({
        userAgent: z.string(),
    }),
    handler: async (input) => {
        const { userAgent } = input;
        const existingStore = estimateStore.get();

        estimateStore.set({
            ...existingStore,
            trackingParams: {
                ...existingStore.trackingParams,
                userAgent: userAgent,
            },
        });

        return { success: true };
    },
});

export const updateTrackingParams = defineAction({
    input: estimateParser.shape.trackingParams,
    handler: async (input) => {
        const existingStore = estimateStore.get();

        estimateStore.set({
            ...existingStore,
            trackingParams: {
                ...existingStore.trackingParams,
                ...input,
            },
        });

        return { success: true };
    },
});
