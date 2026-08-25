# Guía de Configuración: Ecosistema Google (Firebase Auth + Cloud Firestore)

Esta guía explica los pasos para habilitar el inicio de sesión exclusivo con **Google** y la base de datos **Cloud Firestore** en tu proyecto.

---

## 1. Crear el Proyecto en Firebase (Google Cloud)

1. Ve a [Firebase Console](https://console.firebase.google.com/) con tu cuenta de Google.
2. Haz clic en **Agregar proyecto** (o selecciona tu proyecto existente de Google Cloud).
3. Ingresa un nombre para el proyecto (ej. `Calculadora Laboral`) y completa los pasos.

---

## 2. Registrar la Aplicación Web y Obtener Credenciales

1. En la página principal de tu proyecto en Firebase Console, haz clic en el icono **Web** (`</>`) para agregar una app.
2. Asigna un nombre (ej. `calculadora-laboral-web`) y haz clic en **Registrar app**.
3. Copia los valores del objeto `firebaseConfig` y pégalos en tu archivo local `.env`:

```env
FIREBASE_API_KEY="AIzaSy..."
FIREBASE_AUTH_DOMAIN="tu-proyecto.firebaseapp.com"
FIREBASE_PROJECT_ID="tu-proyecto"
FIREBASE_STORAGE_BUCKET="tu-proyecto.appspot.com"
FIREBASE_MESSAGING_SENDER_ID="123456789..."
FIREBASE_APP_ID="1:123456789:web:..."
```

---

## 3. Habilitar Google Sign-In (Authentication)

1. En el menú lateral izquierdo de Firebase Console, ve a **Build (Compilación)** > **Authentication**.
2. Haz clic en **Comenzar (Get Started)** si es la primera vez.
3. En la pestaña **Sign-in method (Método de acceso)**, haz clic en **Google**.
4. Activa el interruptor **Habilitar**.
5. Selecciona el **Correo electrónico de asistencia del proyecto** y haz clic en **Guardar**.

---

## 4. Crear la Base de Datos Cloud Firestore

1. En el menú lateral, ve a **Build** > **Firestore Database**.
2. Haz clic en **Crear base de datos**.
3. Selecciona la ubicación más cercana (ej. `nam5 (us-central)` o `southamerica-east1`) y elige modo **Reglas de producción** (o modo prueba para desarrollo).
4. En la pestaña **Reglas (Rules)** de Firestore, define las siguientes reglas para proteger los datos de cada usuario:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /calculations/{calculationId} {
      // Solo el usuario propietario puede leer y escribir sus cálculos
      allow read, write: if request.auth != null && request.auth.uid == request.resource.data.userId;
      allow read, delete: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```
5. Haz clic en **Publicar**.

---

## 5. Probar en Desarrollo Local

1. Con tus variables en `.env`, inicia el servidor local:
   ```bash
   npm run dev
   ```
2. Abre `http://localhost:3000`. Serás redirigido a `/login`.
3. Haz clic en **"Continuar con Google"**.
4. ¡Inicia sesión con tu cuenta de Google y realiza cálculos con sincronización inmediata a Firestore!
