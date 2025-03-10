function load(fn: () => void, instantiated: boolean) {
    if (!instantiated) {
        fn();
        instantiated = true;
    }
}

export function crossPlatformLoader(fn: () => void): void {
    let instantiated = false;
    document.addEventListener("DOMContentLoaded", () => load(fn, instantiated));
    document.addEventListener("astro:page-load", () => load(fn, instantiated));
    load(fn, instantiated);
}