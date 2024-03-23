import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

type Expense = {
  amount: string;
  type: string;
  id: string;
};

type Budget = {
  name: string;
  totalSavings: number;
  income: number;
  expenses: Expense[];
};

const BudgetForm = () => {
  const [budgetName, setBudgetName] = useState<string>("");
  const [income, setIncome] = useState<number>(0);
  const [expenses, setExpenses] = useState<Expense[]>([
    { amount: "", type: "", id: uuidv4() },
  ]);
  const [totalSavings, setTotalSavings] = useState<number>(0);

  const findTotalSavings = () => {
    const expensesTotal = expenses.reduce((accum, currVal) => {
      accum += Number(currVal.amount);
      return accum;
    }, 0);

    return setTotalSavings(income - expensesTotal);
  };

  const handleAddExpense = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setExpenses([...expenses, { amount: "", type: "", id: uuidv4() }]);
  };

  const removeExpense = (expenseId: string) => {
    const filteredExpenses = expenses.filter(
      (expense) => expense.id !== expenseId
    );
    setExpenses(filteredExpenses);
  };

  const handleExpenseAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    expense: Expense
  ) => {
    const updatedExpenses: React.SetStateAction<Expense[]> = [];
    expenses.forEach((item) => {
      if (item.id === expense.id) {
        item.amount = e.target.value;
        updatedExpenses.push(item);
      } else {
        updatedExpenses.push(item);
      }
    });
    setExpenses(updatedExpenses);
  };
  const handleExpenseTypeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    expense: Expense
  ) => {
    const updatedExpenses: React.SetStateAction<Expense[]> = [];
    expenses.forEach((item) => {
      if (item.id === expense.id) {
        item.type = e.target.value;
        updatedExpenses.push(item);
      } else {
        updatedExpenses.push(item);
      }
    });
    setExpenses(updatedExpenses);
  };

  const handleSaveBudget = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const budget: Budget = {
      name: budgetName,
      income,
      expenses: expenses.filter((item) => item.amount),
      totalSavings,
    };

    console.log(budget);
  };

  useEffect(() => {
    findTotalSavings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expenses, income]);

  return (
    <div>
      <h3>Create New Budget</h3>
      <form onSubmit={(e) => handleSaveBudget(e)}>
        <div>
          <label htmlFor="budget-name">Budget Name *</label>
          <input
            id="budget-name"
            value={budgetName}
            onChange={(e) => setBudgetName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="income-amount-field'">Income *</label>
          <input
            id="income-amount-field"
            value={income}
            onChange={(e) => {
              setIncome(Number(e.target.value));
            }}
          />
        </div>
        <div>
          <button
            onClick={(e) => {
              handleAddExpense(e);
            }}
          >
            Add Expense
          </button>
        </div>
        <div>
          {expenses.map((expense) => {
            return (
              <div key={expense.id}>
                <label htmlFor="expense-type">Expense Type</label>
                <input
                  id="expense-type"
                  value={expense.type}
                  onChange={(e) => handleExpenseTypeChange(e, expense)}
                />
                <label htmlFor="expense-amount">Amount</label>
                <input
                  id="expense-amount"
                  type="number"
                  value={expense.amount}
                  onChange={(e) => {
                    handleExpenseAmountChange(e, expense);
                  }}
                />
                <button
                  disabled={expenses.length <= 1}
                  onClick={() => {
                    removeExpense(expense.id);
                  }}
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
        <div>
          <div>Total Savings: ${totalSavings}</div>
          {/* Todo: on save will POST this budget to an API*/}
          <button
            type="submit"
            disabled={
              expenses.filter((item) => item.amount).length < 1 ||
              !income ||
              !budgetName
            }
          >
            Save Budget
          </button>
        </div>
      </form>
    </div>
  );
};

export default BudgetForm;
