import { persistentAtom } from '@nanostores/persistent'
import { z } from "zod"
import { resultIdParser, type ResultId } from "@utils/kv/storedResults"

const resultIdPartial = resultIdParser.partial()

export type ResultIdPartial = z.infer<typeof resultIdPartial>

export const resultIdStore = persistentAtom<ResultIdPartial>('result-id-store', {}, {
    encode: JSON.stringify,
    decode: JSON.parse
})
