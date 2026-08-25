<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'

const { loginWithGoogle, errorMsg, loading, isConfigured } = useAuth()
</script>

<template>
  <AuthForm
    :error-msg="errorMsg"
    :loading="loading"
    :is-configured="isConfigured"
    @login-google="loginWithGoogle"
  />
</template>
