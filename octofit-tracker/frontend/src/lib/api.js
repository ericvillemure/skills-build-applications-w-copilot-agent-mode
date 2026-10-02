const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) return payload
  if (!payload || typeof payload !== 'object') return []

  for (const key of ['results', 'data', 'items', 'records']) {
    const collection = payload[key]
    if (Array.isArray(collection)) return collection
    if (collection && typeof collection === 'object') {
      const nestedCollection = normalizeCollection(collection)
      if (nestedCollection.length > 0) return nestedCollection
    }
  }

  return []
}

export async function parseCollectionResponse(response) {
  let payload

  try {
    payload = await response.json()
  } catch {
    payload = null
  }

  if (!response.ok) {
    const message = payload?.detail ?? payload?.error ?? payload?.message
    throw new Error(message || `API request failed (${response.status})`)
  }

  return normalizeCollection(payload)
}