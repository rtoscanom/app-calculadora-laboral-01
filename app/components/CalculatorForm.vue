<script setup lang="ts">
import { Tokens } from '~/utils/themeTokens'
import { useCalculator } from '~/composables/useCalculator'
import ResultsAlert from './ResultsAlert.vue'
import { ref } from 'vue'

const {
  valid,
  name,
  idCard,
  birthYear,
  workStartYear,
  showResults,
  currentAge,
  ageStartedWorking,
  rules,
  calculate,
  resetForm,
} = useCalculator()

const formRef = ref<any>(null)

const onCalculate = async () => {
  await calculate(formRef.value)
}

const onResetForm = () => {
  resetForm(formRef.value)
}
</script>

<template>
  <v-form ref="formRef" v-model="valid" @submit.prevent="onCalculate">
    <!-- Note: We use color="primary" and basecolor="white" or text/bg colors for modern solo fields -->
    <v-text-field
      v-model="name"
      label="Nombre completo"
      :rules="[rules.required]"
      variant="solo-filled"
      flat
      density="comfortable"
      :color="Tokens.Colors.primary"
      bg-color="white"
      :class="Tokens.Shape.inputRounding"
      class="mb-3 custom-input"
      prepend-inner-icon="mdi-account"
    ></v-text-field>

    <v-text-field
      v-model="idCard"
      label="Número de cédula"
      :rules="[rules.required, rules.numeric]"
      variant="solo-filled"
      flat
      density="comfortable"
      :color="Tokens.Colors.primary"
      bg-color="white"
      :class="Tokens.Shape.inputRounding"
      class="mb-3 custom-input"
      prepend-inner-icon="mdi-card-account-details"
    ></v-text-field>

    <v-text-field
      v-model.number="birthYear"
      label="Año de nacimiento"
      type="number"
      :rules="[rules.birthYearValid]"
      variant="solo-filled"
      flat
      density="comfortable"
      :color="Tokens.Colors.primary"
      bg-color="white"
      :class="Tokens.Shape.inputRounding"
      class="mb-3 custom-input"
      prepend-inner-icon="mdi-calendar-star"
    ></v-text-field>

    <v-text-field
      v-model.number="workStartYear"
      label="Año de inicio laboral"
      type="number"
      :rules="[rules.workStartValid]"
      variant="solo-filled"
      flat
      density="comfortable"
      :color="Tokens.Colors.primary"
      bg-color="white"
      :class="Tokens.Shape.inputRounding"
      class="mb-3 custom-input"
      prepend-inner-icon="mdi-briefcase"
    ></v-text-field>

    <ResultsAlert
      v-if="showResults"
      :name="name"
      :current-age="currentAge"
      :age-started-working="ageStartedWorking"
    />

    <v-card-actions :class="Tokens.Spacing.paddingActions" class="flex-column ga-3">
      <v-btn
        type="submit"
        :color="Tokens.Colors.primary"
        variant="flat"
        size="x-large"
        class="text-none w-100"
        :class="Tokens.Shape.buttonRounding"
        :disabled="!valid"
      >
        Order now <!-- Keep "Order now" style from mockup or use "Calcular" but heavily stylized -->
        <span class="ml-2">Calcular</span>
      </v-btn>
      <v-btn
        type="button"
        variant="text"
        :color="Tokens.Colors.greyDark"
        size="large"
        class="text-none w-100"
        :class="Tokens.Shape.buttonRounding"
        @click="onResetForm"
        prepend-icon="mdi-refresh"
      >
        Limpiar formulario
      </v-btn>
    </v-card-actions>
  </v-form>
</template>

<style scoped>
/* Vuetify forces some internal border-radius on elements we want to fully round. We override via pure CSS if necessary based on Atomic Vibe. */
:deep(.v-field) {
  border-radius: 20px !important; 
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.03) !important;
}
</style>
