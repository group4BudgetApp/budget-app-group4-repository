const Balance = ({ userBalance, daysUntil }) => {

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
