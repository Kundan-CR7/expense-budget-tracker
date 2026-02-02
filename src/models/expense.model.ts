import { Expense } from "../utils/expense.interface";

export class ExpenseModel {
    private expenses: Expense[] = [];

    create(expense: Expense): Expense {
        this.expenses.push(expense);
        return expense;
    }
    findAll(filters: any) {
        let results = [...this.expenses];

        if (filters.search) {
            results = results.filter(exp =>
            exp.title.toLowerCase().includes(filters.search.toLowerCase())
            );
        }

        if (filters.category) {
            results = results.filter(exp => exp.category === filters.category);
        }

        if (filters.minAmount) {
            results = results.filter(exp => exp.amount >= Number(filters.minAmount));
        }

        if (filters.maxAmount) {
            results = results.filter(exp => exp.amount <= Number(filters.maxAmount));
        }

        if (filters.sortBy) {
            results.sort((a, b) => {
            const order = filters.order === "desc" ? -1 : 1;
            return a[filters.sortBy] > b[filters.sortBy] ? order : -order;
            });
        }

        const page = Number(filters.page) || 1;
        const limit = Number(filters.limit) || 10;
        const start = (page - 1) * limit;
        const end = start + limit;

        return {
            total: results.length,
            page,
            limit,
            data: results.slice(start, end)
        };
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
