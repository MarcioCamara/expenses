import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Status } from 'src/app/models/status';
import { StatusesService } from 'src/app/services/statuses.service';

@Component({
  selector: 'app-status',
  templateUrl: './statuses.component.html',
  styleUrls: ['./statuses.component.scss']
})
export class StatusesComponent implements OnInit {
  statusesForm!: UntypedFormGroup;
  isAllChecked: boolean = false;
  statuses: Status[] = [];
  statusBeingEdited: Status = null;
  isSomeStatusChecked: boolean = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private statusService: StatusesService,
  ) { }

  ngOnInit(): void {
    this.statusesForm = this.formBuilder.group({
      name: [null, [Validators.required]],
    });

    this.getStatuses();
  }

  getStatuses(): void {
    this.statusService.getAll()
      .subscribe((statuses: Status[]) => {
        this.statuses = statuses;
      });
  }

  addStatus(): void {
    if (this.statusesForm.valid) {
      const formValues: Status = this.statusesForm.getRawValue();

      this.statusService.create(formValues).then(() => {
        this.getStatuses();

        this.resetFormFields();
      });
    } else {
      Object.values(this.statusesForm.controls).forEach((control: AbstractControl<any, any>) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  resetFormFields(): void {
    this.statusesForm.get('name').reset();
  }

  checkAll(value: boolean): void {
    this.isSomeStatusChecked = value;

    for (let i = 0; i < this.statuses.length; i++) {
      const status = this.statuses[i];
      status.checked = value;
    }
  }

  checkIfIsSomeStatusChecked(): void {
    this.isSomeStatusChecked = false;
    let checkedStatuses: Status[] = [];

    checkedStatuses = this.statuses.filter((status: Status) => status.checked);

    this.isSomeStatusChecked = checkedStatuses.length > 0;
    this.isAllChecked = checkedStatuses.length === this.statuses.length;
  }

  setstatusBeingEdited(status: Status): void {
    this.statusBeingEdited = status;
  }

  updateEditedStatus(status: Status): void {
    this.statusService.update(status);
    this.statusBeingEdited = null;
  }

  removeStatus(removedStatus: Status, multiple = false): void {
    this.statusService.delete(removedStatus.id);

    if (!multiple) {
      this.getStatuses();
    }
  }

  removeSelectedStatus(): void {
    for (let i = 0; i < this.statuses.length; i++) {
      const status = this.statuses[i];

      if (status.checked) {
        this.removeStatus(status, true);
      }
    }

    this.getStatuses();
  }
}
