import { defineAction } from 'astro:actions';

export const checkZip = defineAction({
	handler: async (input, context) => {
		try {
			// Initialize ZIP service
			const zipService = await context.locals.runtime.env.ZIP_METHODS.newZipMethods();
			const locationData = await zipService.uspsZipCheck(input.zipCode);

			if (!locationData?.defaultState || !locationData?.defaultCity) {
				throw new Error("Invalid ZIP code location data");
			}
			// The next step will be determined client-side
			return true;
		} catch (error) {
			console.error("ZIP validation error:", error);
			return false;
		}
	}
});
