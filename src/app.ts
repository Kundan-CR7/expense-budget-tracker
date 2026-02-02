import express from "express";
import { ExpenseRoutes } from "./routes/expense.routes";

const app = express();
app.use(express.json());

const expenseRoutes = new ExpenseRoutes();
app.use("/api", expenseRoutes.router);

app.get("/", (_, res) => {
  res.send("Expense Tracker API is running 🚀");
});

export default app;
