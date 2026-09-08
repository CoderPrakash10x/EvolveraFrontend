export function optimizeCloudinaryUrl(url, width = 900) {
  if (!url || !url.includes("/image/upload/")) return url;

  const marker = "/image/upload/";
  if (url.includes("/image/upload/f_auto")) return url;

  return url.replace(
    marker,
    `${marker}f_auto,q_auto,w_${width}/`
  );
}
