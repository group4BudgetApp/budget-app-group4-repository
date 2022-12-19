const SpendingDisplay = ({userSpendingData}) => {
	// Taking the object of userSpendingData, then for each key value pair, store them inside an array, then store the entire data set into an array

	// Parses the object into an array because we want to use the map method
	const dataArray = Object.entries(userSpendingData);
	return (
		<div className="spendingContainerDisplay">
			<ul className="spendingListDisplay">
				<li>
					<h2 className="listHeader">Expense</h2>
				</li>
				{/* Map through the array to display the information which we are looking to display */}
				{dataArray.map((index) => {
					// Object.keys returns the key of the object which in this case, represents the expense name
					return <li key={index[0]}>{Object.keys(index[1])}</li>;
				})}
			</ul>
			<ul className="spendingListDisplay">
				<li>
					<h2 className="listHeader">Cost</h2>
				</li>
				{dataArray.map((index) => {
					// Object.values returns the key of the object which in this case, represents the expense cost
					return <li key={index[0]}>${Object.values(index[1])}</li>;
				})}
			</ul>
		</div>
	);
};

export default SpendingDisplay;
