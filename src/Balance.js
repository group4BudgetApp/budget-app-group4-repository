const Balance = ({ userBalance, daysUntil }) => {

	// This component calculates and displays the Live Balance and Average Daily Budget
	return (
		<div className="userBalanceContainer">

			<h2>Live Balance: ${userBalance.toFixed(2)}</h2>
			{
				daysUntil === 0 ? <h2>Average Daily Budget: ${userBalance.toFixed(2)}</h2> : <h2>Average Daily Budget: ${(userBalance / daysUntil).toFixed(2)}</h2>
			}
		</div>
	);
};

export default Balance;
