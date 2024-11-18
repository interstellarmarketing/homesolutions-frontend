import { atom } from "nanostores";
import { z } from "zod"


export const estimateParser = z.object({
	streetAddress: z.string().min(5),
	city: z.string().min(2),
	state: z.string().length(2),
	zipCode: z.string().length(5),
	firstName: z.string().min(2),
	lastName: z.string().min(2),
	email: z.string().email(),
	phone: z.string().regex(/^(\+?1|1)?[-.\s]?\(?[2-9]\d{2}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/),
	isHomeowner: z.boolean(),
	estimateShortTrade: z.string(),
	estimateAction: z.string(),
	estimateType: z.string()
})

export type EstimateStoreType = z.infer<typeof estimateParser>

export const estimateParserLoose = estimateParser.partial()

export type EstimateStoreTypeLoose = z.infer<typeof estimateParserLoose>

export const estimateStore = atom<EstimateStoreTypeLoose>({})
