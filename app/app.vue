<script setup lang="ts">
import { Tokens } from '~/utils/themeTokens'
import CalculatorForm from '~/components/CalculatorForm.vue'
</script>

<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="6" lg="4">
            <v-card :elevation="Tokens.Elevation.card" :class="Tokens.Shape.cardRounding" theme="light">
              <v-toolbar :color="Tokens.Colors.primary" class="text-center" :elevation="Tokens.Elevation.toolbar">
                <v-toolbar-title :class="[Tokens.Typography.titleSize, Tokens.Typography.titleWeight, `text-${Tokens.Colors.white}`]">
                  Calculadora Laboral
                </v-toolbar-title>
              </v-toolbar>

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
.v-application {
  background: v-bind('Tokens.Colors.appBackgroundGradient') !important;
}
</style>
