<script setup lang="ts">
import { computed } from 'vue'
import { Tokens } from '~/utils/themeTokens'

const route = useRoute()
const colConfig = computed(() => {
  if (route.path === '/history') {
    return { cols: 12, sm: 11, md: 10, lg: 9, xl: 8 }
  }
  return { cols: 12, sm: 10, md: 8, lg: 5 }
})
</script>

<template>
  <v-app class="bg-background" :style="{ backgroundColor: 'rgb(var(--v-theme-background))' }">
    <v-main>
      <v-container class="fill-height" :class="Tokens.Spacing.pagePadding" fluid>
        <v-row align="center" justify="center">
          <v-col v-bind="colConfig">
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
