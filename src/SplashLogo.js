import logo from "./assets/budgetBuddyLogo.png";

// this component handles our splash logo
const SplashLogo = () => {
	return (
		<>
			<div className="imgContainer">
				<img src={logo} alt="Budget Buddy logo" />
			</div>
		</>
	);
};

export default SplashLogo;
