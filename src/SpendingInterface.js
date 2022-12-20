import SpendingForm from "./SpendingForm";
import SpendingDisplay from "./SpendingDisplay";
import Balance from "./Balance";
 
const SpendingInterface = ({getSpendingData, dbSpending, daysSince, userSpendingData, userBalance, setUserBalance, dbBalance, daysUntil, userID}) => {
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
                   />
                   <SpendingDisplay daysSince={daysSince} userSpendingData={userSpendingData} userBalance={userBalance} userID={userID} setUserBalance={setUserBalance}/>
               </div>
           </section>
       </>
   );
};
 
export default SpendingInterface;

