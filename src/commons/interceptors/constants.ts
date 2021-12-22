
import { InjectionToken } from '@angular/core';

export interface InterceptorConfig {
	serverUrl: string
}

export const INTECEPTORS_CONFIG = new InjectionToken<InterceptorConfig>("InterceptorConfig");
