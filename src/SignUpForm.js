import { push } from "firebase/database";
import { Link } from "react-router-dom";

// This component handles the Sign Up page of our app
const SignUp = ({ setUserID, dbSignUp, setSignUpData, signUpData, userID }) => {
	// Tracks changes in the SignUp component
	const signUpOnChange = (e) => {
		const tempVal = e.target.value;
		const currentTime = new Date().toISOString();

		setSignUpData({
			...signUpData,
			[e.target.name]: tempVal,
			signUpTime: currentTime,
		});
	};

	// Handles the onSubmit function of the signUp form. Pushes the data to firebase and calculates the number of days left until the next pay.
	const signUpOnSubmit = (e) => {
		e.preventDefault();
		const pushEvent = push(dbSignUp, { signUpData: signUpData, balance: parseInt(signUpData.income) });
		setUserID(pushEvent.key);
		e.target.reset();
	};

	// this allows this user to click on the unique ID and have it automatically copied to their clipboard
	const copyId = () => {
		navigator.clipboard.writeText(userID);
	};

	return (
		<section className="welcomeContainer shadowStatic">
			{userID ? (
				<>
					<p className="message">Save this profile ID to login in the future. <br></br> Click below to copy.</p>
					<p className="message">
						<span className="userIDStyle rectangleButton" onClick={copyId}>{userID}</span>
					</p>
					<Link className="rectangleButton shadow" to="/login">
						<p>Log In</p>
					</Link>
				</>
			) : (
				<>
					<h2>Sign Up</h2>
					<form onSubmit={signUpOnSubmit}>
						<label>Enter your name here:</label>
						<input type="text" id="userName" name="userName" placeholder="Name" onChange={signUpOnChange} />
						<label>Enter the amount to budget:</label>
						<input type="number" id="income" name="income" placeholder="Amount to budget" onChange={signUpOnChange} />
						<label>Enter your next payday:</label>

						<input type="date" id="nextPay" name="nextPay" placeholder="Next Pay" onChange={signUpOnChange} />
						<button type="submit" className="rectangleButton">
							Next
						</button>
					</form>
				</>
			)}
		</section>
	);
};

export default SignUp;
