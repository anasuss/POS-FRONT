import { AccountStatus } from '../enums/accountStatus';
import { ContractType } from '../enums/contractType';
import { Gender } from '../enums/gender';
import { Role } from '../enums/role';

export interface EmployeeBase {
  first_name: string;
  last_name: string;
  email: string;
  number: number;

  birth_date?: string;
  address?: string;
  cnss_number?: string;

  contract_type: ContractType;
  gender: Gender;
  account_status: AccountStatus;

  phone_number?: string;
  roles: Role[];
}
