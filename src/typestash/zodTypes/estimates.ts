import { z } from "zod"


export const estimateObject = z.object({
	zip: z.coerce.number(),
	shortTrade: z.enum(["roof", "windows", "bath", "siding",]).nullable()
})

const tf = estimateObject.pick({ shortTrade: true }).unwrap()

export type EstimateObject = z.infer<typeof estimateObject>
