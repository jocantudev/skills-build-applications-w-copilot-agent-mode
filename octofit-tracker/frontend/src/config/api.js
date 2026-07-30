export function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`
  }

  const frontendUrl = new URL(window.location.href)

  if (frontendUrl.hostname.endsWith('.app.github.dev')) {
    return `${frontendUrl.protocol}//${frontendUrl.hostname.replace(/-5173(?=\.app\.github\.dev$)/, '-8000')}`
  }

  return 'http://localhost:8000'
}

export function getResourceApiUrl(resource) {
  return `${getApiBaseUrl()}/api/${resource}/`
}

export function normalizeCollectionPayload(payload, options = {}) {
  const keys = options.keys ?? ['items', 'entries', 'results', 'docs', 'data']

  if (Array.isArray(payload)) {
    return {
      items: payload,
      count: payload.length,
    }
  }

  for (const key of keys) {
    if (Array.isArray(payload?.[key])) {
      const inferredCount = Number(
        payload.count ?? payload.total ?? payload.totalItems ?? payload[key].length,
      )

      return {
        items: payload[key],
        count: Number.isFinite(inferredCount) ? inferredCount : payload[key].length,
      }
    }
  }

  return {
    items: [],
    count: 0,
  }
}