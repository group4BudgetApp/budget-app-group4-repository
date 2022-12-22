import { Navigate } from "react-router-dom";

const SpendingInterface = ({ Balance, SpendingForm, SpendingDisplay, signUpData }) => {
    return (
        <>
            <h1 className="greetingMesssage">Hi {signUpData.userName}, let's start budgeting!</h1>
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

