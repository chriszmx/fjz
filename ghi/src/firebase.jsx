// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB7feborWIgtNtgA35dlXqUzV4uTTo0Qhg",
    authDomain: "fjzfirebase.firebaseapp.com",
    projectId: "fjzfirebase",
    storageBucket: "fjzfirebase.appspot.com",
    messagingSenderId: "507236876799",
    appId: "1:507236876799:web:d823eb7b544492a8c667ca",
    measurementId: "G-EZ4P7EWD6V"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();
const storage = getStorage(app);
const auth = getAuth(app);

console.log(db)
console.log(app);
console.log(analytics);


export { app, analytics, db, storage, auth };
