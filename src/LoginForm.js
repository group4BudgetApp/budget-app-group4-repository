import {get, ref, getDatabase} from "firebase/database";
import firebase from "./firebase";
import {Link, Navigate, redirect, useNavigate} from "react-router-dom";

const LoginForm = ({setUserID, setSignUpData, userID, setUserBalance, userBalance, dbBalance}) => {
	const dbInitData = ref(getDatabase(firebase), `/userProfiles/${userID}/signUpData`);

	const loginOnChange = (e) => {
		setUserID(e.target.value);
	};
	const getUserSignUpData = () => {
		get(dbInitData).then((snapshot) => {
			if (snapshot.exists()) {
				setSignUpData(snapshot.val());
				console.log(snapshot.val());
			} else {
				console.log("Sign up data could not be found");
			}
		});
	};

	const getUserBalance = () => {
		get(dbBalance).then((snapshot) => {
			if (snapshot.exists()) {
				setUserBalance(snapshot.val());
				console.log(snapshot.val());
			} else {
				console.log(snapshot.val());
			}
		});
	};
	const loginOnSubmit = (e) => {
		e.preventDefault();
		getUserSignUpData();
		getUserBalance();
	};

	return (
		<>
			<section className="welcomeContainer shadowStatic">
				<h2>Log In</h2>
				<form onSubmit={loginOnSubmit}>
					<input type="text" placeholder="Login with your ID" onChange={loginOnChange} />
					<button type="submit" className="rectangleButton">
						Next
					</button>
					{userBalance ? <Navigate to="/spendingForm" /> : null}
				</form>
			</section>
		</>
	);
};

export default LoginForm;
