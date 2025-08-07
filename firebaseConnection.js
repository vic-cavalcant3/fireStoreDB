// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuHEYu8HndfOTa11dENq_UDg8JJ8S-Tt4",
  authDomain: "victor-53854.firebaseapp.com",
  projectId: "victor-53854",
  storageBucket: "victor-53854.firebasestorage.app",
  messagingSenderId: "213990426440",
  appId: "1:213990426440:web:4231fadc2cdabb8e3e557d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const bancoExterno=getFirestore(app);
export {bancoExterno};