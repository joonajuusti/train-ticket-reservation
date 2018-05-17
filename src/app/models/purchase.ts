import { Route } from './route';
import { User } from './user';

export class Purchase {
  constructor(
    public route: Route,
    public user: User,
    public railroadCarNumber: number,
    public seats: number[],
    public paid: boolean
  ) {}
}
