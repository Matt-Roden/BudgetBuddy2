import React from "react";
import { Link } from "react-router-dom";

const CreateBudgetButton = () => {
  return (
    <Link to="/create-budget">
      <button>Create Budget</button>
    </Link>
  );
};

export default CreateBudgetButton;
