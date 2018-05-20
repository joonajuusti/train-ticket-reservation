import { Train } from './train';
/**Defines Routes */
export class Route {
  public availableSeats;
  public seatsTaken;
  public id;
  constructor(
    public train: Train,
    public departureCity: string,
    public arrivalCity: string,
    public departureTime: Date,
    public arrivalTime: Date,
    public pricePerSeat: number,
    public wayStations?: string[],
  ) {
    this.availableSeats = this.train.railroadCarAmount * this.train.railroadCar.numberOfRows * 6;
    this.seatsTaken = new Array(this.train.railroadCarAmount);
    for(let num = 0; num < this.seatsTaken.length; num++) {
      this.seatsTaken[num] = [];
    }
    this.id = Math.floor((Math.random() * 10000))
    this.departureCity = this.departureCity.toUpperCase();
    this.arrivalCity = this.arrivalCity.toUpperCase();
  }
}
