import { uspsZipLookupParser } from '@typestash/zodTypes/usps';
import { ActionError, defineAction } from 'astro:actions';
import { z } from 'astro:schema';

const kvPrefixFormatter = (zip: string) => `zip:${zip}`

export const usps = {
	listAllZips: defineAction({
		handler: async (_, context) => {

			const kvStash = context.locals.runtime.env.contracting_estimates


			const listAll = await kvStash.list({ prefix: "zip:" })


			const parsedMetadata = listAll.keys.map(x => {
				const parseMeta = uspsZipLookupParser.safeParse(x.metadata)
				if (parseMeta.success) {
					return parseMeta.data
				} else {
					return false
				}
			})

			return parsedMetadata.filter(x => !!x)

		},
	}),

}
