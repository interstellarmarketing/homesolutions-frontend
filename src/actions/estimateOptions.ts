import { ActionError, defineAction } from 'astro:actions';
import { z } from "zod";
import { shortTradesConst, shortTradeObjects } from '@assets/info/estimateOptions';

export const estimateOptions = {
	estimateOptionShortSet: defineAction({
		handler: async (input, context) => {

			return shortTradesConst
		},
	}),
	estimateOptionsReformatted: defineAction({
		input: z.object({
			shortTrade: z.string(),
		}),
		handler: async (input, context) => {
			const { shortTrade } = input

			const findViaShortTrade = shortTradeObjects.find(x => x.shortTrade === shortTrade)

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
