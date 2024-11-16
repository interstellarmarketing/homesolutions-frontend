import { z } from "zod"

export const estimateOptionReformatted = z.object({
	shortTrade: z.string(),
	shortTradeNoun: z.string().optional(),
	actionDescription: z.string(),
	estimateAction: z.string().array(),
	type: z.string().array().nullable(),
});

type EstimateOptionReformatted = z.infer<typeof estimateOptionReformatted>

export const estimateTypes: EstimateOptionReformatted[] = [{ "shortTrade": "bathroom", "type": null, actionDescription: "which of these best describes your needs?", "estimateAction": ["enclosure", "updates", "conversion", "remodel", "walk-in"] }, { "shortTrade": "roofing", shortTradeNoun: "roof", actionDescription: "do you need to replace or repair an existing roof?", "type": ["asphalt", "tile", "flat", "metal", "wood"], "estimateAction": ["replace", "repair"] }, { "shortTrade": "siding", actionDescription: "service needed", "type": ["brickface", "metal", "stucco", "vinyl", "wood"], "estimateAction": ["replace", "repair"] }, { "shortTrade": "windows", actionDescription: "Do you want to replace or repair existing windows?", "type": ["10", "3-5", "6-9"], "estimateAction": ["replace", "repair"] }] as const
