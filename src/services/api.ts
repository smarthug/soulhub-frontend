export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  // NOTE: For hackathons, can be replaced with a local mock API
  const res = await fetch(path, init)
  if (!res.ok) throw new Error('API Error')
  return res.json() as Promise<T>
}
