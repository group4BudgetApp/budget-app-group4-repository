const Balance = ({userBalance, daysUntil}) => {
	
	return (
		<div className="userBalanceContainer">
			<h2>Live Balance: ${userBalance}</h2>
			{
				daysUntil === 0 ? <h2>Average Daily Budget: ${userBalance}</h2> : <h2>Average Daily Budget: ${userBalance / (daysUntil + 1)}</h2>
			}
		</div>
	);
};

export default Balance;
