
export function is_ios(): boolean {
  const ua = navigator.userAgent;
  if (
    ua.indexOf('iPhone') > 0 ||
    ua.indexOf('iPod') > 0
  ) {
    return true;
  } else {
    return false;
  }
}
