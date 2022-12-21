import SpendingForm from "./SpendingForm";
import SpendingDisplay from "./SpendingDisplay";
import Balance from "./Balance";

const SpendingInterface = ({ Balance, SpendingForm, SpendingDisplay }) => {
    return (
        <>
            <section className="spendingContainer shadowStatic">
                {Balance}
                <div className="interactiveContainer">
                    {SpendingForm}
                    {SpendingDisplay}
                </div>
            </section>
        </>
    );
};

export default SpendingInterface;

