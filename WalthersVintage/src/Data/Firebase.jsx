import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'; // Importér de nødvendige Firestore-funktioner
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth'; // Importér Auth-tjenesten

// Firebase-konfiguration
const firebaseConfig = {
    apiKey: "AIzaSyC6rnD0gyDVtyvjPvXsKuYN5Nemww25DC0",
    authDomain: "walthersvintage.firebaseapp.com",
    projectId: "walthersvintage",
    storageBucket: "walthersvintage.firebasestorage.app",
    messagingSenderId: "924428214048",
    appId: "1:924428214048:web:25a4f813fa7bb666418145",
    measurementId: "G-YXXCRCWCP7"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Firebase-tjenester
const db = getFirestore(app); // Firestore instance
const storage = getStorage(app); // Firebase Storage instance
const auth = getAuth(app); // Authentication instance

// Eksportér Firestore-funktioner
export { db, storage, auth, doc, setDoc, getDoc, updateDoc };
