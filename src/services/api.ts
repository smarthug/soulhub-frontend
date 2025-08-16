export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  // NOTE: 해커톤에서는 로컬 mock API로 대체 가능
  const res = await fetch(path, init)
  if (!res.ok) throw new Error('API Error')
  return res.json() as Promise<T>
}
