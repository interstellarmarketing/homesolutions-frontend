import { estimateOptions } from './estimateOptions';
import { updateTrustedFormParams, updatePosthogPersonId, updateUserAgent } from './estimateStore';

export const server = {
	estimateOptions,
	updateTrustedFormParams,
	updatePosthogPersonId,
	updateUserAgent,
}
