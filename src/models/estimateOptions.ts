import { z } from "zod"

/**
 * Available trade types in the system
 * @readonly
 */
export const shortTradesConst = ["bathroom", "roofing", "siding", "windows", "solar"] as const;
export type ShortTrade = typeof shortTradesConst[number];

/**
 * Zod schema for trade types
 */
export const shortTradeEnum = z.enum(shortTradesConst);
export type ShortTradeEnum = z.infer<typeof shortTradeEnum>;

/**
 * Base schema for estimate options
 */
export const homeTypesConst = ["single-family home", "apartment", "mobile home", "other"] as const;

export const baseEstimateOption = z.object({
	estimateAction: z.enum(["replace", "repair"]),
	type: z.string().nullable(),
	homeType: z.enum(homeTypesConst).optional(),
});

export type BaseEstimateOption = z.infer<typeof baseEstimateOption>;

/**
 * Type-safe schema extension utility
 * @param extension - Schema fields to extend or override
 */
function extendEstimateOptionSchema<T extends Partial<Record<keyof BaseEstimateOption, z.ZodType>>>(
	extension: T
) {
	return baseEstimateOption.extend(extension);
}

/**
 * Trade-specific schema definitions
 */
const TradeSchemas = {
	bathroom: z.object({
		shortTrade: z.literal<ShortTradeEnum>("bathroom"),
		data: extendEstimateOptionSchema({
			type: z.null(),
			estimateAction: z.enum(["enclosure", "updates", "conversion", "remodel", "walk-in"]),
			homeType: z.enum(homeTypesConst).optional(),
		}),
	}),
	roofing: z.object({
		shortTrade: z.literal<ShortTradeEnum>("roofing"),
		data: extendEstimateOptionSchema({
			type: z.enum(["asphalt", "cedar shake", "metal", "natural slate", "shingles", "tar", "tile", "other"]),
			homeType: z.enum(homeTypesConst).optional(),
		}),
	}),
	siding: z.object({
		shortTrade: z.literal<ShortTradeEnum>("siding"),
		data: extendEstimateOptionSchema({
			type: z.enum(["vinyl", "cedar", "fiberglass", "stucco", "other"]),
			homeType: z.enum(homeTypesConst).optional(),
		}),
	}),
	windows: z.object({
		shortTrade: z.literal<ShortTradeEnum>("windows"),
		data: extendEstimateOptionSchema({
			type: z.enum(["10+", "3-5", "6-9"]),
			homeType: z.enum(homeTypesConst).optional(),
		}),
	}),
	solar: z.object({
		shortTrade: z.literal<ShortTradeEnum>("solar"),
		data: extendEstimateOptionSchema({
			type: z.enum(["solar"]),
			homeType: z.enum(homeTypesConst).optional(),
		}),
	}),
} as const;

/**
 * Combined discriminated union of all trade schemas
 */
export const shortTradeDiscriminatedUnion = z.discriminatedUnion("shortTrade", [
	TradeSchemas.bathroom,
	TradeSchemas.roofing,
	TradeSchemas.siding,
	TradeSchemas.windows,
	TradeSchemas.solar
]);

export type ShortTradeDiscriminatedUnion = z.infer<typeof shortTradeDiscriminatedUnion>;

/**
 * Mapping of trade types to their data structure
 */
type ShortTradeDataMap = {
	[K in ShortTradeEnum]: {
		[P in keyof ShortTradeDiscriminatedUnion['data']]: P extends 'estimateAction' | 'type' | 'homeType'
		? ShortTradeDiscriminatedUnion['data'][P][]
		: ShortTradeDiscriminatedUnion['data'][P];
	};
};

/**
 * Creates a type-safe trade object
 * @param shortTrade - The trade type
 * @param data - The trade-specific data
 */
function createShortTradeObject<K extends ShortTradeEnum>(
	shortTrade: K,
	data: ShortTradeDataMap[K]
): { shortTrade: K; data: ShortTradeDataMap[K] } {
	return { shortTrade, data };
}

/**
 * Trade option configurations
 */
export const shortTradeObjects = [
	createShortTradeObject("bathroom", {
		estimateAction: ["enclosure", "updates", "conversion", "remodel", "walk-in"],
		type: ["metal"],
		homeType: [...homeTypesConst]
	}),
	createShortTradeObject("roofing", {
		estimateAction: ["replace", "repair"],
		type: ["asphalt", "cedar shake", "metal", "natural slate", "shingles", "tar", "tile", "other"],
		homeType: [...homeTypesConst]
	}),
	createShortTradeObject("siding", {
		estimateAction: ["replace", "repair"],
		type: ["vinyl", "cedar", "fiberglass", "stucco", "other"],
		homeType: [...homeTypesConst]
	}),
	createShortTradeObject("windows", {
		estimateAction: ["replace", "repair"],
		type: ["10+", "3-5", "6-9"],
		homeType: [...homeTypesConst]
	}),
	createShortTradeObject("solar", {
		estimateAction: ["replace"],
		type: ["solar"],
		homeType: [...homeTypesConst]
	}),
] as const;

/**
 * Schema for trade descriptions
 */
const tradeOptionDescriptionsSchema = z.object({
	shortTrade: shortTradeEnum,
	actionDescription: z.string().optional(),
	typeDescription: z.string().optional(),
	shortTradeNoun: z.string().optional()
});

export type TradeOptionDescriptions = z.infer<typeof tradeOptionDescriptionsSchema>;

/**
 * User-facing descriptions for each trade type
 */
export const tradeOptionDescriptions: readonly TradeOptionDescriptions[] = [
	{
		shortTrade: "roofing",
		actionDescription: "Do you need to replace or repair an existing roof?",
		typeDescription: "What type of roof are you looking for?",
		shortTradeNoun: "roof"
	},
	{
		shortTrade: "bathroom",
		actionDescription: "Which of these best describe your needs?",
		typeDescription: "",
		shortTradeNoun: ""
	},
	{
		shortTrade: "windows",
		actionDescription: "Do you need to replace or repair existing windows?",
		typeDescription: "How many windows do you need replaced?",
		shortTradeNoun: ""
	},
	{
		shortTrade: "siding",
		actionDescription: "Do you need to replace or repair existing siding?",
		typeDescription: "What type of siding are you looking for?",
		shortTradeNoun: ""
	},
	{
		shortTrade: "solar",
		actionDescription: "Do you need to replace or repair existing solar panels?",
		typeDescription: "What type of solar panels are you looking for?",
		shortTradeNoun: "solar panels"
	}
] as const;


export const estimateOptionsRoofingSchema = z.object({
	roof_type: z.string().optional(),
});

export type EstimateOptionsRoofingSchema = z.infer<typeof estimateOptionsRoofingSchema>;

export const estimateOptionsSolarSchema = z.object({
	solar_reason: z.string().optional(),
	roof_type: z.string().optional(),
	is_roof_shaded: z.boolean().optional(),
	freedom_lead_id: z.string().optional(),
	solar_phone_submitted_at: z.string().optional(),
});

export type EstimateOptionsSolarSchema = z.infer<typeof estimateOptionsSolarSchema>;

export const estimateOptionsSidingSchema = z.object({
	siding_type: z.string().optional(),
});

export type EstimateOptionsSidingSchema = z.infer<typeof estimateOptionsSidingSchema>;