export interface IPost {
    email: string;
    parentPost: string;
    displayName: string;
  }
  
  class Post implements IPost {
    public email: string;
    public displayName: string;
    public parentPost: string;

  
    constructor(email: string, displayName: string,parentPost: string) {
      this.email = email;
      this.displayName = displayName;
      this.parentPost = parentPost;
    }

  }
  
  export default Post;