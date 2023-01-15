import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { RevenueParameter } from 'src/app/models/revenue-parameter';
import { RevenueParameterService } from 'src/app/services/revenue-parameter.service';

@Component({
  selector: 'app-revenues',
  templateUrl: './revenues.component.html',
  styleUrls: ['./revenues.component.scss']
})
export class RevenuesComponent implements OnInit {
  revenuesForm!: UntypedFormGroup;
  isAllChecked: boolean = false;
  revenues: RevenueParameter[] = [];
  revenueBeingEdited: RevenueParameter = null;
  isSomeRevenueChecked: boolean = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private revenueParameterService: RevenueParameterService,
  ) { }

  ngOnInit(): void {
    this.revenuesForm = this.formBuilder.group({
      name: [null, [Validators.required]],
    });

    this.getRevenues();
  }

  getRevenues(): void {
    this.revenueParameterService.getAll()
      .subscribe((revenues: RevenueParameter[]) => {
        this.revenues = revenues;
      });
  }

  addRevenue(): void {
    if (this.revenuesForm.valid) {
      const formValues: RevenueParameter = this.revenuesForm.getRawValue();

      this.revenueParameterService.create(formValues).then(() => {
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
    let checkedRevenues: RevenueParameter[] = [];

    checkedRevenues = this.revenues.filter((revenue: RevenueParameter) => revenue.checked);

    this.isSomeRevenueChecked = checkedRevenues.length > 0;
    this.isAllChecked = checkedRevenues.length === this.revenues.length;
  }

  setRevenueBeingEdited(revenue: RevenueParameter): void {
    this.revenueBeingEdited = revenue;
  }

  updateEditedRevenue(revenue: RevenueParameter): void {
    this.revenueParameterService.update(revenue);
    this.revenueBeingEdited = null;
  }

  removeRevenue(removedRevenue: RevenueParameter, multiple = false): void {
    this.revenueParameterService.delete(removedRevenue.id);

    if (!multiple) {
      this.getRevenues();
    }
  }

  removeSelectedRevenue(): void {
    for (let i = 0; i < this.revenues.length; i++) {
      const revenue = this.revenues[i];

      if (revenue.checked) {
        this.removeRevenue(revenue, true);
      }
    }

    this.getRevenues();
  }
}
