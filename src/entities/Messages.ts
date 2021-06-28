export interface IMessage {
    userName: string;
    postId: string;
    parentPostId: string;
    postDateTime: string;
    recipientUserName: string;
    postText: string;
    senderPublicName: string;
    recipientPublicName: string;
  }
  
  class Message implements IMessage {
    public userName: string;
    public postId: string;
    public parentPostId: string;
    public postDateTime: string;
    public recipientUserName: string;
    public postText: string;
    public senderPublicName: string;
    public recipientPublicName: string;

  
    constructor(userName: string, recipientUserName?: string, parentPostId?: string, postDateTime?: string, postText?: string, senderPublicName?: string,
          recipientPublicName?: string) {
      this.userName = userName;
      this.recipientUserName = recipientUserName || this.userName;
      this.postId = `${userName}*${postDateTime}`;
      this.parentPostId = parentPostId || `${userName}*${postDateTime}`;
      this.postDateTime = postDateTime || String(Date.now());
      this.postText = postText || "";
      this.senderPublicName = senderPublicName || "";
      this.recipientPublicName = recipientPublicName || "";
    }

  }
  
  export default Message;