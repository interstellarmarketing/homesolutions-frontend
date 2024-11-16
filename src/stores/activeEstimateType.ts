import { shortTradeDiscriminatedUnion, type EstimateOptionReformatted } from "@assets/info/estimateOptions";
import { atom } from "nanostores";
import { z } from "zod"

export const shortTradeStore = shortTradeDiscriminatedUnion.optional()

type ShortTradeStore = z.infer<typeof shortTradeStore>

export const activeEstimateTypeStore = atom<ShortTradeStore>()
