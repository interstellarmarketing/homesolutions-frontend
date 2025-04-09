import { persistentAtom } from '@nanostores/persistent'
import { z } from "astro/zod";

export const estimateParser = z.object({
  streetAddress: z.string().min(5).trim(),
  city: z.string().min(2).trim(),
  state: z.string().length(2).trim(),
  zipCode: z.string().length(5),
  firstName: z.string().min(2).trim(),
  lastName: z.string().min(2).trim(),
  email: z.string().email().trim(),
  phone: z.string().regex(/^\(\d{3}\)\s\d{3}-\d{4}$/),
  isHomeowner: z.boolean(),
  estimateShortTrade: z.string(),
  estimateAction: z.string().optional(),
  homeType: z.string().optional(),
  estimateType: z.string().nullable(),
  projectDetails: z.string().nullable().optional(),
  solarReason: z.string().nullable().optional(),
  creditScoreAboveOrEqual640: z.boolean().optional(),
  electricBillOver100: z.boolean().optional(),
  shadedRoof: z.boolean().optional(),
  freedomLeadId: z.number().optional(),
  trackingParams: z
    .object({
      utm_source: z.string().optional(),
      utm_medium: z.string().optional(),
      utm_campaign: z.string().optional(),
      utm_content: z.string().optional(),
      utm_term: z.string().optional(),
      fbclid: z.string().optional(),
      fbc: z.string().optional(),
      fbp: z.string().optional(),
      userAgent: z.string().optional(),
      gclid: z.string().optional(),
      wbraid: z.string().optional(),
      gbraid: z.string().optional(),
      ssn: z.string().optional(),
      trustedFormCertUrl: z.string().optional(),
      trustedFormPingUrl: z.string().optional(),
      posthogPersonId: z.string().optional(),
    })
    .optional(),
  submitted: z.boolean().optional(),
  solarPhoneSubmitted: z.boolean().optional(),
});

export type EstimateStoreType = z.infer<typeof estimateParser>;

export const estimateParserLoose = estimateParser.partial();

export type EstimateStoreTypeLoose = z.infer<typeof estimateParserLoose>;

export const estimateStore = persistentAtom<EstimateStoreTypeLoose>(
  'estimate-store',
  {},
  {
    encode: JSON.stringify,
    decode: JSON.parse
  }
);

export type TrackingParams = EstimateStoreType["trackingParams"];


export function resetEstimateFields() {
  return estimateStore.set({})
}
