import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBiwKE1EZz4Qp_PqzZ38gLL9f3jSR916vQ",
  authDomain: "kasiblarinqadasinalim.firebaseapp.com",
  projectId: "kasiblarinqadasinalim",
  storageBucket: "kasiblarinqadasinalim.firebasestorage.app",
  messagingSenderId: "872092669218",
  appId: "1:872092669218:web:f8181b701b82f8b608c17b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {
  db,
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
};
