import bcrypt from "bcrypt";


export interface IUser {
  userName: string; // this is their email address
  name: string;
  publicName: string; // this is their public facing names
  userNameHash: string;
}

class User implements IUser {
  public userName: string;
  public name: string;
  public publicName: string;
  public userNameHash: string;

  constructor(userName: string, userNameHash?: string, name?: string, publicName?: string) {
    this.userName = userName;
    this.name = name || "";
    this.publicName = publicName || "";
    this.userNameHash = userNameHash ||  String(this.updatePassTest(userName));
  }

  async updatePassTest(x: string) {
    const saltRounds = 10;
    const password = x;
    return bcrypt.hash(password, saltRounds);
  }
}



export default User;
