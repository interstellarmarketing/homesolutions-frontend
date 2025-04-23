import { z } from "zod";

// Schema for result ID validation using Zod
export const resultIdParser = z.object({
  resultId: z.string(),
});

export type ResultId = z.infer<typeof resultIdParser>;
