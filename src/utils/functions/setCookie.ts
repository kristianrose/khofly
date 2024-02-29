interface Options {
  expires: number;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: "Strict" | "Lax" | "None";
}

export const setCookie = (name: string, value: string, options: Options) => {
  const encodedValue = encodeURIComponent(value);
  let cookieString = `${name}=${encodedValue}`;

  // Add optional options
  if (options.expires) {
    const expiresDate = new Date();
    expiresDate.setTime(expiresDate.getTime() + options.expires * 1000);
    cookieString += `; expires=${expiresDate.toUTCString()}`;
  }

  if (options.path) {
    cookieString += `; path=${options.path}`;
  }

  if (options.domain) {
    cookieString += `; domain=${options.domain}`;
  }

  if (options.secure) {
    cookieString += `; secure`;
  }

  if (options.sameSite) {
    cookieString += `; SameSite=${options.sameSite}`;
  }

  document.cookie = cookieString;
};
