import "./App.css";
import firebase from "./firebase";
import FormBudget from "./FormBudget";
import {useState, useEffect} from "react";
import {getDatabase, ref, onValue, push, remove, get, update, set} from "firebase/database";
import Arrow from "./Arrow";
import Logo from "./Logo";
import NavBar from "./NavBar";
import LiveBudget from "./LiveBudget";
import DailyEntry from "./DailyEntry";
import SearchBar from "./SearchBar";

function App() {
	// pieces of state
	const [userBudgetData, setUserBudgetData] = useState({});
	// these take the user's input in the DailyEntry Form
	const [inputPrice, setInputPrice] = useState('');
	const [inputItem, setInputItem] = useState('');
	// these hold the data (originally from the DailyEntry Form) to be sent to the database
	const [item, setItem] = useState('');
	const [price, setPrice] = useState('');
	const [userID, setUserID] = useState('');
	const [userData, setUserData] = useState('');
	const [currentDay, setCurrentDay] = useState('');


	// Firebase initialization
	const database = getDatabase(firebase);
	// Firebase location: global scope of the database
	const dbRef = ref(database);
	// Firebase location: inside the individual ID
	const dbUserInit = ref(database, `/${userID}`);
	// Firebase location: to the individual days within the spending node
	const dbUserDaily = ref(database, `/${userID}/spending/day`);
	// Firebase location: to the liveData node
	const dbLiveData = ref(database, `/${userID}/liveData`);
	

	// tracks the changes within the FormBudget and stores the changes within a state
	const formBudgetOnChange = (e) => {
		// storing the changes within a variable so that we could pair it to a property inside an object
		const tempValue = e.target.value;
		setUserBudgetData({
			...userBudgetData,
			// targeting the name attribute and then pairing it as a property to the temp value which acts as the value of the key value pair
			[e.target.name]: tempValue,
		});
		console.log(userBudgetData);
	};

	// handles the submission of the FormBudget and push it to firebase. also retrieves the key and stores it in a state.
	const formBudgetOnSubmit = (e) => {
		// Prevent refrsesh
		e.preventDefault();
		// we create a new object key value pair where the property is initData and we pair is with the object of userBudgetData as the value so that it would get sent to firebase as an object
		const tempObj = {initData: userBudgetData};
		// we are creating an event object of the push to firebase
		const pushEvent = push(dbRef, tempObj);

		// by accessing the event object of the push, we are able to retrieve the firebase key, and then store it inside a state which we can refer to later

		console.log(pushEvent);

		setUserID(pushEvent._path.pieces_[0]);

		const dbTemp = ref(database, `/${pushEvent._path.pieces_[0]}/liveData`);


		// push a duplicate of the totalIncome to firebase
		const balance = {userBalance: userBudgetData.totalIncome};
		console.log(userBudgetData.totalIncome)
		update(dbTemp, balance);
		
		e.target.reset();
	};

	// handles the submission of the search bar which accepts user ID and retrieves the data by calling the function getUserData
	const searchBarOnSubmit = (e) => {
		e.preventDefault();
		getUserData();
	};

	// function responsible for retrieving user data from firebase based on the userID state
	const getUserData = () => {
		get(dbUserInit).then((data) => {
			const tempData = data.val();
			setUserData(tempData);
			console.log(userData);
		});
	};
	
	const copyID = () => {
		navigator.clipboard.writeText(userID);
	};

	// this function handles what is pushed up to firebase on submission of the dailyEntry Form
	const handleSubmit = (e) => {
    // prevent default browser refresh after form submission
    e.preventDefault();
	// temporary setting of the currentDay until counter is implemented
	setCurrentDay("Day1");

	const dbPacked = {
		[inputItem]: inputPrice
	}
	// push dbPacked up to dbUserDaily
	push(dbUserDaily, dbPacked);

    // after submission, replace the input with an empty string, as the content of the last submit has already been pushed to the database above
	// e.target.reset();
    }    


	// the handlePriceChange function handles the user's inputPrice as it is typed into the DailyEntry form
  	const handlePriceChange = (e) => {
    // this tells react to update the state of the App component to include whatever is currently the value of the input of the form
    setInputPrice(e.target.value);
  	}

	// the handleItemChange function handles the user's inputItem as it is typed into the DailyEntry form
	const handleItemChange = (e) => {
    // this tells react to update the state of the App component to include whatever is currently the value of the input of the form
    setInputItem(e.target.value);
  	}

	// declare counter, set it to 0 to start
	let counter = 0; 

	// this function adds 1 to counter each time the arrow is clicked, and sends it up to firebase
	const countUp = () => {
		counter++;
		const counterPacked = {
			counter: counter
		}
		update(dbLiveData, counterPacked)
		liveBudget();
	}

	
	const liveBudget = () => {
		console.log((userData.initData.totalIncome / (userData.initData.daysNum - counter)).toFixed(2)) 
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
					{/* ternary operator used to display user sign-up/login  */}
					{userData.initData ? (
						<>
							<section className="budgetForm">
								{/* budgetForm Component */}
								<h2>Hi {userData.initData.userName}, let's start budgeting!</h2>
								<p>Average Daily Budget: ${userData ? (userData.initData.totalIncome / userData.initData.daysNum).toFixed(2) : null}</p>
							</section>
							<section className="liveBudget">
								{/* LiveBudget Component */}
								<LiveBudget />
							</section>
							<section className="arrowButton">
								<Arrow 
								countUp={countUp}
								/>
							</section>
							<section className="expensesForm">
								{/* expensesForm Component */}
								<DailyEntry inputPrice={inputPrice} inputItem={inputItem} handleSubmit={handleSubmit} handleItemChange={handleItemChange} handlePriceChange={handlePriceChange} />
							</section>
						</>
					) : (
						<>
							{userID ? (
								<>
									<h2>
										Your user ID is: <span onClick={copyID}>{userID}</span>.
									</h2>
									<p>Please use your ID to login. You can copy your user ID by clicking on it.</p>
								</>
							) : null}

							<FormBudget formBudgetOnChange={formBudgetOnChange} formBudgetOnSubmit={formBudgetOnSubmit} />
							<SearchBar setUserID={setUserID} searchBarOnSubmit={searchBarOnSubmit} />
						</>
					)}
				</main>
				<footer>{/* Footer Component */}</footer>
			</div>
			{/* End of Wrapper */}
		</div> // End of App

		// Routes
	);
}

export default App;
