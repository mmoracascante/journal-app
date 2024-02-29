// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyCAYueeF6tDC6EDWbbSReRVSyqqhgkfKaE",
//     authDomain: "react-journal-app-30c3c.firebaseapp.com",
//     projectId: "react-journal-app-30c3c",
//     storageBucket: "react-journal-app-30c3c.appspot.com",
//     messagingSenderId: "740744642369",
//     appId: "1:740744642369:web:4d5b1d01a4ddee87ef6bc0"
// };

// Testing
const firebaseConfig = {
    apiKey: "AIzaSyBRak4a5xTbpNRukyQlvOA6Pam4NdNF0u4",
    authDomain: "react-journal-testing-6a714.firebaseapp.com",
    projectId: "react-journal-testing-6a714",
    storageBucket: "react-journal-testing-6a714.appspot.com",
    messagingSenderId: "168509632114",
    appId: "1:168509632114:web:21e661f7751a557e7cdceb",
    measurementId: "G-FBJDLLQGMP"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp)
export const FirebaseDB = getFirestore(FirebaseApp)