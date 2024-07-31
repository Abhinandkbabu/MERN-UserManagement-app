import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-b6897.firebaseapp.com",
  projectId: "mern-auth-b6897",
  storageBucket: "mern-auth-b6897.appspot.com",
  messagingSenderId: "187392291596",
  appId: "1:187392291596:web:a0fcc1d18eb4db3a2d4f29"
};

export const app = initializeApp(firebaseConfig);
