import { Expense } from "../utils/expense.interface";

export class ExpenseModel {
    private expenses: Expense[] = [];

    create(expense: Expense): Expense {
        this.expenses.push(expense);
        return expense;
    }

    findAll(): Expense[] {
        return this.expenses;
    }

    findById(id: string): Expense | undefined {
        return this.expenses.find(exp => exp.id === id);
    }

    delete(id: string): boolean {
        const index = this.expenses.findIndex(exp => exp.id === id);
        if (index === -1) return false;

        this.expenses.splice(index, 1);
        return true;
    }
}
