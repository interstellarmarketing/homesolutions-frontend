import { z } from "zod"

export const shortTradesConst = ['bathroom', 'roofing', 'siding', 'windows'] as const;

export const shortTradeEnum = z.enum(shortTradesConst);
export type ShortTradeEnum = z.infer<typeof shortTradeEnum>

export const estimateOptionReformatted = z.object({
	//shortTrade: shortTradeEnum,
	//shortTradeNoun: z.string().optional(),
	//actionDescription: z.string(),
	estimateAction: z.enum(["replace", "repair"]),
	type: z.string().array().nullable(),
});

export type EstimateOptionReformatted = z.infer<typeof estimateOptionReformatted>

export const estimateOptionExtended = estimateOptionReformatted.extend({
	shortTradeNoun: z.string().optional(),
	actionDescription: z.string(),
})

function extendEstimateOptionSchema<T extends { [K in keyof EstimateOptionReformatted]?: z.ZodType<any, any, any> }>(
	extension: T
) {
	return estimateOptionReformatted.extend(extension);
}



// INFO: default `estimateAction` === ["repair", "replace"]
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
			type: z.enum(["10+", "3-5", "6-9"]),
		}),
	}),
]);

export function getAllowableValuesForShortTrade<T extends ShortTradeEnum>(
	shortTrade: T
): Record<string, any[]> {
	const unionMember = shortTradeDiscriminatedUnion.options.find(
		option => option.shape.shortTrade.value === shortTrade
	);

	if (!unionMember) {
		throw new Error(`Invalid short trade: ${shortTrade}`);
	}

	const result: Record<string, any[]> = {};
	const dataSchema = unionMember.shape.data;

	if (dataSchema instanceof z.ZodObject) {
		for (const [key, value] of Object.entries(dataSchema.shape)) {
			if (value instanceof z.ZodEnum) {
				result[key] = value.options;
			} else if (value instanceof z.ZodLiteral) {
				result[key] = [value.value];
			} else if (value instanceof z.ZodNull) {
				result[key] = [null];
			} else if (value instanceof z.ZodString) {
				result[key] = [''];
			} else if (value instanceof z.ZodArray) {
				result[key] = [];
			}
		}
	}

	return result;
}

type ShortTradeSchemaType = z.infer<typeof shortTradeDiscriminatedUnion>;

type ShortTradeFields<T extends ShortTradeEnum> = keyof ShortTradeSchemaType["data"];

//export function getAllowableValuesForShortTrade<T extends ShortTradeEnum>(
//	shortTrade: T
//): Record<string, string[]> {
//	const unionMember = shortTradeDiscriminatedUnion.options.find(
//		option => option.shape.shortTrade.value === shortTrade
//	);
//
//	if (!unionMember) {
//		throw new Error(`Invalid short trade: ${shortTrade}`);
//	}
//
//	const dataSchema = unionMember.shape.data;
//	const result: Record<string, string[] | null> = {};
//
//	if (dataSchema instanceof z.ZodObject) {
//		for (const [key, value] of Object.entries(dataSchema.shape)) {
//			if (value instanceof z.ZodEnum) {
//				result[key] = value.options;
//			} else if (value instanceof z.ZodLiteral) {
//				result[key] = [value.value];
//			} else if (value instanceof z.ZodNull) {
//				result[key] = null;
//			} else if (value instanceof z.ZodString) {
//				result[key] = [''];
//			} else if (value instanceof z.ZodArray) {
//				result[key] = [];
//			}
//		}
//	}
//
//	return result;
//}

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


