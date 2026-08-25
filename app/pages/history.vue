<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { Tokens } from '~/utils/themeTokens'
import { useAuth } from '~/composables/useAuth'

const nuxtApp = useNuxtApp()
const { user } = useAuth()
const loading = ref(true)
const items = ref<any[]>([])

const headers = [
  { title: 'Fecha', key: 'fechaFormateada' },
  { title: 'Nombre', key: 'nombre' },
  { title: 'Cédula', key: 'cedula' },
  { title: 'Año Nac.', key: 'anioNacimiento' },
  { title: 'Año Inicio Lab.', key: 'anioInicioLaboral' },
  { title: 'Edad Actual', key: 'edadCalculada' },
  { title: 'Edad de Inicio', key: 'edadInicioLaboral' },
]

onMounted(async () => {
  if (import.meta.client && nuxtApp.$firestoreDb && user.value) {
    try {
      const db = nuxtApp.$firestoreDb
      const q = query(
        collection(db, 'calculations'),
        where('userId', '==', user.value.uid)
      )

      const querySnapshot = await getDocs(q)
      const records: any[] = []

      querySnapshot.forEach((doc) => {
        const data = doc.data()
        records.push({
          id: doc.id,
          ...data,
          fechaFormateada: data.fechaRegistro
            ? new Date(data.fechaRegistro).toLocaleString('es-CO')
            : '-',
        })
      })

      // Ordenar por fecha descendente en cliente
      records.sort((a, b) => {
        const dateA = new Date(a.fechaRegistro || 0).getTime()
        const dateB = new Date(b.fechaRegistro || 0).getTime()
        return dateB - dateA
      })

      items.value = records
    } catch (e) {
      console.error('Error fetching calculations from Firestore:', e)
    }
  }
  loading.value = false
})
</script>

<template>
  <div class="mb-6">
    <v-btn
      to="/"
      variant="text"
      :color="Tokens.Colors.surface"
      class="text-none mb-4"
      prepend-icon="mdi-arrow-left"
    >
      Volver a la Calculadora
    </v-btn>
    <h1 
      :class="[Tokens.Typography.titleSize, Tokens.Typography.titleWeight]" 
      :style="{ color: 'var(--v-theme-surface)' }"
    >
      Historial de Cálculos
    </h1>
  </div>

  <v-card 
    :elevation="Tokens.Elevation.card" 
    :class="[Tokens.Shape.cardRounding]" 
    color="surface"
  >
    <v-data-table
      :headers="headers"
      :items="items"
      :loading="loading"
      class="bg-transparent"
    >
      <template #no-data>
        <div class="pa-6 text-center text-grey-darken-1">
          <v-icon size="large" class="mb-2" color="grey">mdi-calculator-variant-outline</v-icon>
          <p>No tienes cálculos guardados aún en tu cuenta de Google.</p>
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>

<style scoped>
:deep(.v-data-table) {
  background-color: transparent !important;
}
:deep(th) {
  font-weight: bold !important;
  color: v-bind('Tokens.Colors.textHighlight') !important;
}
</style>
