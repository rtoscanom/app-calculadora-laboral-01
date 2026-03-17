<script setup lang="ts">
import { Tokens } from '~/utils/themeTokens'
</script>

<template>
  <v-app :style="{ backgroundColor: 'var(--v-theme-background)' }">
    <v-main>
      <v-container class="fill-height" :class="Tokens.Spacing.pagePadding" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="10" md="8" lg="5">
            <NuxtPage />
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
