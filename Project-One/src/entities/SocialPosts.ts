/**
 ** table: post_and_comments
 *  this will be used for both post and comments on the main objective
 */

export interface IPost {
    userName: string;
    postId: string;
    postDateTime: string;
    postText: string;
    publicName: string;
    parentPostId: string;
    like: boolean;
    dislikes: boolean;
  }
  
  class Post implements IPost {
    public userName: string;
    public postId: string;
    public postDateTime: string;
    public postText: string;
    public publicName: string;
    public parentPostId: string;
    public like: boolean;
    public dislikes: boolean;

  
    /**
     * Everything except the userName is optional
     * this will allow us to both add post as well as pull specific post/comments in reporters
     * 
     * @param userName 
     * @param publicName 
     * @param postDateTime 
     * @param parentPostId 
     * @param postText 
     * @param like 
     * @param dislikes 
     */
    constructor(userName: string, publicName?: string, postDateTime?: string, parentPostId?: string,postText?: string,like?: boolean ,dislikes?: boolean) {
      this.userName = userName;
      this.publicName = publicName || "";
      this.postId = "${username}*${postDateTime}";
      this.postDateTime = postDateTime || String(Date.now());
      this.parentPostId = parentPostId || "${username}*${postDateTime}";
      this.postText= postText || "";
      this.like = like || false;
      this.dislikes = dislikes || false;

    }
    

  }
  
  export default Post;