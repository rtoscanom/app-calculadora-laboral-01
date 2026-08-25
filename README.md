# 🧮 Calculadora Laboral (v3 - Google Ecosystem)

Aplicación web interactiva desarrollada con **Nuxt 4**, **Vuetify 4** y el ecosistema de **Google Cloud (Firebase Auth + Cloud Firestore)** para el cálculo de edad actual y años de inicio laboral, con persistencia en tiempo real en la nube.

---

## 🚀 Características Principales

* **Autenticación Exclusiva con Google:** Inicio de sesión en un clic con Google OAuth (`signInWithPopup`), con despliegue de perfil y avatar del usuario.
* **Cálculos en Tiempo Real:** 
  * Cálculo reactivo e instantáneo de edad actual (`Año actual - Año nacimiento`).
  * Cálculo de edad al iniciar a trabajar (`Año inicio laboral - Año nacimiento`).
* **Persistencia en Cloud Firestore:** Registro automático de cada cálculo asociado al `userId` del usuario de Google.
* **Historial de Cálculos:** Tabla interactiva (`v-data-table`) para consultar el histórico de cálculos ordenados cronológicamente.
* **Sistema de Diseño Nature Vibe:** Interfaz estilizada basada en tokens atómicos y componentes redondeados de Vuetify con iconos Material Design (`@mdi/font`).
* **Protección de Rutas:** Middleware global que restringe el acceso a las vistas principales a usuarios autenticados.

---

## 🛠️ Stack Tecnológico

* **Framework:** [Nuxt 4](https://nuxt.com/) (Vue 3.5 + Vite 7 + Nitro)
* **UI & Componentes:** [Vuetify 4](https://vuetifyjs.com/) + Sass + `@mdi/font`
* **Backend as a Service (BaaS):** [Firebase / Google Cloud](https://firebase.google.com/)
  * **Auth:** Google Sign-In Provider
  * **Database:** Cloud Firestore
* **Lenguaje:** TypeScript / JavaScript

---

## 📦 Instalación y Configuración Local

### 1. Clonar el repositorio e instalar dependencias

```bash
# Instalar dependencias
npm install
```

### 2. Configurar variables de entorno

Crea o edita el archivo `.env` en la raíz del proyecto con las credenciales de tu proyecto de Firebase / Google Cloud:

```env
FIREBASE_API_KEY="AIzaSy..."
FIREBASE_AUTH_DOMAIN="tu-proyecto.firebaseapp.com"
FIREBASE_PROJECT_ID="tu-proyecto"
FIREBASE_STORAGE_BUCKET="tu-proyecto.appspot.com"
FIREBASE_MESSAGING_SENDER_ID="123456789..."
FIREBASE_APP_ID="1:123456789:web:..."
```

*(Consulta [GUIA_GOOGLE_ECOSISTEMA.md](./GUIA_GOOGLE_ECOSISTEMA.md) para ver los pasos detallados de configuración en Firebase Console).*

### 3. Iniciar el servidor de desarrollo

```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

---

## 🏗️ Comandos Disponibles

* `npm run dev`: Inicia el servidor de desarrollo local.
* `npm run build`: Compila la aplicación para producción.
* `npm run preview`: Previsualiza la compilación de producción en local.

---

## 📄 Documentación Adicional

* [GUIA_GOOGLE_ECOSISTEMA.md](./GUIA_GOOGLE_ECOSISTEMA.md): Guía paso a paso para configurar Google Sign-In y Firestore en Firebase Console.
* [DIAGNOSTICO_REQUERIMIENTOS.md](./DIAGNOSTICO_REQUERIMIENTOS.md): Matriz de requerimientos y diagnóstico de arquitectura.
