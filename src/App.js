import "./App.css";
import firebase from "./firebase";
import FormBudget from "./FormBudget";
import {useState, useEffect} from "react";
import {getDatabase, ref, onValue, push, remove, get} from "firebase/database";
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
	// //Firebase location: inside the individual ID
	const dbUserInit = ref(database, `/${userID}`);
	// Firebase location: to the individual days within the spending node
	const dbUserDaily = ref(database, `/${userID}/spending/day`);

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

		e.target.reset();
	};

	// handles the submission of the search bar which accepts user ID and retrieves the data by calling the function getUserData
	const searchBarOnSubmit = (e) => {
		e.preventDefault();
		getUserData();
	};

	// function responsible for retrieving user data from firebase based on the userID state
	const getUserData = () => {


	// this function handles what is pushed up to firebase on submission of the dailyEntry Form
	const handleSubmit = (e) => {
    // prevent default browser refresh after form submission
    e.preventDefault();
    // create a database variable containing the imported firebase config
    const database = getDatabase(firebase);
	// temporary setting of the currentDay until counter is implemented
	setCurrentDay("Day1");
	// this variable references the database for the item
	const dbItem = ref(database, `${currentDay}/${item}`)
	// this variable references the database for the price
	const dbPrice = ref(database, `${currentDay}/${price}`)
    // push the userInput state (with its bound value property) to the database
    push(dbItem, inputItem)    
	push(dbPrice, inputPrice)  
    // after submission, replace the input with an empty string, as the content of the last submit has already been pushed to the database above
    setInputPrice('');
	setInputItem('');
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

   // grabs user initialization data to get the app started
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
    // create a database variable containing the imported firebase config
    const database = getDatabase(firebase);
	// temporary setting of the currentDay until counter is implemented
	setCurrentDay("Day1");
	// this variable references the database for the item
	const dbItem = ref(database, `${currentDay}/${item}`)
	// this variable references the database for the price
	const dbPrice = ref(database, `${currentDay}/${price}`)
    // push the userInput state (with its bound value property) to the database
    push(dbItem, inputItem)    
	push(dbPrice, inputPrice)  
    // after submission, replace the input with an empty string, as the content of the last submit has already been pushed to the database above
    setInputPrice('');
	setInputItem('');
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
								<Arrow />
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
	);
}

export default App;
