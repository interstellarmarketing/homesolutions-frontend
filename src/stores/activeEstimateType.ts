import { shortTradeDiscriminatedUnion, shortTradeEnum, type EstimateOptionReformatted, type ShortTradeEnum } from "@assets/info/estimateOptions";
import { atom, computed } from "nanostores";
import { z } from "zod"

export const shortTradeStore = shortTradeEnum.optional()

type ShortTradeStore = z.infer<typeof shortTradeStore>

export const activeEstimateTypeStore = atom<ShortTradeStore>()

export const computedEstimateOptions = computed()
