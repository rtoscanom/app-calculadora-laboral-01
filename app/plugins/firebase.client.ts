import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app'
import { getAuth, type Auth } from 'firebase/auth'
import { getFirestore, type Firestore } from 'firebase/firestore'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const firebaseConfig = {
    apiKey: config.public.firebaseApiKey,
    authDomain: config.public.firebaseAuthDomain,
    projectId: config.public.firebaseProjectId,
    storageBucket: config.public.firebaseStorageBucket,
    messagingSenderId: config.public.firebaseMessagingSenderId,
    appId: config.public.firebaseAppId,
  }

  let app: FirebaseApp | null = null
  let auth: Auth | null = null
  let db: Firestore | null = null

  const isConfigured = !!(firebaseConfig.apiKey && firebaseConfig.apiKey.trim() !== '')

  if (isConfigured) {
    try {
      app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)
      auth = getAuth(app)
      db = getFirestore(app)
    } catch (err) {
      console.warn('Firebase initialization error:', err)
    }
  }

  return {
    provide: {
      firebaseApp: app,
      firebaseAuth: auth,
      firestoreDb: db,
      isFirebaseConfigured: isConfigured,
    },
  }
})
