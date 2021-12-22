import { AddressEntity } from '../../commons/entities/address';

export const FEATURE_CLIENT_DEFAULT: object = {
  code: 'CLIENT',
  title: 'Cliente',
  date: new Date(),
};

export const FEATURE_THIRD_DEFAULT: object = {
  code: 'THIRD',
  title: 'Terceiro',
  date: new Date(),
};

export class UserEntity {
  public id: number;

  public name: string;

  public phone: number;

  public email: string;

  public secret: string;

  public addressId: number;

  public insuranceCompanyId: number;

  public extra: object;

  public features: object;

  constructor(json?: any) {
    if (json != undefined && json != null) {
      const keys: Array<string> = Object.keys(json);
      if (keys.includes('id')) this.id = json.id ? Number(json.id) : json.id;
      if (keys.includes('name'))
        this.name = json.name ? String(json.name) : json.name;
      if (keys.includes('email'))
        this.email = json.email ? String(json.email) : json.email;
      if (keys.includes('secret'))
        this.secret = json.secret ? String(json.secret) : json.secret;
      if (keys.includes('phone'))
        this.phone = json.phone ? Number(json.phone) : json.phone;
      if (keys.includes('addressId'))
        this.addressId = json.addressId
          ? new Number(json.addressId)
          : json.addressId;
      if (keys.includes('insuranceCompanyId'))
        this.insuranceCompanyId = json.insuranceCompanyId
          ? Number(json.insuranceCompanyId)
          : json.insuranceCompanyId;
      if (keys.includes('extra'))
        this.extra = json.extra ? Object(json.extra) : json.extra;
      if (keys.includes('features'))
        this.features = json.features ? Object(json.features) : json.features;
    }
  }
}
