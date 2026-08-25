export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) return

  const nuxtApp = useNuxtApp()
  const { user, isAuthReady, initAuth } = useAuth()

  initAuth()

  // Wait for initial auth state if not yet resolved on client
  if (!isAuthReady.value && nuxtApp.$firebaseAuth) {
    await new Promise<void>((resolve) => {
      const unsubscribe = nuxtApp.$firebaseAuth.onAuthStateChanged((u: any) => {
        user.value = u
        isAuthReady.value = true
        unsubscribe()
        resolve()
      })
    })
  } else if (!nuxtApp.$firebaseAuth) {
    isAuthReady.value = true
  }

  const isPublicRoute = to.path === '/login'

  if (!user.value && !isPublicRoute) {
    return navigateTo('/login')
  }

  if (user.value && isPublicRoute) {
    return navigateTo('/')
  }
})
