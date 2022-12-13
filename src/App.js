import "./App.css";
import firebase from "./firebase";
import FormBudget from "./FormBudget";


import {useState, useEffect} from 'react';
import {getDatabase, ref, onValue, push, remove} from "firebase/database";
import {Route, Routes} from 'react-router-dom';
import Arrow from "./Arrow";
import Logo from "./Logo"
import NavBar from "./NavBar";
import LiveBudget from './LiveBudget';


function App() {


  useEffect(() => {
    // Firebase initialization
    const database = getDatabase(firebase);
    // dbRed will reference our database
    const dbRef = ref(database);
    // Test firebase
    console.log(dbRef);
  }, []) // End of useEffect


  // JSX
	return ( 
  <div className="App">
    <div className="wrapper">
    <header>
      {/* Logo Component */}
      <Logo />
      {/* Nav Bar Component */}
      <NavBar />
    </header>
    <main>
      <section className="budgetForm">
        {/* budgetForm Component */}
        <FormBudget/>
      </section>
      <secion className="liveBudget">
        {/* LiveBudget Component */}
        <LiveBudget />
      </secion>
      <section className="arrowButton">
        <Arrow />
      </section>
      <section className="expensesForm">
        {/* expensesForm Component */}
      </section>
    </main>
    <footer>
      {/* Footer Component */}
    </footer>
    </div> {/* End of Wrapper */}
  </div>; // End of App

// Routes
<Routes>
</Routes>       
  )
}

export default App;
