export interface IUser {
  email: string;
  name: string;
  displayName: string;
}

class User implements IUser {
  public email: string;
  public name: string;
  public displayName: string;

  constructor(email: string, name?: string, displayName?: string) {
    this.email = email;
    this.name = name || "";
    this.displayName = displayName || "";
  }
}

export default User;
