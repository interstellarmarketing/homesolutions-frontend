import type { ShortTradeEnum } from "@models/estimateOptions";
import { activeEstimateTypeStore } from "@stores/activeEstimateType";
import { estimateStore } from "@stores/estimateProgress";

export function ProcessEstimateType(estimateType: ShortTradeEnum) {

	const currentEstimateStore = estimateStore.get()

	if (estimateType !== currentEstimateStore.estimateType) {
		estimateStore.set({
			...currentEstimateStore,
			estimateType
		})
		activeEstimateTypeStore.set(estimateType)
	}
}
