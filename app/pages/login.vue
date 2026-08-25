<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'

const { loginWithGoogle, errorMsg, loading } = useAuth()
</script>

<template>
  <AuthForm
    :error-msg="errorMsg"
    :loading="loading"
    @login-google="loginWithGoogle"
  />
</template>
