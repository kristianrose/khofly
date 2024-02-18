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
    if (key.toLowerCase() === prop) {
      return value.toLowerCase() as T; // Consistent lowercase for language code
    }
  }

  return defaultValue; // Language not found in cookie
};
