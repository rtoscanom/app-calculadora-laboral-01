import { ref } from 'vue'
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth'

export const useAuth = () => {
  const nuxtApp = useNuxtApp()
  const user = useState<User | null>('auth_user', () => null)
  const isAuthReady = useState<boolean>('auth_ready', () => false)
  const errorMsg = ref('')
  const loading = ref(false)

  const translateError = (code: string, message?: string) => {
    switch (code) {
      case 'auth/popup-closed-by-user':
        return 'Se cerró la ventana de inicio de sesión de Google antes de completar.'
      case 'auth/cancelled-popup-request':
        return 'Solicitud de autenticación cancelada.'
      case 'auth/popup-blocked':
        return 'El navegador bloqueó la ventana emergente de Google. Por favor, habilita las ventanas emergentes.'
      case 'auth/unauthorized-domain':
        return 'Dominio no autorizado en la configuración de Firebase.'
      case 'auth/network-request-failed':
        return 'Error de red al conectar con los servidores de Google.'
      default:
        return message || 'Ocurrió un error al autenticarse con Google.'
    }
  }

  const getAuthInstance = () => {
    if (import.meta.client && nuxtApp.$firebaseAuth) {
      return nuxtApp.$firebaseAuth
    }
    return null
  }

  const initAuth = () => {
    if (import.meta.client) {
      const auth = getAuthInstance()
      if (auth && !isAuthReady.value) {
        onAuthStateChanged(auth, (currentUser) => {
          user.value = currentUser
          isAuthReady.value = true
        })
      }
    }
  }

  const loginWithGoogle = async () => {
    errorMsg.value = ''
    loading.value = true

    try {
      const auth = getAuthInstance()
      if (!auth) {
        throw new Error('El servicio de autenticación no está disponible.')
      }

      const provider = new GoogleAuthProvider()
      provider.setCustomParameters({ prompt: 'select_account' })

      const result = await signInWithPopup(auth, provider)
      user.value = result.user
      navigateTo('/')
    } catch (error: any) {
      console.error('Google Auth Error:', error)
      errorMsg.value = translateError(error.code, error.message)
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    loading.value = true
    try {
      const auth = getAuthInstance()
      if (auth) {
        await signOut(auth)
      }
      user.value = null
      navigateTo('/login')
    } catch (error: any) {
      console.error('Logout error:', error)
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    isAuthReady,
    loading,
    errorMsg,
    initAuth,
    loginWithGoogle,
    logout,
  }
}
