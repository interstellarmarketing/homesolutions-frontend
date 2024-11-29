import { z } from "zod"


export const estimateObject = z.object({
	zip: z.coerce.number(),
	shortTrade: z.enum(["roof", "windows", "bath", "siding",]).nullable()
})


export type EstimateObject = z.infer<typeof estimateObject>
