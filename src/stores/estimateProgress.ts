import { atom } from "nanostores";
import { z } from "zod"


export const estimateParser = z.object({
	streetAddress: z.string().min(5).trim(),
	city: z.string().min(2).trim(),
	state: z.string().length(2).trim(),
	zipCode: z.string().length(5),
	firstName: z.string().min(2).trim(),
	lastName: z.string().min(2).trim(),
	email: z.string().email().trim(),
	phone: z.string().regex(/^\(\d{3}\)\s\d{3}-\d{4}$/),
	isHomeowner: z.boolean(),
	estimateShortTrade: z.string(),
	estimateAction: z.string(),
	homeType: z.string(),
	estimateType: z.string().nullable(),
	trackingParams: z.object({
		utm_source: z.string().optional(),
		utm_medium: z.string().optional(),
		utm_campaign: z.string().optional(),
		utm_content: z.string().optional(),
		utm_term: z.string().optional(),
		fbclid: z.string().optional(),
		wbraid: z.string().optional(),
		gbraid: z.string().optional(),
		ssn: z.string().optional()
	}).optional(),
})

export type EstimateStoreType = z.infer<typeof estimateParser>

export const estimateParserLoose = estimateParser.partial()

export type EstimateStoreTypeLoose = z.infer<typeof estimateParserLoose>

export const estimateStore = atom<EstimateStoreTypeLoose>({})
