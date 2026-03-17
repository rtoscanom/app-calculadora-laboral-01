import { ref, computed } from 'vue'

export function useCalculator() {
  const currentYear = new Date().getFullYear()
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

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
  const calculate = async (formInstance: any) => {
    if (formInstance) {
      const { valid: isValid } = await formInstance.validate()
      if (isValid) {
        showResults.value = true

        // Insert into Supabase
        const { data: { user: currentUser } } = await supabase.auth.getUser()
        
        if (currentUser && currentUser.id) {
          try {
            await supabase.from('calculations').insert({
              user_id: currentUser.id,
              nombre: name.value,
              cedula: idCard.value,
              anio_nacimiento: birthYear.value,
              anio_inicio_laboral: workStartYear.value,
              edad_calculada: currentAge.value, 
              edad_inicio_laboral: ageStartedWorking.value 
            } as any)
          } catch (e) {
            console.error('Failed to save calculation:', e)
          }
        }
      }
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
