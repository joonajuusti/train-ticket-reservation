import { RailroadCar } from './railroad-car';

export class Train {
  constructor(
    public name: string,
    public locomotive: string,
    public railroadCar: RailroadCar,
    public railroadCarAmount: number
  ) {}
}
