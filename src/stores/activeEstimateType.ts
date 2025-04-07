import { shortTradeEnum, shortTradeObjects } from "@assets/info/estimateOptions";
import { computed } from "nanostores";
import { persistentAtom } from '@nanostores/persistent'
import { z } from "zod"

export const shortTradeStore = shortTradeEnum.optional()

type ShortTradeStore = z.infer<typeof shortTradeStore>

export const activeEstimateTypeStore = persistentAtom<ShortTradeStore>('active-estimate-type-store', undefined)

export const computedEstimateOptions = computed(activeEstimateTypeStore, shortTradeStore => shortTradeObjects.find(x => x.shortTrade === shortTradeStore))
