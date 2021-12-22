import { AbstractControl } from '@angular/forms';
import { MatSnackBarConfig } from '@angular/material/snack-bar';

export type SnackStyle = 'primary' | 'accent' | 'warn';

export class AngularUtil {
  private static readonly DURATION: number = 2500;

  public static hasValue(control: AbstractControl): boolean {
    // if (control) console.debug('1 - CONTROL OK');
    // if (control.valid) console.debug('2 - CONTROL VALID');
    // if (control.value) console.debug('3 - CONTROL VALUE');

    return control && control.valid && control.value;
  }

  public static makeSnackConfig(style?: SnackStyle): MatSnackBarConfig {
    let snackBarConfig: MatSnackBarConfig = new MatSnackBarConfig();
    snackBarConfig.duration = AngularUtil.DURATION;
    if (style) snackBarConfig.panelClass = [`${style}-light-color`];
    snackBarConfig.horizontalPosition = 'center';
    snackBarConfig.verticalPosition = 'bottom';
    return snackBarConfig;
  }
}
