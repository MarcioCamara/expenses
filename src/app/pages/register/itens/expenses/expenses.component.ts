import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Expense } from 'src/app/models/expense';
import { RevenueParameter } from 'src/app/models/revenue-parameter';
import { Status } from 'src/app/models/status';
import { ExpenseService } from 'src/app/services/expense.service';
import { RevenueParameterService } from 'src/app/services/revenue-parameter.service';
import { StatusesService } from 'src/app/services/statuses.service';

@Component({
  selector: 'app-register',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {
  expensesForm!: UntypedFormGroup;
  isAllChecked: boolean = false;
  expenses: Expense[] = [];
  expenseBeingEdited: Expense = null;
  isSomeExpenseChecked: boolean = false;
  revenuesParameter: RevenueParameter[];
  statuses: Status[];

  constructor(
    private formBuilder: UntypedFormBuilder,
    private expenseService: ExpenseService,
    private revenueParameterService: RevenueParameterService,
    private statusService: StatusesService,
  ) { }

  ngOnInit(): void {
    this.expensesForm = this.formBuilder.group({
      month: [null, [Validators.required]],
      name: [null, [Validators.required]],
      value: [null, [Validators.required]],
      paymentSource: [null, [Validators.required]],
      status: [null, [Validators.required]],
    });

    this.getRevenuesParameter();
    this.getStatuses();
  }

  getRevenuesParameter(): void {
    this.revenueParameterService.getAll()
      .subscribe((revenues: RevenueParameter[]) => {
        this.revenuesParameter = revenues;
      });
  }

  getStatuses(): void {
    this.statusService.getAll()
      .subscribe((statuses: Status[]) => {
        this.statuses = statuses;
      });
  }

  onMonthChange(): void {
    if (this.expensesForm.get('month').value) {
      this.getExpenses();
    }
  }

  getExpenses(): void {
    this.expenseService.getAll()
      .subscribe((expenses: Expense[]) => {
        this.filterExpenses(expenses);
      });
  }

  filterExpenses(expenses: Expense[]): void {
    const selectedDate = this.expensesForm.get('month').value;
    const selectedMonthYear = `${selectedDate.getMonth()}/${selectedDate.getFullYear()}`;

    this.expenses = expenses.filter((expense: Expense) => {
      const expenseMonthYear = `${expense.month.getMonth()}/${expense.month.getFullYear()}`;

      return selectedMonthYear === expenseMonthYear;
    });
  }

  addExpense(): void {
    if (this.expensesForm.valid) {
      const formValues: Expense = this.expensesForm.getRawValue();

      this.expenseService.create(formValues).then(() => {
        this.getExpenses();

        this.resetFormFields();
      });
    } else {
      Object.values(this.expensesForm.controls).forEach((control: AbstractControl<any, any>) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  resetFormFields(): void {
    this.expensesForm.get('name').reset();
    this.expensesForm.get('value').reset();
    this.expensesForm.get('paymentSource').reset();
    this.expensesForm.get('status').reset();
  }

  checkAll(value: boolean): void {
    this.isSomeExpenseChecked = value;

    for (let i = 0; i < this.expenses.length; i++) {
      const expense = this.expenses[i];
      expense.checked = value;
    }
  }

  checkIfIsSomeExpenseChecked(): void {
    this.isSomeExpenseChecked = false;
    let checkedExpenses: Expense[] = [];

    checkedExpenses = this.expenses.filter((expense: Expense) => expense.checked);

    this.isSomeExpenseChecked = checkedExpenses.length > 0;
    this.isAllChecked = checkedExpenses.length === this.expenses.length;
  }

  setExpenseBeingEdited(expense: Expense): void {
    this.expenseBeingEdited = expense;
  }

  updateEditedExpense(expense: Expense): void {
    this.expenseService.update(expense);
    this.expenseBeingEdited = null;
  }

  removeExpense(removedExpense: Expense, multiple = false): void {
    this.expenseService.delete(removedExpense.id);

    if (!multiple) {
      this.getExpenses();
    }
  }

  removeSelectedExpenses(): void {
    for (let i = 0; i < this.expenses.length; i++) {
      const expense = this.expenses[i];

      if (expense.checked) {
        this.removeExpense(expense, true);
      }
    }

    this.getExpenses();
  }
}
