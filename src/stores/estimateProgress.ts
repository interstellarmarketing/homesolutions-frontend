import { atom } from "nanostores";
import { z } from "zod"

export const estimateParser = z.object({
	zipCode: z.string().length(5)
})

export type EstimateStoreType = z.infer<typeof estimateParser>

export const estimateStore = atom<EstimateStoreType>({ zipCode: "" })
