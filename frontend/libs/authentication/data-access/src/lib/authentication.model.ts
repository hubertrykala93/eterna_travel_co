import { AuditableDto } from '@shared/data-access';

export interface UserDto extends AuditableDto {
  username: string;
  email: string;
  phoneNumber: string | null;
  avatar: string | null;
  language: string | null;
  currency: string | null;
  isVerified: boolean;
}

export interface UserRequest {
  username: string;
  email: string;
  password: string;
}
