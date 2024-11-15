import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { usps } from './zipCheckUSPS';
import { estimateOptions } from './estimateOptions';

export const server = {
	usps,
	estimateOptions
}
