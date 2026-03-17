<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'

const { login, errorMsg, loading } = useAuth()

const handleLogin = (email: string, pass: string) => {
  login(email, pass)
}
</script>

<template>
  <AuthForm
    title="Iniciar Sesión"
    subtitle="Bienvenido de vuelta a la Calculadora"
    submit-text="Ingresar"
    alt-link-text="¿No tienes cuenta? Registrate aquí"
    alt-link-to="/register"
    :error-msg="errorMsg"
    :loading="loading"
    @submit="handleLogin"
  />
</template>
