import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./BudgetForm.css";
import Navbar from "../../components/NavBar/Navbar";
import { budgets } from "../../data/budgets";

type Expense = {
  amount: string;
  type: string;
  id: string;
};

type Budget = {
  id: string;
  name: string;
  totalSavings: number;
  income: number;
  expenses: Expense[];
};

const expenseTypes = [
  "Groceries",
  "Utilities",
  "Rent/Mortgage",
  "Transportation",
  "Gas/Fuel",
  "Dining Out",
  "Entertainment",
  "Health Care",
  "Insurance",
  "Clothing",
  "Education",
  "Gifts/Donations",
  "Travel",
  "Home Maintenance",
  "Electronics",
  "Personal Care",
  "Pet Care",
  "Childcare",
  "Taxes",
  "Subscriptions",
  "Savings/Investments",
  "Debt Repayment",
  "Furniture/Household Items",
  "Hobbies",
  "Fitness/Sports",
  "Student Loan",
  "Miscellaneous",
  "Other",
];

const BudgetForm = () => {
  const [budgetName, setBudgetName] = useState<string>("");
  const [income, setIncome] = useState<string>("");
  const [selectedExpenseType] = useState<string | undefined>(undefined);
  const [expenses, setExpenses] = useState<Expense[]>([
    { amount: "", type: "", id: uuidv4() },
  ]);
  const [totalSavings, setTotalSavings] = useState<number>(0);

  const findTotalSavings = () => {
    const expensesTotal = expenses.reduce((accum, currVal) => {
      accum += Number(currVal.amount);
      return accum;
    }, 0);

    const totalSavings = Number(income) - Number(expensesTotal.toFixed(2));

    return setTotalSavings(totalSavings);
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
    e: React.ChangeEvent<HTMLSelectElement>,
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

  const resetForm = () => {
    setBudgetName('')
    setExpenses([
      { amount: "", type: "", id: uuidv4() },
    ])
    setIncome("")
  }

  const handleSaveBudget = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const budget: Budget = {
      id: uuidv4(),
      name: budgetName,
      income: Number(income),
      expenses: expenses.filter((item) => item.amount),
      totalSavings,
    };
    budgets.push(budget)
    resetForm()
    console.log(budget);
  };

  useEffect(() => {
    findTotalSavings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expenses, income]);

  return (
    <>
      <Navbar />
      <div>
        <form className="budget-form" onSubmit={(e) => handleSaveBudget(e)}>
          <h3>Create New Budget</h3>
          <p className="subtext">
            Enter your total monthly income, categorize and add expenses, and
            calculate your total savings
          </p>
          <div className="name-and-income-row">
            <div className="label-and-field-container">
              <label htmlFor="budget-name">Budget Name *</label>
              <input
                className="text-input"
                id="budget-name"
                value={budgetName}
                onChange={(e) => setBudgetName(e.target.value)}
              />
            </div>
            <div className="label-and-field-container">
              <label htmlFor="income-amount-field'">Income *</label>
              <input
                className="text-input"
                id="income-amount-field"
                value={income}
                onChange={(e) => {
                  setIncome(e.target.value);
                }}
              />
            </div>
          </div>
          <button
            className="add-expense-button"
            onClick={(e) => {
              handleAddExpense(e);
            }}
          >
            Add Expense
          </button>
          <div className="expenses-container">
            {expenses.map((expense) => {
              return (
                <div key={expense.id} className="expense-row">
                  <div>
                    <input
                      className="text-input"
                      placeholder="Amount"
                      id="expense-amount"
                      type="number"
                      min={0}
                      step={".01"}
                      value={expense.amount}
                      onChange={(e) => {
                        handleExpenseAmountChange(e, expense);
                      }}
                    />
                  </div>
                  <div>
                    <select
                      className="text-input"
                      id="dropdown"
                      value={selectedExpenseType}
                      onChange={(e) => handleExpenseTypeChange(e, expense)}
                    >
                      <option value="">Select a category</option>
                      {expenseTypes.map((expenseType, index) => (
                        <option key={index} value={expenseType}>
                          {expenseType}
                        </option>
                      ))}
                    </select>
                    {selectedExpenseType && (
                      <p>You selected: {selectedExpenseType}</p>
                    )}
                  </div>
                  <button
                    disabled={
                      expenses.length <= 1 &&
                      expenses.filter((item) => !item.amount || !item.type)
                        .length <= 1
                    }
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
          <div className="total-and-save-row">
            <div className="total-savings">
              <div>Total Savings:</div>
              <div
                className={
                  totalSavings < 0 ? "total-negative" : "total-positive"
                }
              >
                ${totalSavings}
              </div>
            </div>
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
        {/* test for switching to new :id route */}
        {/* <Link to={`/budget/${uuidv4()}`}>
          <button>Link to thing</button>
        </Link> */}
      </div>
    </>
  );
};

export default BudgetForm;
