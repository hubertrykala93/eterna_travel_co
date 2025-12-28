import { InjectionToken } from '@angular/core';
import { Environment } from './data-access.model';

export const ENVIRONMENT = new InjectionToken<Environment>('ENVIRONMENT');
