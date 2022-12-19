// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyACVh8W22tUAXIlEtf2hknX1Ln_KKynKds",
	authDomain: "learning-firebase-2a5a8.firebaseapp.com",
	databaseURL: "https://learning-firebase-2a5a8-default-rtdb.firebaseio.com",
	projectId: "learning-firebase-2a5a8",
	storageBucket: "learning-firebase-2a5a8.appspot.com",
	messagingSenderId: "392889442435",
	appId: "1:392889442435:web:47827be5354c2cc3e33bb6",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;
