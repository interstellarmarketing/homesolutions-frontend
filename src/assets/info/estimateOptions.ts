import { z } from "zod"

const shortTradesConst = ['bathroom', 'roofing', 'siding', 'windows'] as const;

const shortTradeEnum = z.enum(shortTradesConst);
export type ShortTradeEnum = z.infer<typeof shortTradeEnum>

export const estimateOptionReformatted = z.object({
	shortTrade: shortTradeEnum,
	shortTradeNoun: z.string().optional(),
	actionDescription: z.string(),
	estimateAction: z.string().array(),
	type: z.string().array().nullable(),
});

export type EstimateOptionReformatted = z.infer<typeof estimateOptionReformatted>


function extendEstimateOptionSchema<T extends { [K in keyof EstimateOptionReformatted]?: z.ZodType<any, any, any> }>(
	extension: T
) {
	return estimateOptionReformatted.extend(extension);
}



const myUnion = z.discriminatedUnion("shortTrade", [
	z.object({
		shortTrade: z.literal<ShortTradeEnum>("bathroom"),
		data: extendEstimateOptionSchema({
			type: z.null(),
			estimateAction: z.array(z.enum(["enclosure", "updates", "conversion", "remodel", "walk-in"])),
		}),
	}),
	z.object({
		shortTrade: z.literal<ShortTradeEnum>("roofing"),
		data: extendEstimateOptionSchema({
			shortTradeNoun: z.literal("roof"),
			type: z.enum(["asphalt", "tile", "flat", "metal", "wood"]),
			estimateAction: z.array(z.enum(["replace", "repair"])),
		}),
	}),
	z.object({
		shortTrade: z.literal<ShortTradeEnum>("siding"),
		data: extendEstimateOptionSchema({
			type: z.enum(["brickface", "metal", "stucco", "vinyl", "wood"]),
			estimateAction: z.array(z.enum(["replace", "repair"])),
		}),
	}),
	z.object({
		shortTrade: z.literal<ShortTradeEnum>("windows"),
		data: extendEstimateOptionSchema({
			type: z.enum(["10", "3-5", "6-9"]),
			estimateAction: z.array(z.enum(["replace", "repair"])),
		}),
	}),
]);

export type MyUnion = z.infer<typeof myUnion>

export const estimateTypes: EstimateOptionReformatted[] = [{ "shortTrade": "bathroom", "type": null, actionDescription: "which of these best describes your needs?", "estimateAction": ["enclosure", "updates", "conversion", "remodel", "walk-in"] }, { "shortTrade": "roofing", shortTradeNoun: "roof", actionDescription: "do you need to replace or repair an existing roof?", "type": ["asphalt", "tile", "flat", "metal", "wood"], "estimateAction": ["replace", "repair"] }, { "shortTrade": "siding", actionDescription: "service needed", "type": ["brickface", "metal", "stucco", "vinyl", "wood"], "estimateAction": ["replace", "repair"] }, { "shortTrade": "windows", actionDescription: "Do you want to replace or repair existing windows?", "type": ["10", "3-5", "6-9"], "estimateAction": ["replace", "repair"] }] as const

