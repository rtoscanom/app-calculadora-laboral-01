<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'

const { register, errorMsg, loading } = useAuth()

const handleRegister = (email: string, pass: string) => {
  register(email, pass)
}
</script>

<template>
  <AuthForm
    title="Registro de Usuario"
    subtitle="Crea una cuenta para guardar tus cálculos"
    submit-text="Registrarse"
    alt-link-text="¿Ya tienes cuenta? Ingresa aquí"
    alt-link-to="/login"
    :error-msg="errorMsg"
    :loading="loading"
    @submit="handleRegister"
  />
</template>
