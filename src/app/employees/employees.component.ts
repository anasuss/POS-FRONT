import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee/employee.service';
import { EmployeeOut } from 'src/models/interfaces/employeeOut';
import { PagedResponse } from 'src/models/interfaces/pagedResponse';
import { TablePageEvent } from 'primeng/table';
import { FormControl, FormGroup } from '@angular/forms';
import { EmployeeFilter } from 'src/models/classes/employeeFilter';
import { debounceTime } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  ref: DynamicDialogRef | undefined;
  employees!: EmployeeOut[];
  employeeFilter: EmployeeFilter;
  totalRecords: number = 0;
  employeeSearch: FormGroup;
  loading: boolean = false;
  constructor(
    public dialogService: DialogService,
    private employeeService: EmployeeService,
    private messageService: MessageService
  ) {
    this.employeeFilter = new EmployeeFilter();
    this.employeeSearch = new FormGroup({
      nameSubstr: new FormControl(''),
    });
  }

  ngOnInit() {
    this.employeeSearch.valueChanges
      .pipe(debounceTime(300))
      .subscribe((values) => {
        this.onEmployeeSearch(values.nameSubstr);
      });

    this.loadEmployees();
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  onEmployeeSearch(nameSubstr: string | undefined = undefined): void {
    this.employeeFilter = new EmployeeFilter(nameSubstr);
    this.loadEmployees(nameSubstr);
  }

  pageChange(event: TablePageEvent): void {
    this.employeeFilter.pageNumber = event.first! / event.rows + 1;
    this.employeeFilter.pageSize = event.rows!;
    this.loadEmployees();
  }

  loadEmployees(nameSubstr: string | undefined = undefined): void {
    this.loading = true;
    this.employeeFilter.nameSubstr = nameSubstr;
    this.employeeService
      .getEmployees(this.employeeFilter)
      .subscribe((res: PagedResponse<EmployeeOut>) => {
        this.employees = res.list;
        this.totalRecords = res.total_records;
        this.loading = false;
      });
  }

  addEmployeeModal() {
    this.ref = this.dialogService.open(AddEmployeeComponent, {
      header: 'Add New Employee',
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
    });

    this.ref.onClose.subscribe(() => {
      this.loadEmployees();
    });
  }
}
