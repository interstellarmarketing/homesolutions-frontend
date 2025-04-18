import { z } from "zod";
import type { APIContext, AstroGlobal } from "astro";
import type { ActionAPIContext } from "astro:actions";
import { nanoid } from "nanoid";
import type { PublicLeadsUpdateSchema } from "@models/supabase/zodTypes";
import { publicLeadsUpdateSchemaSchema } from "@models/supabase/schemas";

/**
 * Constructs a standardized KV store prefix for estimate entries
 * @param nanoId - Unique identifier for the estimate
 * @returns Formatted store key
 */
const storePrefixConstructor = (nanoId: string) => {
  return `estimate:${nanoId}`;
};

// Schema for result ID validation using Zod
export const resultIdParser = z.object({
  resultId: z.string(),
});

export type ResultId = z.infer<typeof resultIdParser>;

/**
 * Stores an estimate result in KV storage
 * @param context - Astro context (supports multiple Astro context types)
 * @param resultData - The estimate data to store
 * @param nanoId - Optional custom ID (generates new if not provided)
 * @returns Object containing the resultId
 */
export const storeSuccessResult = async (
  context: AstroGlobal | APIContext | ActionAPIContext,
  resultData: PublicLeadsUpdateSchema,
  nanoId?: string
) => {
  const kvBinding = context.locals.runtime.env.contracting_estimates;

  const resultId: ResultId = { resultId: nanoId ?? nanoid() };

  context.locals.runtime.ctx.waitUntil(
    kvBinding.put(
      storePrefixConstructor(resultId.resultId),
      JSON.stringify(resultData),
      { metadata: resultData }
    )
  );

  return {
    resultId,
  };
};

/**
 * Retrieves all estimate results from KV storage
 * @param context - Astro context
 * @returns Array of validated estimate results
 */
export const listSuccessResults = async (
  context: AstroGlobal | APIContext | ActionAPIContext
) => {
  const kvBinding = context.locals.runtime.env.contracting_estimates;

  const getResult = await kvBinding.list({ prefix: "estimate:" });

  const parsedListResults = getResult.keys.map((result) => {
    const parsedResult = publicLeadsUpdateSchemaSchema.safeParse(result?.metadata);
    if (parsedResult.success) {
      return parsedResult.data;
    } else {
      return false;
    }
  });
  return parsedListResults.filter((x) => !!x);
};

/**
 * Retrieves a specific estimate result by ID
 * @param context - Astro context
 * @param resultId - ID of the result to retrieve
 * @returns Validated estimate data or false if invalid/not found
 */
export const getSuccessResult = async (
  context: AstroGlobal | APIContext | ActionAPIContext,
  resultId: string
) => {
  const kvBinding = context.locals.runtime.env.contracting_estimates;

  const getResult = await kvBinding.getWithMetadata(
    storePrefixConstructor(resultId)
  );
  const parsedResult = publicLeadsUpdateSchemaSchema.safeParse(getResult.metadata);

  if (parsedResult.success) {
    return parsedResult.data;
  } else {
    return false;
  }
};
