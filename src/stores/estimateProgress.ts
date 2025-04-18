import type { EstimateStoreType } from '@models/estimateProgress';
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

export type TrackingParams = EstimateStoreType["trackingParams"];


export async function resetEstimateProgressFields() {
  try {
    const posthogPersonId = posthog.get_distinct_id();
    const { data, error } = await supabase
      .from("leads")
      .insert({
        status: "new",
        posthog_person_id: posthogPersonId,
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
