<script setup lang="ts">
import { ref, computed } from 'vue'

const currentYear = new Date().getFullYear()

// Form Data
const valid = ref(false)
const form = ref<any>(null)

const name = ref('')
const idCard = ref('')
const birthYear = ref<number | null>(null)
const workStartYear = ref<number | null>(null)

// Results state
const showResults = ref(false)

// Calculated results
const currentAge = computed(() => {
  if (birthYear.value) {
    return currentYear - birthYear.value
  }
  return null
})

const ageStartedWorking = computed(() => {
  if (workStartYear.value && birthYear.value) {
    return workStartYear.value - birthYear.value
  }
  return null
})

// Validation rules
const rules = {
  required: (v: any) => !!v || 'Este campo es obligatorio',
  numeric: (v: any) => /^\d+$/.test(v) || 'Debe ser numérico',
  birthYearValid: (v: number) => {
    if (!v) return 'Obligatorio'
    if (v > currentYear) return `El año debe ser menor o igual a ${currentYear}`
    return true
  },
  workStartValid: (v: number) => {
    if (!v) return 'Obligatorio'
    if (birthYear.value && v < birthYear.value) {
      return `El año debe ser mayor o igual al año de nacimiento (${birthYear.value})`
    }
    return true
  }
}

const calculate = async () => {
  const { valid: isValid } = await form.value.validate()
  if (isValid) {
    showResults.value = true
  }
}

const resetForm = () => {
  form.value?.reset()
  showResults.value = false
}
</script>

<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="6" lg="4">
            <v-card class="elevation-12 rounded-xl" theme="light">
              <v-toolbar color="primary" class="text-center" :elevation="4">
                <v-toolbar-title class="text-h5 font-weight-bold text-white">Calculadora Laboral</v-toolbar-title>
              </v-toolbar>

              <v-card-text class="pt-6">
                <v-form ref="form" v-model="valid" @submit.prevent="calculate">
                  <v-text-field
                    v-model="name"
                    label="Nombre completo"
                    :rules="[rules.required]"
                    variant="outlined"
                    density="comfortable"
                    color="primary"
                    prepend-inner-icon="mdi-account"
                  ></v-text-field>

                  <v-text-field
                    v-model="idCard"
                    label="Número de cédula"
                    :rules="[rules.required, rules.numeric]"
                    variant="outlined"
                    density="comfortable"
                    color="primary"
                    prepend-inner-icon="mdi-card-account-details"
                  ></v-text-field>

                  <v-text-field
                    v-model.number="birthYear"
                    label="Año de nacimiento"
                    type="number"
                    :rules="[rules.birthYearValid]"
                    variant="outlined"
                    density="comfortable"
                    color="primary"
                    prepend-inner-icon="mdi-calendar-star"
                  ></v-text-field>

                  <v-text-field
                    v-model.number="workStartYear"
                    label="Año de inicio laboral"
                    type="number"
                    :rules="[rules.workStartValid]"
                    variant="outlined"
                    density="comfortable"
                    color="primary"
                    prepend-inner-icon="mdi-briefcase"
                  ></v-text-field>

                  <!-- Results Alert -->
                  <v-expand-transition>
                    <v-alert
                      v-if="showResults"
                      type="success"
                      variant="tonal"
                      class="mt-4 mb-2"
                      border="start"
                      border-color="success"
                    >
                      <template v-slot:title>
                        Resultados de {{ name }}
                      </template>
                      <div class="mt-2 text-body-1">
                        <strong>Edad actual:</strong> {{ currentAge }} años<br>
                        <strong>Edad cuando comenzó a trabajar:</strong> {{ ageStartedWorking }} años
                      </div>
                    </v-alert>
                  </v-expand-transition>

                  <v-card-actions class="px-0 pt-4 pb-0">
                    <v-btn
                      type="button"
                      variant="tonal"
                      color="grey-darken-1"
                      size="large"
                      class="text-none flex-grow-1 mr-2"
                      @click="resetForm"
                      prepend-icon="mdi-refresh"
                    >
                      Limpiar
                    </v-btn>
                    <v-btn
                      type="submit"
                      color="primary"
                      variant="flat"
                      size="large"
                      class="text-none flex-grow-1 ml-2"
                      :disabled="!valid"
                      prepend-icon="mdi-calculator"
                    >
                      Calcular
                    </v-btn>
                  </v-card-actions>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
/* Optional: Adding a soft gradient background to the application */
.v-application {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%) !important;
}
</style>
