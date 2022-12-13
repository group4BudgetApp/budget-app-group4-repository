import "./App.css";
import firebase from "./firebase";
import {getDatabase, ref} from "firebase/database";
import FormBudget from "./FormBudget";

// Firebase initialization
const database = getDatabase(firebase);
// dbRed will reference our database
const dbRef = ref(database);
// Test firebase
console.log(dbRef);

function App() {
	return <div className="App">
    <p>test</p>
    <FormBudget/>
  </div>;
}

export default App;
