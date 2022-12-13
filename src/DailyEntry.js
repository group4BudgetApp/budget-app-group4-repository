const DailyEntry = () => {
	return (
		// flex-direction: row
		<section className="dailyEntry">
			{/* flex-direction: column */}
			<div className="dailyEntryLeft">
				{/* flex-direction: row */}
				<div className="flexContainer">
					{/* Change <p></p> to another tag if needed */}
					{/* Pass an argument to keep the number of days updated */}
					<p>Day 1</p>
					{/* Pass an argument to to keep the amount updated */}
					<p>$0</p>
				</div>
				{/* flex-direction: column */}
				<form action="">
					<label htmlFor="entryName">Entry Name</label>
					<input type="text" maxLength={20} minLength={1} id="entryName" name="entryName" />
					<label htmlFor="entryName">Entry Cost</label>
					<input type="number" max={999999999999} min={0} step={0.01} id="entryCost" name="entryCost" />
					<button>Submit</button>
				</form>
			</div>

			<div className="dailyEntryRight">
				<ul>
					{/* map through the data to display in li items */}
					<li>
						<p>Bananassssssssss</p>
						<p>$1000000000000000</p>
					</li>
				</ul>
			</div>
		</section>
	);
};

export default DailyEntry;
