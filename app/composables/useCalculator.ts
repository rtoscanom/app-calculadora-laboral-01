import { ref, computed } from 'vue'

export function useCalculator() {
  const currentYear = new Date().getFullYear()

  // Form Data
  const valid = ref(false)
  const name = ref('')
  const idCard = ref('')
  const birthYear = ref<number | null>(null)
  const workStartYear = ref<number | null>(null)

  // Results state
  const showResults = ref(false)

  // Calculated results (Ciega a la UI - Solo números inmutables basados en Reactividad)
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

  // Validation rules (SoC - separated from component logic)
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

  // Actuators
  const calculate = async (formRef: any) => {
    if (!formRef) return
    const { valid: isValid } = await formRef.validate()
    if (isValid) {
      showResults.value = true
    }
  }

  const resetForm = (formRef: any) => {
    if (formRef) {
      formRef.reset()
    }
    showResults.value = false
  }

  return {
    // State
    valid,
    name,
    idCard,
    birthYear,
    workStartYear,
    showResults,
    
    // Computed Data
    currentAge,
    ageStartedWorking,
    
    // Tools
    rules,
    calculate,
    resetForm,
  }
}
