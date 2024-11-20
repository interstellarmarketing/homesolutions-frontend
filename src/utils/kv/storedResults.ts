import { z } from "zod"
import { estimateParser, type EstimateStoreType } from "@stores/estimateProgress";
import type { APIContext, AstroGlobal } from "astro";
import type { ActionAPIContext } from "astro:actions";
import { nanoid } from "nanoid";


const storePrefixConstructor = (nanoId: string) => {
	return `estimate:${nanoId}`
}

export const resultIdParser = z.object({
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

export const listSuccessResults = async (context: AstroGlobal | APIContext | ActionAPIContext) => {
	const kvBinding = context.locals.runtime.env.contracting_estimates

	const getResult = await kvBinding.list({ prefix: "estimate:" })

	const parsedListResults = getResult.keys.map(result => {
		const parsedResult = estimateParser.safeParse(result?.metadata)
		if (parsedResult.success) {
			return parsedResult.data
		} else {
			return false
		}
	})
	return parsedListResults.filter(x => !!x)
};

export const getSuccessResult = async (context: AstroGlobal | APIContext | ActionAPIContext, resultId: string) => {
	const kvBinding = context.locals.runtime.env.contracting_estimates

	const getResult = await kvBinding.getWithMetadata(storePrefixConstructor(resultId))

	console.log(JSON.stringify(getResult))

	const parsedResult = estimateParser.safeParse(getResult.metadata)

	console.log(JSON.stringify(parsedResult))

	if (parsedResult.success) {
		return parsedResult.data
	} else {
		return false
	}
};
