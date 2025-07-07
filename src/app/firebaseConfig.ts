// [firebase-config.ts]
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBWeyC7cSioYUjloRopLNirGLNwzG8NB2M",
    authDomain: "maintenanceapp-4b229.firebaseapp.com",
    projectId: "maintenanceapp-4b229",
    storageBucket: "maintenanceapp-4b229.appspot.com",
    messagingSenderId: "353080055845",
    appId: "1:353080055845:web:a59e3010cb1a1e536407cc"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
