export const useCookies = () => {
  const readCookie = (name: string) => {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith(name));
    
      return cookieString ? cookieString.split("=")[1] : '';
  };
  const setCookie = (name: string, value: string , expDays: number = 365) => {
    let d = new Date();
    d.setTime(d.getTime() + expDays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  };
  const deleteCookie = (name: string) => {
    document.cookie =
      name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  return { readCookie, setCookie, deleteCookie };
};
