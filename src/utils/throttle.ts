export const throttle = <
  T extends (
    blob: Blob,
    callback: (url: string, altText: string) => void
  ) => Promise<void>
>(
  func: T,
  limit: number
): T => {
  let inThrottle: boolean = false;

  return (async (
    blob: Blob,
    callback: (url: string, altText: string) => void
  ) => {
    if (!inThrottle) {
      await func(blob, callback);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  }) as T;
};
