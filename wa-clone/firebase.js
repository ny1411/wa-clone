// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Auth -> step 1
import { getAuth } from "firebase/auth";
// Firestore -> step 1
import { getFirestore } from "firebase/firestore";

//Storage -> Step 1
import { getStorage } from "firebase/storage";

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCIi3GndlbO4nw4S0rIW9o8WV-CbumTzfw",
	authDomain: "react-wa-clone.firebaseapp.com",
	projectId: "react-wa-clone",
	storageBucket: "react-wa-clone.firebasestorage.app",
	messagingSenderId: "418248983237",
	appId: "1:418248983237:web:e79ceb871b5f27a57526ac",
	measurementId: "G-WGQ8P8FT24",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Auth -> step 2
const auth = getAuth();

//Firestore -> Step 2
const db = getFirestore();

//Storage -> Step 3
const storage = getStorage();

export { auth, db, storage };

/**
 * // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Auth -> step 1
import { getAuth } from "firebase/auth";
// Firestore -> step 1
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//Storage -> Step 1
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCIi3GndlbO4nw4S0rIW9o8WV-CbumTzfw",
	authDomain: "react-wa-clone.firebaseapp.com",
	projectId: "react-wa-clone",
	storageBucket: "react-wa-clone.firebasestorage.app",
	messagingSenderId: "418248983237",
	appId: "1:418248983237:web:e79ceb871b5f27a57526ac",
	measurementId: "G-WGQ8P8FT24",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth -> step 2
const auth = getAuth(app);
//Firestore -> Step 2
const db = getFirestore();

//Storage -> Step 3
const storage = getStorage();

export { auth, db, storage };

 */
