// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyB_msuY16IMAzdem3VWUoKnhuYRhZUOHa4",
	authDomain: "budgetapp-f5759.firebaseapp.com",
	databaseURL: "https://budgetapp-f5759-default-rtdb.firebaseio.com",
	projectId: "budgetapp-f5759",
	storageBucket: "budgetapp-f5759.appspot.com",
	messagingSenderId: "699291830100",
	appId: "1:699291830100:web:0911e2369d116e95376ac1",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;
