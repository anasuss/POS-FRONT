import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ContractType } from 'src/models/enums/contractType';
import { Gender } from 'src/models/enums/gender';
import { Role } from 'src/models/enums/role';
import { AccountStatus } from 'src/models/enums/accountStatus';
import { EmployeeCreate } from 'src/models/interfaces/employeeCreate';
import { EmployeeService } from '../services/employee/employee.service';
import {
  emailValidator,
  cnssValidator,
  formatDate,
} from './helpers/employee-form.helpers';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent {
  employeeForm: FormGroup;
  isSubmitting: boolean = false;
  genderOptions = Object.values(Gender).map((g) => ({ label: g, value: g }));
  contractOptions = Object.values(ContractType).map((c) => ({
    label: c,
    value: c,
  }));
  roleOptions = [
    { label: 'Admin', value: Role.ADMIN },
    { label: 'Inventory Manager', value: Role.INVENTORY_MANAGER },
    { label: 'Superuser', value: Role.SUPERUSER },
    { label: 'Vendor', value: Role.VENDOR },
  ];

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private ref: DynamicDialogRef,
    private messageService: MessageService
  ) {
    this.employeeForm = this.createForm();
  }
  show() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Message Content',
    });
  }
  private createForm(): FormGroup {
    return this.fb.group(
      {
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        number: [null, Validators.required],
        gender: [Gender.MALE, Validators.required],
        phone: [null, Validators.required],
        email: [null, [Validators.required, emailValidator]],
        jobPosition: [null, Validators.required],
        address: [null, Validators.required],
        birthDate: [null, Validators.required],
        contractType: [ContractType.CDI, Validators.required],
        cnssNumber: [null],
        active: [true],
      },
      { validators: cnssValidator }
    );
  }

  get cnssCtrl(): AbstractControl | null {
    return this.employeeForm.get('cnssNumber');
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    const payload = this.buildPayload(this.employeeForm.value);
    this.isSubmitting = true;
    this.employeeService.AddEmployee(payload).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Employee created successfully',
        });
        this.ref.close();
      },
      error: (err) => {
        this.isSubmitting = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to create employee',
        });
      },
    });
  }

  private buildPayload(formValue: any): EmployeeCreate {
    return {
      first_name: formValue.firstName,
      last_name: formValue.lastName,
      email: formValue.email,
      number: Number(formValue.number),
      birth_date: formatDate(formValue.birthDate),
      address: formValue.address || undefined,
      cnss_number: formValue.cnssNumber || undefined,
      contract_type: formValue.contractType,
      gender: formValue.gender,
      account_status: formValue.active
        ? AccountStatus.ACTIVE
        : AccountStatus.INACTIVE,
      phone_number: formValue.phone || undefined,
      roles: formValue.jobPosition,
      password: undefined,
      confirm_password: undefined,
    };
  }
}
