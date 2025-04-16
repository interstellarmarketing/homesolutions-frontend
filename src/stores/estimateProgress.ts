import { persistentAtom } from '@nanostores/persistent';
import type { EstimateStoreType, EstimateStoreTypeLoose } from '@models/estimateProgress';

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
