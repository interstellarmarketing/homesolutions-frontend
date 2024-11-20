import { z } from "zod"
import { estimateParser, type EstimateStoreType } from "@stores/estimateProgress";
import type { APIContext, AstroGlobal } from "astro";
import type { ActionAPIContext } from "astro:actions";
import { nanoid } from "nanoid";


const storePrefixConstructor = (nanoId: string) => {
	return `estimate:${nanoId}`
}

const resultIdParser = z.object({
	resultId: z.string()
})

export type ResultId = z.infer<typeof resultIdParser>

export const storeSuccessResult = async (context: AstroGlobal | APIContext | ActionAPIContext, resultData: EstimateStoreType, nanoId?: string,) => {
	const kvBinding = context.locals.runtime.env.contracting_estimates

	const resultId: ResultId = { resultId: nanoId ?? nanoid() }

	context.locals.runtime.ctx.waitUntil(kvBinding.put(storePrefixConstructor(resultId.resultId), JSON.stringify(resultData), { metadata: resultData })
	)

	return {
		resultId
	}
};

export const getSuccessResult = async (context: AstroGlobal | APIContext | ActionAPIContext, resultId: string) => {
	const kvBinding = context.locals.runtime.env.contracting_estimates

	const getResult = await kvBinding.getWithMetadata(resultId)

	const parsedResult = estimateParser.safeParse(getResult.metadata)

	if (parsedResult.success) {
		return parsedResult.data
	} else {
		return false
	}
};
