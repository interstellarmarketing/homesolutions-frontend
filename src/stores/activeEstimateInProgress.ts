import { atom } from "nanostores";
import { z } from "zod"
import { shortTradeDiscriminatedUnion } from "@assets/info/estimateOptions"
//import { } from "be-rpc-estimates/src/zoddle/houseEstimates/houseEstimateUnions"

export type ShortTradeDiscriminatedUnion = z.infer<typeof shortTradeDiscriminatedUnion>

export const activeEstimateParser = z.object({
	estimateShortTrade: z.string(),
	estimateAction: z.string(),
	estimateType: z.string().nullable()
})

export type ActiveEstimateParser = z.infer<typeof activeEstimateParser>

export const activeEstimateParserLoose = activeEstimateParser.partial()

export type ActiveEstimateParserLoose = z.infer<typeof activeEstimateParserLoose>

export const activeEstimateStore = atom<ActiveEstimateParserLoose>({})
