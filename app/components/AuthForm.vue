<script setup lang="ts">
import { Tokens } from '~/utils/themeTokens'

defineProps<{
  errorMsg?: string
  loading?: boolean
  isConfigured?: boolean
}>()

const emit = defineEmits<{
  (e: 'login-google'): void
}>()
</script>

<template>
  <v-card
    :elevation="Tokens.Elevation.card"
    :class="[Tokens.Shape.cardRounding, 'pa-8', 'text-center']"
    color="surface"
  >
    <!-- Logo / Brand Icon -->
    <div class="d-inline-flex align-center justify-center rounded-circle bg-white pa-4 mb-4 elevation-1">
      <v-icon size="42" color="#EA4335">mdi-google</v-icon>
    </div>

    <!-- Title and Subtitle -->
    <h2 :class="[Tokens.Typography.titleSize, Tokens.Typography.titleWeight, 'text-primary']" class="mb-2">
      Bienvenido
    </h2>
    <p :class="Tokens.Typography.bodyText" class="text-grey-darken-1 mb-6">
      Accede de forma rápida y segura con tu cuenta de <strong>Google</strong> para guardar y consultar tus cálculos laborales.
    </p>

    <!-- Warning when Firebase keys are not in .env -->
    <v-alert
      v-if="isConfigured === false"
      type="warning"
      variant="tonal"
      class="mb-6 text-left"
      :class="Tokens.Shape.cardRounding"
    >
      <strong>Configuración requerida:</strong> Agrega tus credenciales de Firebase en el archivo <code>.env</code> para habilitar el inicio de sesión con Google.
    </v-alert>

    <!-- Error Alert -->
    <v-alert
      v-if="errorMsg"
      type="error"
      variant="tonal"
      class="mb-6 text-left"
      :class="Tokens.Shape.cardRounding"
      closable
    >
      {{ errorMsg }}
    </v-alert>

    <!-- Botón Principal: Iniciar sesión con Google -->
    <v-btn
      type="button"
      variant="elevated"
      color="white"
      size="x-large"
      class="text-none w-100 mb-6 font-weight-bold google-signin-btn"
      :class="Tokens.Shape.buttonRounding"
      :loading="loading"
      @click="emit('login-google')"
    >
      <template #prepend>
        <v-icon color="#EA4335" class="mr-2" size="large">mdi-google</v-icon>
      </template>
      Continuar con Google
    </v-btn>

    <!-- Security Information Footer -->
    <div class="d-flex align-center justify-center ga-2 text-caption text-grey-darken-1">
      <v-icon size="small" color="primary">mdi-shield-check</v-icon>
      <span>Autenticación segura respaldada por Google Cloud</span>
    </div>
  </v-card>
</template>

<style scoped>
.google-signin-btn {
  color: #3c4043 !important;
  font-size: 1.05rem !important;
  border: 1px solid rgba(0, 0, 0, 0.08) !important;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.06) !important;
  transition: transform 0.2s ease, box-shadow 0.2s ease !important;
}

.google-signin-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.1) !important;
}

.text-primary {
  color: v-bind('Tokens.Colors.textHighlight') !important;
}
</style>
