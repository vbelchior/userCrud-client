import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { InterceptorConfig, INTECEPTORS_CONFIG } from './constants';

@NgModule({
  imports: [CommonModule],
})
export class InterceptorModule {
  public static forRoot(
    config: InterceptorConfig
  ): ModuleWithProviders<InterceptorModule> {
    return {
      ngModule: InterceptorModule,
      providers: [
        {
          provide: INTECEPTORS_CONFIG,
          useValue: config,
        },
      ],
    };
  }
}
