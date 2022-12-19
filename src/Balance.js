const Balance = ({userBalance, daysUntil}) => {
	return (
		<div className="userBalanceContainer">
			<h2>Live Balance: ${userBalance}</h2>
			<h2>Average Daily Budget: ${userBalance / daysUntil}</h2>
		</div>
	);
};

export default Balance;
