import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC4Neamyuj8Qjh7k0ztyo7Plb2qO5ro86s",
  authDomain: "globalservices-a2eea.firebaseapp.com",
  projectId: "globalservices-a2eea",
  storageBucket: "globalservices-a2eea.firebasestorage.app",
  messagingSenderId: "1029355986160",
  appId: "1:1029355986160:web:225d11699fa9e94dc23635"
};

// Inicializa Firebase con la configuración proporcionada
const app = initializeApp(firebaseConfig);

// Obtiene la instancia de Firestore
const db = getFirestore(app);

export default db;