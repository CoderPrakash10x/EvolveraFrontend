export function asArray(data) {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.events)) return data.events;
  if (data && Array.isArray(data.galleries)) return data.galleries;
  if (data && Array.isArray(data.data)) return data.data;
  return [];
}
