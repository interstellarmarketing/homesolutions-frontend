import { defineAction } from 'astro:actions';
import { z } from 'astro/zod';
import { estimateStore } from '@stores/estimateProgress';

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