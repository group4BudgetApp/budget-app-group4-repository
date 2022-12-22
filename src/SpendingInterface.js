// this page handles the spending interface of our app
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

