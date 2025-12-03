import { EmployeeBase } from './employeeBase';

export interface EmployeeCreate extends EmployeeBase {
  password: string | undefined;
  confirm_password: string | undefined;
}
