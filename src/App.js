import "./App.css";
import firebase from "./firebase";
import FormBudget from "./FormBudget";
import {useState, useEffect} from "react";
import {getDatabase, ref, onValue, push, remove, get} from "firebase/database";
import {Route, Routes} from "react-router-dom";
import Arrow from "./Arrow";
import Logo from "./Logo";
import NavBar from "./NavBar";
import LiveBudget from "./LiveBudget";
import DailyEntry from "./DailyEntry";

function App() {
	// pieces of state
	const [userBudgetData, setUserBudgetData] = useState({});
	const [inputPrice, setInputPrice] = useState('');
	const [inputItem, setInputItem] = useState('');
	const [userID, setUserID] = useState('');
	const [userData, setUserData] = useState('');

	// Firebase initialization
	const database = getDatabase(firebase);
	const dbRef = ref(database);

	const dbUser = ref(database,  `/${userID}`) 

	const formBudgetOnChange = (e) => {
		console.log(e.target.value);
		const tempValue = e.target.value;
		setUserBudgetData({
			...userBudgetData,
			[e.target.name]: tempValue,
		});
		console.log(userBudgetData);
	};

	const formBudgetOnSubmit = (e) => {
		e.preventDefault();
		const pushEvent = push(dbRef, userBudgetData);
		setUserID(pushEvent._path.pieces_[0])
		getUserData()
	};

	const getUserData = () => {
		get(dbUser)
		.then((data) => {
			const tempData = data.val()
			setUserData(tempData)
		})

	// the handleInputChange function handles the user's input as it is typed into the form
  	const handleInputChange = (e) => {
    // this tells react to update the state of the App component to include whatever is currently the value of the input of the form
    setInputPrice(e.target.value);
	setInputItem(e.target.value)
  	}

	// this function handles what is pushed up to firebase on submission of the dailyEntry Form
	const handleSubmit = (e) => {
    // prevent default browser refresh after form submission
    e.preventDefault();
    // create a database variable containing the imported firebase config
    const database = getDatabase(firebase);
    // create a variable that references this database
    const dbRef = ref(database);

    // push the userInput state (with its bound value property) to the database
    push(dbRef, inputPrice, inputItem)    
    // after submission, replace the input with an empty string, as the content of the last submit has already been pushed to the database above
    setInputPrice('');
	setInputItem('');
    }    
  


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
						<FormBudget formBudgetOnChange={formBudgetOnChange} formBudgetOnSubmit={formBudgetOnSubmit} />
						<p>Average Daily Budget:
							{ userData ? (userData.totalIncome / userData.daysNum).toFixed(2) : null}
							</p>
						<button onClick={getUserData}>ayo</button>
					</section>
					<section className="liveBudget">
						{/* LiveBudget Component */}
						<LiveBudget />
					</section>
					<section className="arrowButton">
						<Arrow />
					</section>
					<section className="expensesForm">
						{/* expensesForm Component */}
						<DailyEntry 
						inputPrice={inputPrice}
						inputItem={inputItem}
						handleSubmit={handleSubmit}
						handleInputChange={handleInputChange}
						/>
					</section>
				</main>
				<footer>{/* Footer Component */}</footer>
			</div>
			{/* End of Wrapper */}
		</div> // End of App

		// Routes
	);
}

export default App;
