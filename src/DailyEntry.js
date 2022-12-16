const DailyEntry = ({inputPrice, inputItem, handleSubmit, handleItemChange, handlePriceChange, currentDay}) => {
	return (
		// flex-direction: row
		<section className="dailyEntry">
			{/* flex-direction: column */}
			<div className="dailyEntryLeft">
				{/* flex-direction: row */}
				<div className="flexContainer">
					{/* Change <p></p> to another tag if needed */}
					{/* Pass an argument to keep the number of days updated */}
					<p>Day {currentDay}</p>
					{/* Pass an argument to to keep the amount updated */}
					<p>$0</p>
				</div>
				{/* flex-direction: column */}
				<form action="">
					{/* Input Item */}
					<label htmlFor="entryName">Input Item</label>
					<input
						type="text"
						maxLength={20}
						minLength={1}
						id="entryName"
						name="entryName"
						// binding the inputItem state to the value attribute
						value={inputItem}
						onChange={handleItemChange}
					/>

					{/* Input Price */}
					<label htmlFor="entryName">Input Price</label>
					<input
						type="number"
						max={999999999999}
						min={0}
						step={0.01}
						id="entryCost"
						name="entryCost"
						// binding the inputPrice state to the value attribute
						value={inputPrice}
						onChange={handlePriceChange}
					/>
					<button onClick={handleSubmit}>Submit</button>
				</form>
			</div>

			<div className="dailyEntryRight">
				<ul>
					{/* map through the data to display in li items */}
					<li>
						<p></p>
						<p></p>
					</li>
				</ul>
			</div>
		</section>
	);
};

export default DailyEntry;
