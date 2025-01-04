// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCiFdkursJSA-L4seQGVYVhckpM3m1JOsU",
    authDomain: "todolist-6832c.firebaseapp.com",
    projectId: "todolist-6832c",
    storageBucket: "todolist-6832c.firebasestorage.app",
    messagingSenderId: "770368833430",
    appId: "1:770368833430:web:fb1420de7b5bbef2a17fb7",
    measurementId: "G-RKXLCGJJ3L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;