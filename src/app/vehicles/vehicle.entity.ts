import { AddressEntity } from '../../commons/entities/address';

export class VehicleEntity {
  public id: number;

  public model: string;

  public year: number;

  public licensePlate: string;

  public manufacturer: string;

  public userId: number;

  constructor(json?: any) {
    if (json != undefined && json != null) {
      const keys: Array<string> = Object.keys(json);
      if (keys.includes('id')) this.id = json.id ? Number(json.id) : json.id;
      if (keys.includes('model'))
        this.model = json.model ? String(json.model) : json.model;
      if (keys.includes('year'))
        this.year = json.year ? Number(json.year) : json.year;
      if (keys.includes('licensePlate'))
        this.licensePlate = json.licensePlate
          ? String(json.licensePlate)
          : json.licensePlate;
      if (keys.includes('manufacturer'))
        this.manufacturer = json.manufacturer
          ? String(json.manufacturer)
          : json.manufacturer;
      if (keys.includes('manufacturer'))
        this.manufacturer = json.manufacturer
          ? String(json.manufacturer)
          : json.manufacturer;
      if (keys.includes('userId'))
        this.userId = json.userId ? Number(json.userId) : json.userId;
    }
  }
}
