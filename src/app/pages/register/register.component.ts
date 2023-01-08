import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Expense {
  month: Date,
  name: string,
  value: number,
  paymentSource: string,
  status: string,
  checked: boolean;
  isBeingEdited: boolean;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  expensesForm!: FormGroup;

  allChecked: boolean = false;

  expenses: Expense[] = [];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.expensesForm = this.formBuilder.group({
      month: [null, [Validators.required]],
      name: [null, [Validators.required]],
      value: [null, [Validators.required]],
      paymentSource: [null, [Validators.required]],
      status: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    if (this.expensesForm.valid) {
      const formValues = this.expensesForm.getRawValue();
      const newExpense = {
        ...formValues,
        checked: false,
        isBeingEdited: false,
      };

      this.expenses = [
        ...this.expenses,
        newExpense,
      ];

      this.expensesForm.reset();
    } else {
      Object.values(this.expensesForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  checkAll(value: boolean): void {

  }

  saveExpenses(): void {

  }

  toggleEdit(expense: Expense): void {
    expense.isBeingEdited = !expense.isBeingEdited;
  }

  removeExpense(expense: Expense): void {

  }
}
