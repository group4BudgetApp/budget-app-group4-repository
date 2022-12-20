import {push, set} from "firebase/database";
import {useState} from "react";

const SpendingForm = ({dbSpending, setDaysSince, daysSince, userBalance, setUserBalance, dbBalance, daysUntil, setDaysUntil}) => {
	// Form input onChange for the spending data will be stored in this state
	const [newSpendingData, setNewSpendingData] = useState({});
	// Tracks changes in the SpendingForm
	const spendingOnChange = (e) => {
		// Store the changes inside a variable
		const tempVal = e.target.value;
		setNewSpendingData({
			// Spreading whatever existing data is in newSpendingData
			...newSpendingData,
			// Target the name attribute and use that as the property and pair it with the tempVal. Overwrites an existing value if the name matches to 'update' the value
			[e.target.name]: tempVal,
		});
		console.log(newSpendingData);
	};

	// Handles the submission behavior of the SpendingForm
	const spendingOnSubmit = (e) => {
		e.preventDefault();
		// Subtracts the userBalance by the expense cost
		const tempCalc = userBalance - newSpendingData.expenseCost;
		// Update the state with tempCalc
		setUserBalance(tempCalc);
		// Set tempCalc into firebase. Set because it will overwrite the previous entry (Updating the balance)
		set(dbBalance, tempCalc);
		// Push the key value pair of the expense to the spending node. Push to get a new firebase key.
		push(dbSpending, {[newSpendingData.expenseName]: parseInt(newSpendingData.expenseCost)});
		// Resets the form
		e.target.reset();
	};

	
	const nextDay = () => {
		if (daysUntil === 0) {
			return
		} else {
			setDaysSince(daysSince + 1)
			setDaysUntil(daysUntil - 1)
		}
	}

	const prevDay = () => {
		if (daysSince === 0) {
			return
		} else {
			setDaysSince(daysSince - 1)
			setDaysUntil(daysUntil + 1)
		}
	}


	return (
		<>
			<form onSubmit={spendingOnSubmit} className="spendingFormContainer">
				<h2 className="dayCount">Day: {daysSince}</h2>
				<h2 className="dayCount">Days until next pay: {daysUntil}</h2>
				<input type="text" id="expenseName" name="expenseName" placeholder="Expense Name" onChange={spendingOnChange} />
				<input type="number" id="expenseCost" name="expenseCost" placeholder="Expense Cost" onChange={spendingOnChange} />
				<button type="submit" className="rectangleButton">
					Submit Expense
				</button>
			</form>
				<button onClick={nextDay} className="nextDayButton">Next</button>
				<button onClick={prevDay} className="nextDayButton">Prev</button>
		</>
	);
};

export default SpendingForm;
