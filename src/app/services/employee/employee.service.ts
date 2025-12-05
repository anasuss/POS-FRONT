import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PagedResponse } from 'src/models/interfaces/pagedResponse';
import { EmployeeOut } from 'src/models/interfaces/employeeOut';
import { baseUrl } from 'src/models/baseUrl';
import { EmployeeFilter } from 'src/models/classes/employeeFilter';
import { EmployeeCreate } from 'src/models/interfaces/employeeCreate';
import { Matchy } from 'src/libs/matchy/src/main';
import { ImportPossibleFields } from 'src/models/interfaces/importPossibleFields';
import { BaseOut } from 'src/models/interfaces/baseOut';
import { MatchyUploadEntry } from 'src/models/classes/matchyUploadEntry';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}
  getEmployees(employeeFilter: EmployeeFilter) {
    const endpoint = 'http://127.0.0.1:8000/employee/all';
    var params = new HttpParams()
      .set('page_number', employeeFilter.pageNumber.toString())
      .set('page_size', employeeFilter.pageSize.toString());

    if (employeeFilter.nameSubstr) {
      params = params.set('name_substr', employeeFilter.nameSubstr);
    }
    const options = { params: params };
    return this.http.get<PagedResponse<EmployeeOut>>(endpoint, options);
  }

  AddEmployee(employeeCreate: EmployeeCreate) {
    const endpoint = 'http://127.0.0.1:8000/employee';
    return this.http.post<EmployeeCreate>(endpoint, employeeCreate);
  }

  GetPossibleFieldsForImport() {
    const endpoint = `http://127.0.0.1:8000/employee/possibleFields`;
    return this.http.get<ImportPossibleFields>(endpoint);
  }

  UploadEmployees(data: MatchyUploadEntry) {
    const endpoint = `http://127.0.0.1:8000/employee/upload`;
    return this.http.post<BaseOut>(endpoint, data);
  }
}
