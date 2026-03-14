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
    <v-text-field
      v-model="name"
      label="Nombre completo"
      :rules="[rules.required]"
      variant="outlined"
      density="comfortable"
      :color="Tokens.Colors.primary"
      prepend-inner-icon="mdi-account"
    ></v-text-field>

    <v-text-field
      v-model="idCard"
      label="Número de cédula"
      :rules="[rules.required, rules.numeric]"
      variant="outlined"
      density="comfortable"
      :color="Tokens.Colors.primary"
      prepend-inner-icon="mdi-card-account-details"
    ></v-text-field>

    <v-text-field
      v-model.number="birthYear"
      label="Año de nacimiento"
      type="number"
      :rules="[rules.birthYearValid]"
      variant="outlined"
      density="comfortable"
      :color="Tokens.Colors.primary"
      prepend-inner-icon="mdi-calendar-star"
    ></v-text-field>

    <v-text-field
      v-model.number="workStartYear"
      label="Año de inicio laboral"
      type="number"
      :rules="[rules.workStartValid]"
      variant="outlined"
      density="comfortable"
      :color="Tokens.Colors.primary"
      prepend-inner-icon="mdi-briefcase"
    ></v-text-field>

    <ResultsAlert
      v-if="showResults"
      :name="name"
      :current-age="currentAge"
      :age-started-working="ageStartedWorking"
    />

    <v-card-actions :class="Tokens.Spacing.paddingActions">
      <v-btn
        type="button"
        variant="tonal"
        :color="Tokens.Colors.greyDark"
        size="large"
        class="text-none flex-grow-1"
        :class="Tokens.Spacing.flexGrowSmallMarginRight"
        @click="onResetForm"
        prepend-icon="mdi-refresh"
      >
        Limpiar
      </v-btn>
      <v-btn
        type="submit"
        :color="Tokens.Colors.primary"
        variant="flat"
        size="large"
        class="text-none flex-grow-1"
        :class="Tokens.Spacing.flexGrowSmallMarginLeft"
        :disabled="!valid"
        prepend-icon="mdi-calculator"
      >
        Calcular
      </v-btn>
    </v-card-actions>
  </v-form>
</template>
