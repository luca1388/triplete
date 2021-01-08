export const readCookie = (name: string) => {
  if (!document) return;
  const cookieString = document.cookie
    .split("; ")
    .find(row => row.startsWith(name));

  return cookieString ? cookieString.split("=")[1] : "";
};
export const setCookie = (
  name: string,
  value: string,
  expDays: number = 365
) => {
  if (!document) return;
  let d = new Date();
  d.setTime(d.getTime() + expDays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
};
export const deleteCookie = (name: string) => {
  if (!document) return;
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

export default {readCookie, setCookie, deleteCookie };