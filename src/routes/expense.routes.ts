import { Router } from "express";
import { ExpenseController } from "../controllers/expense.controller";

export class ExpenseRoutes {
    public router = Router();
    private controller = new ExpenseController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post("/expenses", this.controller.createExpense.bind(this.controller));
        this.router.get("/expenses", this.controller.getAllExpenses.bind(this.controller));
        this.router.get("/expenses/:id", this.controller.getExpenseById.bind(this.controller));
        this.router.delete("/expenses/:id", this.controller.deleteExpense.bind(this.controller));
    }
}
