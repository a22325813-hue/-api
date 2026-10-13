import type { RouteLocationNormalizedLoaded } from 'vue-router'

/** Appearance follows the route, never the signed-in user's role. */
export function isAdminRoute(route: Pick<RouteLocationNormalizedLoaded, 'path' | 'meta' | 'matched'>): boolean {
  return route.meta.requiresAdmin === true
    || route.matched.some(record => record.meta.requiresAdmin === true)
    || /^\/admin(?:\/|$)/i.test(route.path)
}

/** The html flag also scopes overlays teleported outside the layout to body. */
export function syncUserUiScope(isAdmin: boolean): void {
  document.documentElement.classList.toggle('user-ui', !isAdmin)
}

export function clearUserUiScope(): void {
  document.documentElement.classList.remove('user-ui')
}
