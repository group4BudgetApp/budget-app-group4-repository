import "./App.css";
import firebase from "./firebase";
import { get, getDatabase, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./SignUpForm";
import LoginForm from "./LoginForm";
import Home from "./Home";
import SpendingInterface from "./SpendingInterface";
import SpendingForm from "./SpendingForm";
import SpendingDisplay from "./SpendingDisplay";
import Balance from "./Balance";

function App() {
    // userID will be stored in this state
    const [userID, setUserID] = useState("");
    // when the signUp data retrieved, calculate the date difference in the daysUntilPay and daysSincePay functions and store them in the following states
    const [daysUntil, setDaysUntil] = useState(0);
    const [daysSince, setDaysSince] = useState(0);
    // User spending data from firebase will be stored in this state
    const [userSpendingData, setUserSpendingData] = useState({});

    // Form input onChange for the signUp data will be stored in this state
    const [signUpData, setSignUpData] = useState({});
    // This state contains a live updating balance. When spendings are pushed to firebase, this amount will decrease
    const [userBalance, setUserBalance] = useState(0);
    // referencing the entire database
    const database = getDatabase(firebase);
    // referencing the userProfiles node on firebase
    const dbSignUp = ref(database, `/userProfiles`);
    // referencing the spending node. a new node is created on a new day which is reflected using template literal ${daysSince}
    const dbSpending = ref(database, `/userProfiles/${userID}/spending/${daysSince}/`);
    // referencing the user's balance on firebase
    const dbBalance = ref(getDatabase(firebase), `/userProfiles/${userID}/balance`);

    // Constant to convert milliseconds to days
    const toDay = 1 / 24 / 60 / 60 / 1000;

    // Accepts a parameter to input the date to be compared to
    const daysUntilPay = () => {
        // Create a new Date object
        const timeNow = new Date();
        // Convert date string to a date object

        const timeCompare = new Date(signUpData.nextPay);
        // Date objects stores the milliseconds (since 1970 Jan 1st). By finding the difference between the time, we a number in milliseconds which when converted using the toDay multiplication factor, will give us the number of days. Making sure that the number is positive, we use Math.abs. One is added to the number as a correction factor.
        setDaysUntil(Math.ceil(Math.abs(timeCompare - timeNow) * toDay) + 1);
    };

    // Accepts a parameter to input the date to be compared to
    const daysSincePay = () => {
        // Create a new Date object
        const timeNow = new Date();
        // Convert date string to a date object
        const timeCompare = new Date(signUpData.signUpTime);
        setDaysSince(Math.floor(Math.abs(timeCompare - timeNow) * toDay));
    };

    // a useEffect which runs the date calculations when the page loads and when there is an update to signUpDate state comming from firebase
    useEffect(() => {
        daysUntilPay();
        daysSincePay();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [signUpData]);

    // a useEffect which gets the user's spending data and parses it then stores it into the userSpendingData state. This returns an object which contains key value pair of all the expense the user has input into the form
    // This use effect runs when a date is calculated (so when the user logs in), and also when the userBalance State is updated (to reflect the newest entries added by the user)
    useEffect(() => {
        get(dbSpending).then((snapshot) => {
            if (snapshot.exists()) {
                setUserSpendingData(snapshot.val());
            } else {
                setUserSpendingData({});
                console.log("does not exists");
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [daysSince, userBalance]);

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
                                Balance={<Balance userBalance={userBalance} daysUntil={daysUntil} />}
                                SpendingForm={<SpendingForm

                                    dbSpending={dbSpending}
                                    daysSince={daysSince}
                                    setUserBalance={setUserBalance}
                                    dbBalance={dbBalance}
                                    userBalance={userBalance}
                                    daysUntil={daysUntil}
                                    setDaysSince={setDaysSince}
                                    setDaysUntil={setDaysUntil}
                                />}
                                SpendingDisplay={<SpendingDisplay daysSince={daysSince} userSpendingData={userSpendingData} userBalance={userBalance} userID={userID} setUserBalance={setUserBalance} />}
                            />
                        </>
                    }
                />
            </Routes>
        </div>
    );
}

export default App;


