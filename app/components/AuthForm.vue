<script setup lang="ts">
import { ref } from 'vue'
import { Tokens } from '~/utils/themeTokens'

const props = defineProps<{
  title: string
  subtitle: string
  submitText: string
  altLinkText: string
  altLinkTo: string
  errorMsg?: string
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', email: string, pass: string): void
}>()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const valid = ref(false)

const rules = {
  required: (value: any) => !!value || 'Campo requerido.',
  email: (value: string) => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || 'Email inválido.'
  },
  password: (value: string) => value.length >= 6 || 'Mínimo 6 caracteres',
}

const onSubmit = () => {
  if (valid.value) {
    emit('submit', email.value, password.value)
  }
}
</script>

<template>
  <v-card :elevation="Tokens.Elevation.card" :class="[Tokens.Shape.cardRounding, 'pa-6']" color="surface">
    <div class="text-center mb-6">
      <h2 :class="[Tokens.Typography.titleSize, Tokens.Typography.titleWeight, 'text-primary']">
        {{ title }}
      </h2>
      <p :class="Tokens.Typography.bodyText" class="text-grey-darken-1 mt-2">
        {{ subtitle }}
      </p>
    </div>

    <v-alert v-if="errorMsg" type="error" variant="tonal" class="mb-4" :class="Tokens.Shape.cardRounding">
      {{ errorMsg }}
    </v-alert>

    <v-form v-model="valid" @submit.prevent="onSubmit">
      <v-text-field
        v-model="email"
        label="Correo electrónico"
        :rules="[rules.required, rules.email]"
        variant="solo-filled"
        flat
        density="comfortable"
        :color="Tokens.Colors.primary"
        bg-color="white"
        :class="Tokens.Shape.inputRounding"
        class="mb-3 custom-input"
        prepend-inner-icon="mdi-email"
      ></v-text-field>

      <v-text-field
        v-model="password"
        label="Contraseña"
        :rules="[rules.required, rules.password]"
        :type="showPassword ? 'text' : 'password'"
        variant="solo-filled"
        flat
        density="comfortable"
        :color="Tokens.Colors.primary"
        bg-color="white"
        :class="Tokens.Shape.inputRounding"
        class="mb-6 custom-input"
        prepend-inner-icon="mdi-lock"
        :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append-inner="showPassword = !showPassword"
      ></v-text-field>

      <v-btn
        type="submit"
        :color="Tokens.Colors.primary"
        variant="flat"
        size="x-large"
        class="text-none w-100 mb-4"
        :class="Tokens.Shape.buttonRounding"
        :disabled="!valid"
        :loading="loading"
      >
        {{ submitText }}
      </v-btn>

      <div class="text-center">
        <v-btn
          :to="altLinkTo"
          variant="text"
          :color="Tokens.Colors.greyDark"
          class="text-none"
        >
          {{ altLinkText }}
        </v-btn>
      </div>
    </v-form>
  </v-card>
</template>

<style scoped>
:deep(.v-field) {
  border-radius: 20px !important; 
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.03) !important;
}
.text-primary {
  color: v-bind('Tokens.Colors.textHighlight') !important;
}
</style>
