<script setup lang="ts">
import { Tokens } from '~/utils/themeTokens'

defineProps<{
  name: string
  currentAge: number | null
  ageStartedWorking: number | null
}>()
</script>

<template>
  <v-expand-transition>
    <v-card
      elevation="0"
      :color="Tokens.Colors.secondary"
      :class="[Tokens.Spacing.marginAlert, Tokens.Shape.cardRounding]"
      class="pa-5"
    >
      <div class="d-flex align-center mb-3">
        <v-icon color="white" class="mr-2" size="large">mdi-check-decagram</v-icon>
        <span class="text-white text-h6 font-weight-bold">
          Resultados de {{ name }}
        </span>
      </div>

      <v-card color="white" elevation="0" :class="[Tokens.Shape.cardRounding, 'pa-4']">
        <div :class="[Tokens.Typography.bodyText, 'text-primary']">
          <div class="d-flex justify-space-between align-center mb-2">
            <strong>Edad actual:</strong>
            <v-chip color="primary" variant="flat" size="small">{{ currentAge }} años</v-chip>
          </div>
          <div class="d-flex justify-space-between align-center">
            <strong>Edad inicio laboral:</strong>
            <v-chip color="primary" variant="flat" size="small">{{ ageStartedWorking }} años</v-chip>
          </div>
        </div>
      </v-card>
    </v-card>
  </v-expand-transition>
</template>

<style scoped>
.text-primary {
  color: v-bind('Tokens.Colors.textHighlight') !important;
}
</style>
