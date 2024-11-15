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
	px: z.enum(["f"])
})

export type EstimateStoreType = z.infer<typeof estimateParser>

export const estimateStore = atom<EstimateStoreType>({ zipCode: "", firstName: "", lastName: "", state: "", streetAddress: "", city: "", isHomeowner: true, email: "", phone: 0 })
