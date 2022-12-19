const FormBudget = ({formBudgetOnChange, formBudgetOnSubmit}) => {
	// const transferData = (e) => {
	// 	e.preventDefault();
	// };
	return (
		<div>
			<form onSubmit={formBudgetOnSubmit} className="formBudget">
				<label htmlFor="userName">Name</label>
				<input type="text" id="userName" name="userName" placeholder="Please enter your name" maxLength={20} onChange={formBudgetOnChange} />
				<label htmlFor="totalIncome">Amount to budget:</label>
				<input type="text" id="totalIncome" name="totalIncome" placeholder="Amount" max={9999999999} min={0} step={0.01} onChange={formBudgetOnChange} />
				<label htmlFor="daysNum">How many days do you want your money to last?</label>
				<input type="text" id="daysNum" name="daysNum" placeholder="Days" max={31} min={1} step={1} onChange={formBudgetOnChange} />
				<button type="submit">Submit</button>
			</form>
			<p></p>
		</div>
	);
};
export default FormBudget;
