export interface IPost {
    email: string;
    parentPost: string;
    post: string;
    displayName: string;
  }
  
  class Post implements IPost {
    public email: string;
    public displayName: string;
    public parentPost: string;
    public post: string;

  
    constructor(email: string, displayName: string,parentPost: string, post: string) {
      this.email = email;
      this.displayName = displayName;
      this.parentPost = parentPost;
      this.post = post;
    }

  }
  
  export default Post;