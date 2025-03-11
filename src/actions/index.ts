import { estimateOptions } from './estimateOptions';
import { updateTrustedFormParams, updatePosthogPersonId } from './estimateStore';

export const server = {
	estimateOptions,
	updateTrustedFormParams,
	updatePosthogPersonId,
}
