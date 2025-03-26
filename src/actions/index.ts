import { estimateOptions } from './estimateOptions';
import { updateTrustedFormParams, updatePosthogPersonId, updateUserAgent, updateTrackingParams } from './estimateStore';

export const server = {
	estimateOptions,
	updateTrustedFormParams,
	updatePosthogPersonId,
	updateUserAgent,
	updateTrackingParams,
}
