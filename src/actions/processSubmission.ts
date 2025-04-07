import type { estimateParser } from '@stores/estimateProgress';
import { defineAction } from 'astro:actions';

interface StoreWithIpAddress extends ReturnType<typeof estimateParser.parse> {
	ipAddress?: string | null;
}

function formatStoreForSubmission(store: StoreWithIpAddress) {
	const submission: any = {
		// Required contact information
		streetAddress: store.streetAddress,
		creditScoreAboveOrEqual640: store.creditScoreAboveOrEqual640,
		city: store.city,
		state: store.state,
		zipCode: store.zipCode,
		firstName: store.firstName,
		lastName: store.lastName,
		email: store.email,
		phone: store.phone,
		ipAddress: store.ipAddress,
		solarReason: store.solarReason,
		electricBillOver100: store.electricBillOver100,
		projectDetails: store.projectDetails,
		shadedRoof: store.shadedRoof,

		// Required qualification fields
		isHomeowner: store.isHomeowner,
		shortTrade: store.estimateShortTrade,
		estimateType: store.estimateType,
		action: store.estimateAction || "unknown",

		// Optional property information
		homeType: store.homeType || null,

		// PostHog person ID
		posthogPersonId: store.trackingParams?.posthogPersonId || null,

		// Marketing attribution from trackingParams
		utmSource: store.trackingParams?.utm_source || null,
		utmMedium: store.trackingParams?.utm_medium || null,
		utmCampaign: store.trackingParams?.utm_campaign || null,
		utmTerm: store.trackingParams?.utm_term || null,
		utmContent: store.trackingParams?.utm_content || null,
		utmId: null,
		fbclid: store.trackingParams?.fbclid || null,
		fbc: store.trackingParams?.fbc || null,
		fbp: store.trackingParams?.fbp || null,
		userAgent: store.trackingParams?.userAgent || null,
		gclid: store.trackingParams?.gclid || null,
		wbraid: store.trackingParams?.wbraid || null,
		gbraid: store.trackingParams?.gbraid || null,
		ssn: store.trackingParams?.ssn || null,
		trustedFormCertUrl: store.trackingParams?.trustedFormCertUrl || null,
		trustedFormPingUrl: store.trackingParams?.trustedFormPingUrl || null,
	};

	if (store.estimateShortTrade === "roofing") {
		submission.roofType = store.projectDetails;
	}

	switch (store.estimateType) {
		case "solar":
			submission.solarType = store.projectDetails;
			break;
	}

	return submission;
}

export const processSubmission = defineAction({
	handler: async (input, context) => {
		const formattedSubmission =
			await formatStoreForSubmission(input);
		const zDb = context.locals.runtime.env.DB;
		const db = await zDb.D1Methods();
		return await db.insertSubmission(formattedSubmission as any);
	},
});
