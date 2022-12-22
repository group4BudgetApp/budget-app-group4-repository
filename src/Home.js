import SplashLogo from "./SplashLogo";
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<>
			<section className="welcomeContainer shadowStatic">
				<SplashLogo />
				<Link className="rectangleButton shadow" to="/signup">
					<h4>Create a new profile</h4>
				</Link>
				<Link className="rectangleButton shadow" to="/login">
					<h4>Log In</h4>
				</Link>
			</section>
		</>
	);
};

export default Home;
