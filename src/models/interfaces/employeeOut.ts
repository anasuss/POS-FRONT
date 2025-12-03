import { EmployeeBase } from './employeeBase';

export interface EmployeeOut extends EmployeeBase {
  id: number;
  created_on: string;
}
