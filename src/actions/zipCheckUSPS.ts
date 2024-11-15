import { uspsZipLookupParser } from '@typestash/zodTypes/usps';
import { ActionError, defineAction } from 'astro:actions';
import { z } from 'astro:schema';

const kvPrefixFormatter = (zip: string) => `zip:${zip}`

const kvZipMetadata = z.object({

})

export const usps = {
	uspsZipCheck: defineAction({
		input: z.object({
			zip: z.string()
		}),
		handler: async (input, context) => {
			const { zip } = input

			const kvStash = context.locals.runtime.env.contracting_estimates


			const kvPrefix = kvPrefixFormatter(zip)

			const checkZip = await kvStash.getWithMetadata(kvPrefix)

			if (checkZip.metadata !== null) {

				console.log("hit kv cache")
				const parsedMetadata = uspsZipLookupParser.safeParse(checkZip.metadata)

				if (parsedMetadata.success) {
					return parsedMetadata.data
				}
			}

			//throw new ActionError({
			//	code: "BAD_REQUEST",
			//	message: "failed to get zip metadata"
			//})
			//

			const getZipResult = await fetch("https://tools.usps.com/tools/app/ziplookup/cityByZip", {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
					"Accept": "application/json, text/javascript, */*; q=0.01",
					"Sec-Fetch-Site": "same-origin",
					"Accept-Language": "en-US,en;q=0.9",
					"Accept-Encoding": "gzip, deflate, br",
					"Sec-Fetch-Mode": "cors",
					"Host": "tools.usps.com",
					"Origin": "https://tools.usps.com",
					"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.6 Safari/605.1.15",
					"Referer": "https://tools.usps.com/zip-code-lookup.htm?citybyzipcode",
					"Connection": "keep-alive",
					"Sec-Fetch-Dest": "empty",
					"X-Requested-With": "XMLHttpRequest",
				},
				body: new URLSearchParams({
					zip
				}),
				redirect: "follow"
			});


			if (!getZipResult.ok) {
				throw new ActionError({
					code: "BAD_REQUEST",
					message: "failed to get zip from USPS"
				})
			}

			const parsedResult = uspsZipLookupParser.safeParse(await getZipResult.json())

			if (!parsedResult.success) {
				throw new ActionError({
					code: "INTERNAL_SERVER_ERROR",
					message: "failed: parsing returned json from USPS"
				})
			}

			const uspsJson = parsedResult.data


			context.locals.runtime.ctx.waitUntil(kvStash.put(kvPrefix, JSON.stringify(uspsJson), { metadata: uspsJson }))

			return uspsJson
		},
	})
}
