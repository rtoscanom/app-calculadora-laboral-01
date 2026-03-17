import { ref } from 'vue'

export const useAuth = () => {
  const supabase = useSupabaseClient()
  const errorMsg = ref('')
  const loading = ref(false)

  const translateError = (msg: string) => {
    switch (msg) {
      case 'Invalid login credentials':
        return 'Correo electrónico o contraseña incorrectos'
      case 'User already registered':
      case 'User already exists':
        return 'El usuario ya está registrado'
      case 'Password should be at least 6 characters.':
        return 'La contraseña debe tener al menos 6 caracteres'
      default:
        return msg
    }
  }

  const login = async (email: string, password: string) => {
    errorMsg.value = ''
    loading.value = true
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      navigateTo('/')
    } catch (error: any) {
      errorMsg.value = translateError(error.message) || 'Error al iniciar sesión'
    } finally {
      loading.value = false
    }
  }

  const register = async (email: string, password: string) => {
    errorMsg.value = ''
    loading.value = true
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) throw error
      // In Nuxt Supabase, email confirmation is often required depending on settings,
      // assuming auto-confirm or successful login redirect for now:
      navigateTo('/')
    } catch (error: any) {
      errorMsg.value = translateError(error.message) || 'Error al registrarse'
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    loading.value = true
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      navigateTo('/login')
    } catch (error: any) {
      console.error('Error logging out:', error.message)
    } finally {
      loading.value = false
    }
  }

  return {
    login,
    register,
    logout,
    errorMsg,
    loading
  }
}
