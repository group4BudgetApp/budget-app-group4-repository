import "./App.css";
import firebase from "./firebase";
import {get, getDatabase, push, ref} from "firebase/database";
import {useEffect, useState} from "react";
import {Link, Routes, Route} from "react-router-dom";
import SignUp from "./SignUpForm";
import SpendingForm from "./SpendingForm";
import SpendingDisplay from "./SpendingDisplay";
import LoginForm from "./LoginForm";
import SplashLogo from "./SplashLogo";
import Home from "./Home";
import SpendingInterface from "./SpendingInterface";

function App() {
	// userID will be stored in this state
	const [userID, setUserID] = useState("");
	const [daysUntil, setDaysUntil] = useState(0);
	const [daysSince, setDaysSince] = useState(0);
	// User spending data from firebase will be stored in this state
	const [userSpendingData, setUserSpendingData] = useState({});

	// Form input onChange for the signUp data will be stored in this state
	const [signUpData, setSignUpData] = useState({});

	const [userBalance, setUserBalance] = useState(0);
	// const [currentDate, setCurrentDate] = ()
	const database = getDatabase(firebase);
	const dbSignUp = ref(database, `/userProfiles`);
	const dbSpending = ref(database, `/userProfiles/${userID}/spending/${daysSince}/`);

	const dbBalance = ref(getDatabase(firebase), `/userProfiles/${userID}/balance`);

	// Constant to convert milliseconds to days
	const toDay = 1 / 24 / 60 / 60 / 1000;

	// Accepts a parameter to input the date to be compared to
	const daysUntilPay = () => {
		const timeNow = new Date();
		const timeCompare = new Date(signUpData.nextPay);
		setDaysUntil(Math.ceil(Math.abs(timeCompare - timeNow) * toDay) + 1);
	};

	// Accepts a parameter to input the date to be compared to
	const daysSincePay = () => {
		const timeNow = new Date();
		const timeCompare = new Date(signUpData.signUpTime);

		console.table(timeCompare, timeNow, signUpData);
		setDaysSince(Math.floor(Math.abs(timeCompare - timeNow) * toDay));
	};

	useEffect(() => {
		daysUntilPay();
		daysSincePay();
	}, [signUpData]);

	useEffect(() => {
		get(dbSpending).then((snapshot) => {
			if (snapshot.exists()) {
				console.log("exists");
				setUserSpendingData(snapshot.val());
				const tempObj = snapshot.val();
				console.log(Object.entries(tempObj));
			} else {
				setUserSpendingData({});
				console.log("does not exists");
			}
		});
	}, [daysSince]);

	return (
		<div className="wrapper">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/signup" element={<SignUp userID={userID} setUserID={setUserID} dbSignUp={dbSignUp} signUpData={signUpData} setSignUpData={setSignUpData} />} />
				<Route
					path="/login"
					element={<LoginForm setUserID={setUserID} setSignUpData={setSignUpData} userID={userID} setUserBalance={setUserBalance} userBalance={userBalance} dbBalance={dbBalance} />}
				/>
				<Route
					path="/spendingForm"
					element={
						<>
							<SpendingInterface
								dbSpending={dbSpending}
								daysSince={daysSince}
								userSpendingData={userSpendingData}
								userBalance={userBalance}
								setUserBalance={setUserBalance}
								dbBalance={dbBalance}
								daysUntil={daysUntil}
							/>
						</>
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
