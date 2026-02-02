import { Request, Response } from "express";
import { ExpenseModel } from "../models/expense.model";
import { Expense } from "../utils/expense.interface";
import { v4 as uuid } from "uuid";

export class ExpenseController {
    private expenseModel = new ExpenseModel();

    createExpense(req: Request, res: Response) {
        const { title, amount, category, date, note } = req.body;

        if (!title || !amount || !category || !date) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const expense: Expense = {
            id: uuid(),
            title,
            amount: Number(amount),
            category,
            date: new Date(date),
            note,
            createdAt: new Date()
        };

        const createdExpense = this.expenseModel.create(expense);
        res.status(201).json(createdExpense);
    }

    getAllExpenses(req: Request, res: Response) {
        const expenses = this.expenseModel.findAll(req.query);
        res.json(expenses);
    }

    getExpenseById(req: Request, res: Response) {
        const expense = this.expenseModel.findById(req.params.id);

        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        res.json(expense);
    }

    deleteExpense(req: Request, res: Response) {
        const deleted = this.expenseModel.delete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: "Expense not found" });
        }

        res.json({ message: "Expense deleted successfully" });
    }
}
