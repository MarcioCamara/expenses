import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Revenue } from 'src/app/models/revenue';
import { RevenueParameter } from 'src/app/models/revenue-parameter';
import { RevenueParameterService } from 'src/app/services/revenue-parameter.service';
import { RevenueService } from 'src/app/services/revenue.service';

@Component({
  selector: 'app-revenues',
  templateUrl: './revenues.component.html',
  styleUrls: ['./revenues.component.scss']
})
export class RevenuesComponent implements OnInit {
  revenuesForm!: UntypedFormGroup;
  isAllChecked: boolean = false;
  revenues: Revenue[] = [];
  revenueBeingEdited: Revenue = null;
  isSomeRevenueChecked: boolean = false;
  revenuesParameter: RevenueParameter[];

  constructor(
    private formBuilder: FormBuilder,
    private revenueParameterService: RevenueParameterService,
    private revenueService: RevenueService,
  ) { }

  ngOnInit(): void {
    this.revenuesForm = this.formBuilder.group({
      month: [null, [Validators.required]],
      name: [null, [Validators.required]],
      value: [null, [Validators.required]],
    });

    this.getRevenuesParameter();
  }

  getRevenuesParameter(): void {
    this.revenueParameterService.getAll()
      .subscribe((revenues: RevenueParameter[]) => {
        this.revenuesParameter = revenues;
      });
  }

  onMonthChange(): void {
    if (this.revenuesForm.get('month').value) {
      this.getRevenues();
    }
  }

  getRevenues(): void {
    this.revenueService.getAll()
      .subscribe((revenues: Revenue[]) => {
        this.filterRevenues(revenues);
      });
  }

  filterRevenues(expenses: Revenue[]): void {
    const selectedDate = this.revenuesForm.get('month').value;
    const selectedMonthYear = `${selectedDate.getMonth()}/${selectedDate.getFullYear()}`;

    this.revenues = expenses.filter((expense: Revenue) => {
      const expenseMonthYear = `${expense.month.getMonth()}/${expense.month.getFullYear()}`;

      return selectedMonthYear === expenseMonthYear;
    });
  }

  addRevenue(): void {
    if (this.revenuesForm.valid) {
      const formValues: Revenue = this.revenuesForm.getRawValue();

      this.revenueService.create(formValues).then(() => {
        this.getRevenues();

        this.resetFormFields();
      });
    } else {
      Object.values(this.revenuesForm.controls).forEach((control: AbstractControl<any, any>) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  resetFormFields(): void {
    this.revenuesForm.get('name').reset();
    this.revenuesForm.get('value').reset();
  }

  checkAll(value: boolean): void {
    this.isSomeRevenueChecked = value;

    for (let i = 0; i < this.revenues.length; i++) {
      const revenue = this.revenues[i];
      revenue.checked = value;
    }
  }

  checkIfIsSomeRevenueChecked(): void {
    this.isSomeRevenueChecked = false;
    let checkedRevenues: Revenue[] = [];

    checkedRevenues = this.revenues.filter((revenue: Revenue) => revenue.checked);

    this.isSomeRevenueChecked = checkedRevenues.length > 0;
    this.isAllChecked = checkedRevenues.length === this.revenues.length;
  }

  setRevenueBeingEdited(revenue: Revenue): void {
    this.revenueBeingEdited = revenue;
  }

  updateEditedRevenue(revenue: Revenue): void {
    this.revenueService.update(revenue);
    this.revenueBeingEdited = null;
  }

  removeRevenue(removedRevenue: Revenue, multiple = false): void {
    this.revenueService.delete(removedRevenue.id);

    if (!multiple) {
      this.getRevenues();
    }
  }

  removeSelectedRevenues(): void {
    for (let i = 0; i < this.revenues.length; i++) {
      const expense = this.revenues[i];

      if (expense.checked) {
        this.removeRevenue(expense, true);
      }
    }

    this.getRevenues();
  }
}
