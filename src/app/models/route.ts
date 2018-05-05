export class Route {
  constructor(
    public train: string,
    public departureCity: string,
    public arrivalCity: string,
    public departureTime: Date,
    public arrivalTime: Date,
    public wayStations?: string[]
  ) {}
}
