import type { ShortTradeEnum } from "@models/estimateOptions";
import { activeEstimateTypeStore } from "@stores/activeEstimateType";
import { estimateProgressStore } from "@stores/estimateProgress";

export function ProcessEstimateType(estimateType: ShortTradeEnum) {

	const currentEstimateStore = estimateProgressStore.get()

	if (estimateType !== currentEstimateStore.estimate_type) {
		estimateProgressStore.set({
			...currentEstimateStore,
			estimate_type: estimateType
		})
		activeEstimateTypeStore.set(estimateType)
	}
}
