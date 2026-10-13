import { afterEach, describe, expect, it } from 'vitest'
import { reactive, watch } from 'vue'
import { clearUserUiScope, isAdminRoute, syncUserUiScope } from '../uiRouteScope'

const route = (path: string, requiresAdmin = false) => ({ path, meta: { requiresAdmin }, matched: [] })

afterEach(clearUserUiScope)

describe('route-based UI isolation', () => {
  it('recognizes admin paths and metadata, not similar public paths', () => {
    expect(isAdminRoute(route('/admin'))).toBe(true)
    expect(isAdminRoute(route('/admin/dashboard'))).toBe(true)
    expect(isAdminRoute(route('/custom', true))).toBe(true)
    expect(isAdminRoute(route('/administrator'))).toBe(false)
    expect(isAdminRoute(route('/dashboard'))).toBe(false)
    const adminOnUserPage = { ...route('/dashboard'), user: { role: 'admin' } }
    expect(isAdminRoute(adminOnUserPage)).toBe(false)
    expect(isAdminRoute({ path: '/custom', meta: {}, matched: [{ meta: { requiresAdmin: true } }] } as Parameters<typeof isAdminRoute>[0])).toBe(true)
  })

  it('updates Teleport scope synchronously in both directions and cleans up', () => {
    const current = reactive(route('/home'))
    const stop = watch(() => isAdminRoute(current), syncUserUiScope, { immediate: true, flush: 'sync' })
    expect(document.documentElement.classList.contains('user-ui')).toBe(true)
    current.path = '/admin/dashboard'
    expect(document.documentElement.classList.contains('user-ui')).toBe(false)
    current.path = '/profile'
    expect(document.documentElement.classList.contains('user-ui')).toBe(true)
    current.meta.requiresAdmin = true
    expect(document.documentElement.classList.contains('user-ui')).toBe(false)
    stop()
    syncUserUiScope(false)
    clearUserUiScope()
    expect(document.documentElement.classList.contains('user-ui')).toBe(false)
  })
})
