import { ref, computed } from 'vue'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { useAuth } from './useAuth'

export function useCalculator() {
  const currentYear = new Date().getFullYear()
  const nuxtApp = useNuxtApp()
  const { user } = useAuth()

  // Form Data
  const valid = ref(false)
  const name = ref('')
  const idCard = ref('')
  const birthYear = ref<number | null>(null)
  const workStartYear = ref<number | null>(null)

  // Results state
  const showResults = ref(false)
  const saving = ref(false)

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
      if (v < 1900) return 'Ingrese un año válido mayor a 1900'
      return true
    },
    workStartValid: (v: number) => {
      if (!v) return 'Obligatorio'
      if (v > currentYear) return `El año debe ser menor o igual a ${currentYear}`
      if (birthYear.value && v < birthYear.value) {
        return `El año debe ser mayor o igual al año de nacimiento (${birthYear.value})`
      }
      return true
    },
  }

  // Actuators
  const calculate = async (formInstance: any) => {
    if (formInstance) {
      const { valid: isValid } = await formInstance.validate()
      if (isValid) {
        showResults.value = true

        // Insert into Cloud Firestore (Google Cloud)
        if (import.meta.client && nuxtApp.$firestoreDb && user.value) {
          saving.value = true
          try {
            const db = nuxtApp.$firestoreDb
            await addDoc(collection(db, 'calculations'), {
              userId: user.value.uid,
              userEmail: user.value.email || '',
              nombre: name.value,
              cedula: idCard.value,
              anioNacimiento: birthYear.value,
              anioInicioLaboral: workStartYear.value,
              edadCalculada: currentAge.value,
              edadInicioLaboral: ageStartedWorking.value,
              fechaRegistro: new Date().toISOString(),
              createdAt: serverTimestamp(),
            })
          } catch (e) {
            console.error('Failed to save calculation to Firestore:', e)
          } finally {
            saving.value = false
          }
        }
      }
    }
  }

  const resetForm = (formRef: any) => {
    if (formRef) {
      formRef.reset()
    }
    name.value = ''
    idCard.value = ''
    birthYear.value = null
    workStartYear.value = null
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
    saving,

    // Computed Data
    currentAge,
    ageStartedWorking,

    // Tools
    rules,
    calculate,
    resetForm,
  }
}
