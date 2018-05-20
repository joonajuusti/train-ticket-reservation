/**Defines Users */
export class User {
  constructor(
    public firstName: string,
    public lastName: string,
    public username: string,
    public password: string,
    public admin: boolean,
    public creditCard: string,
    public address: string
  ) {}
}
