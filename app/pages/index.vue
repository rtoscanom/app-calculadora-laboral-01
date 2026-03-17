<script setup lang="ts">
import { Tokens } from '~/utils/themeTokens'
import CalculatorForm from '~/components/CalculatorForm.vue'
import { useAuth } from '~/composables/useAuth'

const { logout } = useAuth()
</script>

<template>
  <div class="text-center mb-10">
    <h1 
      :class="[Tokens.Typography.titleSize, Tokens.Typography.titleWeight]" 
      :style="{ color: 'var(--v-theme-surface)' }"
    >
      Calculadora<br>Laboral
    </h1>
    <p 
      :class="Tokens.Typography.subtitleSize" 
      class="mt-2" 
      :style="{ color: 'rgba(255,255,255,0.7)' }"
    >
      Ingresa tus datos para empezar
    </p>

    <div class="mt-4 d-flex justify-center ga-4 flex-wrap">
      <v-btn
        to="/history"
        variant="tonal"
        :color="Tokens.Colors.primary"
        :class="Tokens.Shape.buttonRounding"
        prepend-icon="mdi-history"
        class="text-none font-weight-bold px-6"
      >
        Ver Historial
      </v-btn>
      <v-btn
        variant="outlined"
        :color="Tokens.Colors.primary"
        :class="Tokens.Shape.buttonRounding"
        prepend-icon="mdi-logout"
        class="text-none font-weight-bold px-6"
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
