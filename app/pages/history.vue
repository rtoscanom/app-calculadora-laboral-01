<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Tokens } from '~/utils/themeTokens'

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const loading = ref(true)
const items = ref<any[]>([])

const headers = [
  { title: 'Fecha', key: 'fecha_registro' },
  { title: 'Nombre', key: 'nombre' },
  { title: 'Cédula', key: 'cedula' },
  { title: 'Año Nac.', key: 'anio_nacimiento' },
  { title: 'Año Inicio Lab.', key: 'anio_inicio_laboral' },
  { title: 'Edad Actual', key: 'edad_calculada' },
  { title: 'Edad de Inicio', key: 'edad_inicio_laboral' },
]

onMounted(async () => {
  if (user.value) {
    const { data, error } = await supabase
      .from('calculations')
      .select('*')
      .order('fecha_registro', { ascending: false })
      
    if (!error && data) {
      items.value = data.map(i => ({
        ...i,
        fecha_registro: new Date(i.fecha_registro).toLocaleString()
      }))
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
        <div class="pa-4 text-center text-grey-darken-1">
          No tienes cálculos guardados aún.
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
