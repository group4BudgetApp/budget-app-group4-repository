const FormBudget = () => {
    const transferData = (e) => {
        e.preventDefault()
    }
  return(

    <div>
        <form onSubmit={transferData}>
            <label htmlFor="totalIncome">Total Income:</label>
            <input type="text" id="totalIncome" name="totalIncome"/>
            <label htmlFor="daysNum">Over How Many Days?:</label>
            <input type="text" id="daysNum" name="daysNum"/>
        </form>
        <p></p>
    </div>
  )
}
export default FormBudget;