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
    <v-alert
      :type="Tokens.Colors.success"
      variant="tonal"
      :class="Tokens.Spacing.marginAlert"
      border="start"
      :border-color="Tokens.Colors.success"
    >
      <template v-slot:title>
        Resultados de {{ name }}
      </template>
      <div :class="Tokens.Typography.bodyText" class="mt-2">
        <strong>Edad actual:</strong> {{ currentAge }} años<br>
        <strong>Edad cuando comenzó a trabajar:</strong> {{ ageStartedWorking }} años
      </div>
    </v-alert>
  </v-expand-transition>
</template>
