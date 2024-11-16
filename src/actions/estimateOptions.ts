import { ActionError, defineAction } from 'astro:actions';
import { z } from "zod";
import { estimateTypes } from '@assets/info/estimateOptions';

export const estimateOptions = {
	estimateOptionShortSet: defineAction({
		handler: async (input, context) => {

			return estimateTypes.map(x => x.shortTrade)
		},
	}),
	estimateOptionsReformatted: defineAction({
		input: z.object({
			shortTrade: z.string(),
		}),
		handler: async (input, context) => {
			const { shortTrade } = input

			const findViaShortTrade = estimateTypes.find(x => x.shortTrade === shortTrade)

			if (findViaShortTrade) {
				return findViaShortTrade
			}

			throw new ActionError({
				code: "BAD_REQUEST",
				message: `could not find match for ${shortTrade}`
			})
		},
	})
}
