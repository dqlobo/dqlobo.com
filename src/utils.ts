export function track(eventName: string, params: any = {}) {
  const { gtag } = window as any;

  if (!gtag) {
    console.warn("gtag not mounted");
    return;
  }

  return gtag("event", "click", params);
}

export const isBrowser = () => typeof window !== "undefined";
