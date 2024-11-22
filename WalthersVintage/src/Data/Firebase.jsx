import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyC6rnD0gyDVtyvjPvXsKuYN5Nemww25DC0",
    authDomain: "walthersvintage.firebaseapp.com",
    projectId: "walthersvintage",
    storageBucket: "walthersvintage.firebasestorage.app",
    messagingSenderId: "924428214048",
    appId: "1:924428214048:web:25a4f813fa7bb666418145",
    measurementId: "G-YXXCRCWCP7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Firestore instance
const storage = getStorage(app); // Firebase Storage instance

export { db, storage };