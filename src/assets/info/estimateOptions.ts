import { z } from "zod"

const shortTradesConst = ['bathroom', 'roofing', 'siding', 'windows'] as const;

export const shortTradeEnum = z.enum(shortTradesConst);
export type ShortTradeEnum = z.infer<typeof shortTradeEnum>

export const estimateOptionReformatted = z.object({
	//shortTrade: shortTradeEnum,
	shortTradeNoun: z.string().optional(),
	actionDescription: z.string(),
	estimateAction: z.enum(["replace", "repair"]),
	type: z.string().array().nullable(),
});

export type EstimateOptionReformatted = z.infer<typeof estimateOptionReformatted>


function extendEstimateOptionSchema<T extends { [K in keyof EstimateOptionReformatted]?: z.ZodType<any, any, any> }>(
	extension: T
) {
	return estimateOptionReformatted.extend(extension);
}



export const shortTradeDiscriminatedUnion = z.discriminatedUnion("shortTrade", [
	z.object({
		shortTrade: z.literal<ShortTradeEnum>("bathroom"),
		data: extendEstimateOptionSchema({
			type: z.null(),
			estimateAction: z.enum(["enclosure", "updates", "conversion", "remodel", "walk-in"]),
		}),
	}),
	z.object({
		shortTrade: z.literal<ShortTradeEnum>("roofing"),
		data: extendEstimateOptionSchema({
			shortTradeNoun: z.literal("roof"),
			type: z.enum(["asphalt", "tile", "flat", "metal", "wood"]),
		}),
	}),
	z.object({
		shortTrade: z.literal<ShortTradeEnum>("siding"),
		data: extendEstimateOptionSchema({
			type: z.enum(["brickface", "metal", "stucco", "vinyl", "wood"]),
		}),
	}),
	z.object({
		shortTrade: z.literal<ShortTradeEnum>("windows"),
		data: extendEstimateOptionSchema({
			type: z.enum(["10", "3-5", "6-9"]),
		}),
	}),
]);

type ShortTradeSchemaType = z.infer<typeof shortTradeDiscriminatedUnion>;

type ShortTradeFields<T extends ShortTradeEnum> = keyof ShortTradeSchemaType["data"];

export function getOptionsForShortTrade<T extends ShortTradeEnum>(
	shortTrade: T,
	field: ShortTradeFields<T>
): string[] {
	const unionMember = shortTradeDiscriminatedUnion.options.find(
		option => option.shape.shortTrade.value === shortTrade
	);

	if (!unionMember) {
		throw new Error(`Invalid short trade: ${shortTrade}`);
	}

	const dataSchema = unionMember.shape.data;

	if (dataSchema instanceof z.ZodObject) {
		const targetField = dataSchema.shape[field];

		if (targetField instanceof z.ZodEnum) {
			return targetField.options;
		} else if (targetField instanceof z.ZodLiteral) {
			return [targetField.value];
		}
	}

	return [];
}
export type ShortTradeDiscriminatedUnion = z.infer<typeof shortTradeDiscriminatedUnion>

export const estimateTypes: EstimateOptionReformatted[] = [{ "shortTrade": "bathroom", "type": null, actionDescription: "which of these best describes your needs?", "estimateAction": ["enclosure", "updates", "conversion", "remodel", "walk-in"] }, { "shortTrade": "roofing", shortTradeNoun: "roof", actionDescription: "do you need to replace or repair an existing roof?", "type": ["asphalt", "tile", "flat", "metal", "wood"], "estimateAction": ["replace", "repair"] }, { "shortTrade": "siding", actionDescription: "service needed", "type": ["brickface", "metal", "stucco", "vinyl", "wood"], "estimateAction": ["replace", "repair"] }, { "shortTrade": "windows", actionDescription: "Do you want to replace or repair existing windows?", "type": ["10", "3-5", "6-9"], "estimateAction": ["replace", "repair"] }] as const

