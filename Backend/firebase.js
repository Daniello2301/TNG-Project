const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore/lite');
const { defineString } = require('firebase-functions/params');
require('dotenv').config();

const firebaseConfig = {
    apiKey: "AIzaSyB-fl-WD1TvxHgCuf7BnL4GLH_y4w0oQ1U",
    authDomain: "thenextgenerationapp.firebaseapp.com",
    databaseURL: "https://thenextgenerationapp-default-rtdb.firebaseio.com",
    projectId: "thenextgenerationapp",
    storageBucket: "thenextgenerationapp.appspot.com",
    messagingSenderId: "740199577290",
    appId: "1:740199577290:web:0ea9e1831a8e7b7df5e633",
    measurementId: "G-44JJPR4LKB"

};

const app = initializeApp(firebaseConfig);
const connectFirebase = () => {
    getFirestore(app);
    console.log("Connect succesfully");
}

module.exports = connectFirebase;