import { z } from "zod";
import { shortTradeEnum } from "./estimateOptions";

export const shortTradeStore = shortTradeEnum.optional()

export type ShortTradeStore = z.infer<typeof shortTradeStore>
