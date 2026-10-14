import type { RouteLocationNormalizedLoaded } from 'vue-router'

/** Appearance follows unified modern styling; isAdminRoute tracks admin section scope for menus and headers. */
export function isAdminRoute(route: Pick<RouteLocationNormalizedLoaded, 'path' | 'meta' | 'matched'>): boolean {
  return route.meta.requiresAdmin === true
    || route.matched.some(record => record.meta.requiresAdmin === true)
    || /^\/admin(?:\/|$)/i.test(route.path)
}

/** Unified UI styling is applied globally across both user and admin portals. */
export function syncUserUiScope(_isAdmin?: boolean): void {
  document.documentElement.classList.add('user-ui')
}

export function clearUserUiScope(): void {
  document.documentElement.classList.remove('user-ui')
}

