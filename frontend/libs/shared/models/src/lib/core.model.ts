export interface AuditableDto {
  id?: string;
  creationTimestamp?: Date;
  modificationTimestamp?: Date;
}

export interface FormOptions {
  placeholderKey: string;
  formControlName: string;
  type: string;
}
