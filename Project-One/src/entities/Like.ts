export interface ILike {
    email: string;
    parentPost: string;
    like: boolean;
    dislike: boolean;
  }
  
  class Post implements ILike {
    public email: string;
    public parentPost: string;
    public like: boolean;
    public dislike: boolean;

  
    constructor(email: string, parentPost: string, like: boolean, dislike: boolean) {
      this.email = email;
      this.parentPost = parentPost;
      if(like === true){
          this.like = like;
          this.dislike = false;
      }else{
          this.dislike = dislike;
          this.like = false;
      }
    }

  }
  
  export default Post;