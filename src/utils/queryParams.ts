// Utility function to preserve query parameters between navigation events

/**
 * Gets the current query parameters from the URL
 * @param url The URL object to extract parameters from
 * @returns URLSearchParams object with the current query parameters
 */
export function getQueryParams(url: URL): URLSearchParams {
    return url.searchParams;
}

/**
 * Appends query parameters to a URL
 * @param baseUrl The base URL to append parameters to
 * @param searchParams The query parameters to append
 * @returns The URL with appended query parameters
 */
export function appendQueryParams(baseUrl: string, searchParams: URLSearchParams): string {
    // Filter out empty parameters
    const filteredParams = new URLSearchParams();

    for (const [key, value] of searchParams.entries()) {
        if (value) {
            filteredParams.append(key, value);
        }
    }

    const queryString = filteredParams.toString();

    if (!queryString) {
        return baseUrl;
    }

    return `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}${queryString}`;
} 