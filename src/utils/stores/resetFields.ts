import { estimateStore } from "@stores/estimateProgress"

export function resetEstimateFields() {
	const {
		estimateType,
		estimateShortTrade,
		estimateAction,
		...existingFields
	} = estimateStore.get()

	return estimateStore.set({ ...existingFields })
}
