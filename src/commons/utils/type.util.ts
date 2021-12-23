export class TypeUtil {
  private constructor() {} // eslint-disable-line @typescript-eslint/no-empty-function

  public static exists(value: any) {
    return value !== null && value !== undefined;
  }
  public static hasText(value: any) {
    return TypeUtil.exists(value) && value !== '';
  }
  public static isFullArray(value: any[]): boolean {
    return value !== null && value !== undefined && value.length > 0;
  }
  public static isFullString(value: string, trim?: boolean) {
    if (trim)
      return value !== null && value !== undefined && value.trim().length > 0;
    else return value !== null && value !== undefined && value.length > 0;
  }

  public static isValidCPF(cpf) {
    if (typeof cpf !== 'string') return false;
    cpf = cpf.replace(/[\s.-]*/gim, '');
    if (
      !cpf ||
      cpf.length != 11 ||
      cpf == '00000000000' ||
      cpf == '11111111111' ||
      cpf == '22222222222' ||
      cpf == '33333333333' ||
      cpf == '44444444444' ||
      cpf == '55555555555' ||
      cpf == '66666666666' ||
      cpf == '77777777777' ||
      cpf == '88888888888' ||
      cpf == '99999999999'
    ) {
      return false;
    }
    var sum = 0;
    var trash;
    for (var i = 1; i <= 9; i++)
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    trash = (sum * 10) % 11;
    if (trash == 10 || trash == 11) trash = 0;
    if (trash != parseInt(cpf.substring(9, 10))) return false;
    sum = 0;
    for (var i = 1; i <= 10; i++)
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    trash = (sum * 10) % 11;
    if (trash == 10 || trash == 11) trash = 0;
    if (trash != parseInt(cpf.substring(10, 11))) return false;
    return true;
  }
}
