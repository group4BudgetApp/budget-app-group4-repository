const FormBudget = ({formBudgetOnChange, formBudgetOnSubmit}) => {
	// const transferData = (e) => {
	// 	e.preventDefault();
	// };
	return (
		<div>
			<form onSubmit={formBudgetOnSubmit}>
				<label htmlFor="totalIncome">Total Income:</label>
				<input type="text" id="totalIncome" name="totalIncome" placeholder="Total Income" max={9999999999} min={0} step={0.01} onChange={formBudgetOnChange} />
				<label htmlFor="daysNum">Over How Many Days?:</label>
				<input type="text" id="daysNum" name="daysNum" placeholder="Over How Many Days?:" max={31} min={1} step={1} onChange={formBudgetOnChange} />
				<button type="submit">Submit</button>
			</form>
			<p></p>
		</div>
	);
};
export default FormBudget;
