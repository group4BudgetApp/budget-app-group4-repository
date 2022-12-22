import { get, ref, getDatabase, set } from "firebase/database";
import firebase from "./firebase";
import { Navigate } from "react-router-dom";

// Component responsible for receiving the userID to retrieve the user's profile information
const LoginForm = ({ setUserID, setSignUpData, userID, setUserBalance, dbBalance, setUserLogin, userLogin }) => {
	// referencing the user's signUpData
	const dbInitData = ref(getDatabase(firebase), `/userProfiles/${userID}/signUpData`);


	// Tracks the changes inside the input form
	const loginOnChange = (e) => {
		setUserID(e.target.value);
	};

	// Function responsible for retrieving user signUpData
	const getUserSignUpData = () => {
		get(dbInitData).then((snapshot) => {
			// Checking if the data is present
			if (snapshot.exists()) {
				// Setting the signUpData into a state
				setSignUpData(snapshot.val());
				// set user as 'logged in'
				setUserLogin(!userLogin);
			} else {
				alert("Please check your profile ID and try again");
			}
		});
	};

	// Retrieves user balance
	const getUserBalance = () => {
		get(dbBalance).then((snapshot) => {
			if (snapshot.exists()) {
				setUserBalance(snapshot.val());
			} else {
			} return;
		});
	};

	// onSubmit of the form, this will run two other functions
	const loginOnSubmit = (e) => {
		e.preventDefault();
		getUserSignUpData();
		getUserBalance();
	};

	return (
		<>
			<section className="welcomeContainer shadowStatic">
				<h2>Log In</h2>
				<p className="message">Paste your profile ID below:</p>
				<form onSubmit={loginOnSubmit}>
					<input type="text" placeholder="Login with your ID" onChange={loginOnChange} maxLength="20" minLength={20} onKeyDown={(evt) => evt.key === '.' && evt.preventDefault()} />
					<button type="submit" className="rectangleButton">
						Next
					</button>
					{/* Checks whether the user has successfully signed in. If true, lead them to the spendingForm component. If   */}
					{userLogin ? <Navigate to="/spendingForm" /> : null}
				</form>
			</section>

		</>
	);
};

export default LoginForm;
