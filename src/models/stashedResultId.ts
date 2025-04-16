import { z } from "zod"
import { resultIdParser } from "./storedResults"

const resultIdPartial = resultIdParser.partial()

export type ResultIdPartial = z.infer<typeof resultIdPartial>
