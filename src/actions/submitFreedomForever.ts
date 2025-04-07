import { defineAction } from 'astro:actions';

export const submitFreedomForever = defineAction({
	handler: async (input, context) => {
		try {
			const response = await fetch(
				"https://bp-portal.freedomforever.com/open/affiliate/new",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(input),
				}
			);

			const data = (await response.json()) as { lead_id?: number };

			return data.lead_id;
		} catch (error) {
			console.error("Freedom Forever API error:", error);
			return false;
		}
	}
});
