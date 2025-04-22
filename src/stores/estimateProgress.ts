import type { PublicLeadsUpdateSchema } from '@models/supabase/zodTypes';
import { persistentAtom } from '@nanostores/persistent';
import { supabase } from '@utils/supabase';
import posthog from 'posthog-js';

export const estimateProgressStore = persistentAtom<PublicLeadsUpdateSchema>(
  'estimate-progress-store',
  {},
  {
    encode: JSON.stringify,
    decode: JSON.parse
  }
);


export async function resetEstimateProgressFields(ipAddress?: string | null) {
  try {
    estimateProgressStore.set({});
    const posthogPersonId = posthog.get_distinct_id();

    const userAgent = window.navigator.userAgent;
    let fbp: string | undefined;
    let fbc: string | undefined;

    const searchParams = new URLSearchParams(window.location.search);

    const trackingSearchParams = {
      utm_source: searchParams.get("utm_source") || undefined,
      utm_medium: searchParams.get("utm_medium") || undefined,
      utm_campaign: searchParams.get("utm_campaign") || undefined,
      utm_content: searchParams.get("utm_content") || undefined,
      utm_term: searchParams.get("utm_term") || undefined,
      fbclid: searchParams.get("fbclid") || undefined,
      gclid: searchParams.get("gclid") || undefined,
      wbraid: searchParams.get("wbraid") || undefined,
      gbraid: searchParams.get("gbraid") || undefined,
      ssn: searchParams.get("ssn") || undefined,
    };

    try {
      fbp = document.body.getAttribute("data-fbp") || undefined;
      fbc = document.body.getAttribute("data-fbc") || undefined;
    } catch (e) {
      console.error("Error getting facebook cookie", e);
    }

    const { data, error } = await supabase
      .from("leads")
      .insert({
        status: "new",
        posthog_person_id: posthogPersonId,
        landing_page: window.location.href.split("/").slice(0, -1).join("/"),
        ip_address: ipAddress,
        ...Object.fromEntries(
          Object.entries({
            ...trackingSearchParams,
            posthog_person_id: posthogPersonId,
            fbp,
            fbc,
            user_agent: userAgent,
          }).filter(([_, v]) => v !== undefined))
      })
      .select();

    if (error) {
      throw new Error(error.message);
    }

    data?.map((lead) => {
      estimateProgressStore.set({
        ...lead,
      });
    });
  } catch (error) {
    console.error(error);
  }
}
