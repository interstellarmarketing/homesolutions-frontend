import { atom } from "nanostores";
import { z } from "zod"
import { resultIdParser, type ResultId } from "@utils/kv/storedResults"

const resultIdPartial = resultIdParser.partial()

export type ResultIdPartial = z.infer<typeof resultIdPartial>

export const resultIdStore = atom<ResultIdPartial>({})
