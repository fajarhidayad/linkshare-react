export function imageUrl(url: string) {
  return import.meta.env.VITE_API_BASE_URL + '/storage/' + url;
}
