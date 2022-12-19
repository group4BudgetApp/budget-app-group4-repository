import SplashLogo from "./SplashLogo";
import {Link} from "react-router-dom";

const Home = () => {
	return (
		<>
			<section className="welcomeContainer shadowStatic">
				<SplashLogo />
				<Link className="rectangleButton shadow" to="/signup">
					<p>Create a new profile</p>
				</Link>
				<Link className="rectangleButton shadow" to="/login">
					<p>Log In</p>
				</Link>
			</section>
		</>
	);
};

export default Home;
