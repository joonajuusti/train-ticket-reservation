import { RailroadCar } from './railroad-car';
/**Defines Trains */
export class Train {
  constructor(
    public name: string,
    public locomotive: string,
    public railroadCar: RailroadCar,
    public railroadCarAmount: number
  ) {}
}
