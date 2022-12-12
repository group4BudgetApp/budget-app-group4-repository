import "./App.css";
import firebase from "./firebase";
import {getDatabase, ref} from "firebase/database";

// Firebase initialization
const database = getDatabase(firebase);
// dbRed will reference our database
const dbRef = ref(database);
// Test firebase
console.log(dbRef);

function App() {
	return <div className="App">
    <p>test</p>
  </div>;
}

export default App;
