import { AbstractControl, ValidationErrors } from '@angular/forms';
import { ContractType } from 'src/models/enums/contractType';

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
const CNSS_PATTERN = /^\d{8}-\d{2}$/;

export function emailValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value as string | null;
  if (!value) return null;
  return EMAIL_REGEX.test(value) ? null : { invalidEmail: true };
}

export function cnssValidator(group: AbstractControl): ValidationErrors | null {
  const contractType = group.get('contractType')?.value as ContractType | null;
  const cnss = (group.get('cnssNumber')?.value as string | null) ?? '';
  if (!contractType) return null;

  const requiredTypes = [ContractType.CDI, ContractType.CDD];
  const optionalTypes = [ContractType.APPRENTI, ContractType.SIVP];

  if (requiredTypes.includes(contractType)) {
    if (!cnss) return { cnssRequired: true };
    if (!CNSS_PATTERN.test(cnss)) return { cnssFormat: true };
  }

  if (
    optionalTypes.includes(contractType) &&
    cnss &&
    !CNSS_PATTERN.test(cnss)
  ) {
    return { cnssFormat: true };
  }

  return null;
}

export function formatDate(date: Date | string | null): string | undefined {
  if (!date) return undefined;
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toISOString().slice(0, 10);
}
