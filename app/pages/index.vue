<script setup lang="ts">
import { Tokens } from '~/utils/themeTokens'
import CalculatorForm from '~/components/CalculatorForm.vue'
import { useAuth } from '~/composables/useAuth'

const { user, logout } = useAuth()
</script>

<template>
  <div class="text-center mb-8">
    <h1 
      :class="[Tokens.Typography.titleSize, Tokens.Typography.titleWeight]" 
      :style="{ color: 'var(--v-theme-surface)' }"
    >
      Calculadora<br>Laboral
    </h1>
    
    <!-- Google User Profile Header -->
    <div v-if="user" class="mt-3 d-inline-flex align-center justify-center bg-white rounded-pill px-4 py-1 elevation-1">
      <v-avatar size="28" class="mr-2" color="primary">
        <v-img v-if="user.photoURL" :src="user.photoURL" :alt="user.displayName || 'Google User'"></v-img>
        <v-icon v-else size="small" color="white">mdi-account</v-icon>
      </v-avatar>
      <span class="text-caption font-weight-bold text-grey-darken-3">
        {{ user.displayName || user.email }}
      </span>
    </div>

    <!-- Navigation / Action Buttons -->
    <div class="mt-4 d-flex justify-center ga-3 flex-wrap">
      <v-btn
        to="/history"
        variant="tonal"
        color="surface"
        :class="Tokens.Shape.buttonRounding"
        prepend-icon="mdi-history"
        class="text-none font-weight-bold px-5"
      >
        Ver Historial
      </v-btn>
      <v-btn
        variant="outlined"
        color="surface"
        :class="Tokens.Shape.buttonRounding"
        prepend-icon="mdi-logout"
        class="text-none font-weight-bold px-5"
        @click="logout"
      >
        Cerrar Sesión
      </v-btn>
    </div>
  </div>

  <v-card 
    :elevation="Tokens.Elevation.card" 
    :class="[Tokens.Shape.cardRounding]" 
    color="surface"
  >
    <v-card-text :class="Tokens.Spacing.paddingTopCard">
      <CalculatorForm />
    </v-card-text>
  </v-card>
</template>
