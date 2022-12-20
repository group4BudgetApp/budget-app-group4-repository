import SpendingForm from "./SpendingForm";
import SpendingDisplay from "./SpendingDisplay";
import Balance from "./Balance";

const SpendingInterface = ({getSpendingData, dbSpending, daysSince, setDaysSince, userSpendingData, userBalance, setUserBalance, dbBalance, daysUntil, setDaysUntil}) => {
	return (
		<>
			<section className="spendingContainer">
				<Balance userBalance={userBalance} daysUntil={daysUntil} />
				<div className="interactiveContainer">
					<SpendingForm
						getSpendingData={getSpendingData}
						dbSpending={dbSpending}
						daysSince={daysSince}
						setUserBalance={setUserBalance}
						dbBalance={dbBalance}
						userBalance={userBalance}
						daysUntil={daysUntil}
						setDaysSince={setDaysSince}
						setDaysUntil={setDaysUntil}
					/>
					<SpendingDisplay daysSince={daysSince} userSpendingData={userSpendingData} userBalance={userBalance} />
				</div>
			</section>
		</>
	);
};

export default SpendingInterface;
