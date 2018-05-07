import { Train } from './train';

export class Route {
  public availableSeats;

  constructor(
    public train: Train,
    public departureCity: string,
    public arrivalCity: string,
    public departureTime: Date,
    public arrivalTime: Date,
    public wayStations?: string[]
  ) {
    this.availableSeats = this.train.railroadCar.numberOfRows * 6;
    this.departureCity = this.departureCity.toUpperCase();
    this.arrivalCity = this.arrivalCity.toUpperCase();
  }
}
