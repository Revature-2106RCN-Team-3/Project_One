import bcrypt from "bcrypt";

/**
 ** table: post_and_comments
 *  this will be used for both post and comments on the main objective
 */

export interface IPost {
    userName: string;
    postId: string; // unique id tied to each post/comment/like/dislike
    postDateTime: string;
    postText: string;
    parentPostId: string; // this is used to identify parent post for comments
    like: boolean;
    dislikes: boolean;
    mainPost: boolean;
  }
  
  /**
   * 
   */
  class Post implements IPost {
    public userName: string;
    public postId: string;
    public postDateTime: string;
    public postText: string;
    public parentPostId: string;
    public like: boolean;
    public dislikes: boolean;
    public mainPost: boolean;

  
    /**
     * Everything except the userName is optional
     * this will allow us to both add post as well as pull specific post/comments in reporters
     * 
     * @param userName 
     * @param postDateTime 
     * @param parentPostId 
     * @param postText 
     * @param like 
     * @param dislikes 
     */
<<<<<<< Updated upstream
    constructor(userName: string, postDateTime?: string, parentPostId?: string,postText?: string,like?: boolean ,dislikes?: boolean) {
      this.userName = userName;
      this.postId = "${username}*${postDateTime}";
=======
    // eslint-disable-next-line max-len
    constructor(userName: string, postDateTime?: string, parentPostId?: string,postText?: string,like?: boolean ,dislikes?: boolean) {
      this.userName = userName;
      this.postId = '${username}*${postDateTime}';
>>>>>>> Stashed changes
      this.postDateTime = postDateTime || String(Date.now());
      this.parentPostId = parentPostId || '${username}*${postDateTime}';
      this.postText= postText || "";
      this.like = like || false;
      this.dislikes = dislikes || false;
      if(this.postId === this.parentPostId){
        this.mainPost = true;
      }else{
        this.mainPost = false;
      }
    }

    async updatePassTest(x: string) {
      const saltRounds = 10;
      const password = x;
      
      const hash = await bcrypt.hash(password, saltRounds);
      return String(hash);
    }

  }
  
  export default Post;