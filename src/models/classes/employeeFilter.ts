import { PaginationParams } from './paginationParams';

export class EmployeeFilter extends PaginationParams {
  nameSubstr?: string;
  constructor(nameSubstr?: string) {
    super();
    this.nameSubstr = nameSubstr;
  }
}
