import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee/employee.service';
import { ImportPossibleFields } from 'src/models/interfaces/importPossibleFields';
import { Matchy } from 'src/libs/matchy/src/main';
import { MatchyUploadEntry } from 'src/models/classes/matchyUploadEntry';
import { BaseOut } from 'src/models/interfaces/baseOut';
import { UploadEntry } from 'src/libs/matchy/src/models/classes/uploadEntry';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-import-employee',
  templateUrl: './import-employee.component.html',
  styleUrls: ['./import-employee.component.css'],
})
export class ImportEmployeeComponent implements OnInit {
  constructor(
    private employeeService: EmployeeService,
    private ref: DynamicDialogRef,
    private messageService: MessageService
  ) {}
  ngOnInit() {
    this.employeeService
      .GetPossibleFieldsForImport()
      .subscribe((res: ImportPossibleFields) => {
        const matchyOptions = res.options;
        const matchy = new Matchy(matchyOptions);
        document.getElementById('matchy')?.appendChild(matchy);
        matchy.submit = async (data: UploadEntry) => {
          const entry = data as MatchyUploadEntry;
          entry.forceUpdate = false;
          this.employeeService
            .UploadEmployees(entry)
            .subscribe((res: BaseOut) => {
              if (res.status_code == 200) {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Success',
                  detail: 'Employee created successfully',
                });
              } else {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: res.detail,
                });
              }
              this.ref.close();
            });
        };
      });
  }
}
