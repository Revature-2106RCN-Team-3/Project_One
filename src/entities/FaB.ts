export interface IPost {
    email: string;
    displayName: string;
    friend: boolean;
  }
  
  class Post implements IPost {
    public email: string;
    public displayName: string;
    public friend: boolean;

  
    constructor(email: string, displayName: string,friend: boolean) {
      this.email = email;
      this.displayName = displayName;
      this.friend = friend;
    }

  }
  
  export default Post;