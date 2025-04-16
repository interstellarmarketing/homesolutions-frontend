import { persistentAtom } from '@nanostores/persistent'
import type { ActiveEstimateParserLoose } from '@models/activeEstimateInProgress'

export const activeEstimateStore = persistentAtom<ActiveEstimateParserLoose>('active-estimate-store', {}, {
	encode: JSON.stringify,
	decode: JSON.parse
})
