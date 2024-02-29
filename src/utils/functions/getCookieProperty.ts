export const getCookieProperty = <T>(
  cookie: string,
  prop: string,
  defaultValue: T
): T => {
  if (!cookie) {
    return defaultValue;
  }

  const cookiePairs = cookie.split(";");

  for (const cookiePair of cookiePairs) {
    const [key, value] = cookiePair.trim().split("=");
    if (key === prop) {
      return value as T;
    }
  }

  return defaultValue; // Value not found in cookie
};
