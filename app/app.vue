<script setup lang="ts">
import { Tokens } from '~/utils/themeTokens'
import CalculatorForm from '~/components/CalculatorForm.vue'
</script>

<template>
  <v-app :style="{ backgroundColor: 'var(--v-theme-background)' }">
    <v-main>
      <v-container class="fill-height" :class="Tokens.Spacing.pagePadding" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="10" md="8" lg="5">
            
            <!-- Modernized App Header, matching the image's top vibe -->
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
            
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
/* Remove the general background gradient since Vuetify custom theme now handles the background */
.v-application {
  font-family: 'Inter', sans-serif !important;
}
</style>
