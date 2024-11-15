import { defineAction } from 'astro:actions';
import DummmyJson from "@assets/info/dummyOptions.json";
import { z } from "zod";

export const estimateParser = z.object({
	fullTrade: z.string(),
	shortTrade: z.string(),
	estimateAction: z.string(),
	type: z.string().nullable(),
});

export const dummyParsed = estimateParser.array().parse(DummmyJson);

export const optionsDeduped = [
	...new Set(dummyParsed.map((x) => x.shortTrade)),
];


console.log({ optionsDeduped });

type TP = typeof DummmyJson;

export const estimateOptionReformatted = z.object({
	shortTrade: z.string(),
	estimateAction: z.string().array(),
	type: z.string().array().nullable(),
});

type EstimateOptionReformatted = z.infer<typeof estimateOptionReformatted>

const reformatted: EstimateOptionReformatted[] = []

for (const option of dummyParsed) {
	const findExisting = reformatted.find(x => x.shortTrade === option.shortTrade)

	if (findExisting) {
		findExisting.estimateAction.push(option.estimateAction)
		option.type && findExisting.type ? findExisting?.type.push(option.type) : null
	} else {
		reformatted.push({
			shortTrade: option.shortTrade,
			type: option.type ? [option.type] : null,
			estimateAction: [option.estimateAction]
		})
	}
}

export const estimateOptions = {
	estimateOptionShortSet: defineAction({
		handler: async (input, context) => {

			return reformatted.map(x => x.shortTrade)
		},
	}),
	estimateOptionsReformatted: defineAction({
		handler: async (input, context) => {

			return reformatted
		},
	})
}
