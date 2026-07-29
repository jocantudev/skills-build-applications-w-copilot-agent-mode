export function getApiBaseUrl() {
  const frontendUrl = new URL(window.location.href)

  if (frontendUrl.hostname.endsWith('.app.github.dev')) {
    return `${frontendUrl.protocol}//${frontendUrl.hostname.replace(/-5173(?=\.app\.github\.dev$)/, '-8000')}`
  }

  return 'http://localhost:8000'
}