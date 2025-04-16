import { z } from "zod"
import { shortTradeDiscriminatedUnion } from "./estimateOptions"

export type ShortTradeDiscriminatedUnion = z.infer<typeof shortTradeDiscriminatedUnion>

export const activeEstimateParser = z.object({
	estimateShortTrade: z.string(),
	estimateAction: z.string(),
	estimateType: z.string().nullable()
})

export type ActiveEstimateParser = z.infer<typeof activeEstimateParser>

export const activeEstimateParserLoose = activeEstimateParser.partial()

export type ActiveEstimateParserLoose = z.infer<typeof activeEstimateParserLoose>