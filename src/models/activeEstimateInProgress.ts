import { z } from "zod"

export const activeEstimateParser = z.object({
	estimateShortTrade: z.string(),
	estimateAction: z.string(),
	estimateType: z.string().nullable()
})

export type ActiveEstimateParser = z.infer<typeof activeEstimateParser>

export const activeEstimateParserLoose = activeEstimateParser.partial()

export type ActiveEstimateParserLoose = z.infer<typeof activeEstimateParserLoose>