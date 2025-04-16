import { persistentAtom } from '@nanostores/persistent'
import type { ResultIdPartial } from '@models/stashedResultId'

export const resultIdStore = persistentAtom<ResultIdPartial>('result-id-store', {}, {
    encode: JSON.stringify,
    decode: JSON.parse
})
