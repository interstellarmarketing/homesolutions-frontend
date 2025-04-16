import { persistentAtom } from '@nanostores/persistent';
import type { ShortTradeStore } from "@models/activeEstimateType";
import { shortTradeObjects } from "@models/estimateOptions";
import { computed } from "nanostores";

export const activeEstimateTypeStore = persistentAtom<ShortTradeStore>('active-estimate-type-store', undefined)

export const computedEstimateOptions = computed(activeEstimateTypeStore, shortTradeStore => shortTradeObjects.find(x => x.shortTrade === shortTradeStore))
