import React, { useState } from "react";

type Expense = {
  amount: string;
  type: string;
};

const BudgetForm = () => {
  const [income, setIncome] = useState<number>(0);
  const [expenses, setExpenses] = useState<Expense[]>([
    { amount: "", type: "" },
  ]);

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    setExpenses([...expenses, { amount: "", type: "" }]);
  };

  return (
    <div>
      <h3>BudgetForm</h3>
      <form>
        <div>
          <label htmlFor="budget-name">Budget Name *</label>
          <input id="budget-name" />
        </div>
        <div>
          <label htmlFor="income-amount-field'">Income</label>
          <input
            id="income-amount-field"
            value={income}
            onChange={(e) => {
              setIncome(Number(e.target.value));
            }}
          />
        </div>
        <div>
          {expenses.map((expense, index) => {
            return (
              // Todo: figure out how to handle this input's onChange
              // Formik? find out how to do without formik though!
              <div key={index}>
                <label htmlFor="expense-type">Expense Type</label>
                <input id="expense-type" value={expense.type} />
                <label htmlFor="expense-amount">Amount</label>
                <input id="expense-amount" value={expense.amount} />
              </div>
            );
          })}
        </div>
        <div>
          <button onClick={(e) => handleAddExpense(e)}>Add Expense</button>
        </div>
        <div>
          <button>Save Budget</button>
        </div>
      </form>
    </div>
  );
};

export default BudgetForm;
