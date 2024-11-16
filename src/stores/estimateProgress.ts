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
	phone: z.number(),
	isHomeowner: z.boolean(),
	estimateType: z.string(),
	estimateAction: z.string()
	//px: z.enum(["siding", "bathroom"])
})

export const estimateParserLoose = estimateParser.partial()

export type EstimateStoreType = z.infer<typeof estimateParser>

export type EstimateStoreTypeLoose = z.infer<typeof estimateParserLoose>

export const estimateStore = atom<EstimateStoreTypeLoose>({})
