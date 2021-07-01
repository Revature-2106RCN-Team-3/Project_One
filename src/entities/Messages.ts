/* eslint-disable max-len */
let newHash = function(input: string){
        var hash = 0;
        if (input.length == 0) return `${hash}`;
        for (let i = 0; i < input.length; i++) {
            let char = input.charCodeAt(i);
            hash = ((hash<<5)-hash)+char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return `${hash}`;
    }

export interface IMessage {
    userName: string;
    messageId: string;
    parentMessageId: string;
    messageDateTime: string;
    recipientUserName: string;
    messageText: string;
    senderPublicName: string;
    recipientPublicName: string;
  }
  
  class Message implements IMessage {
    public userName: string;
    public messageId: string;
    public parentMessageId: string;
    public messageDateTime: string;
    public recipientUserName: string;
    public messageText: string;
    public senderPublicName: string;
    public recipientPublicName: string;

    constructor(userName: string, recipientUserName?: string, parentMessageId?: string, messageDateTime?: string, messageText?: string, senderPublicName?: string,
          recipientPublicName?: string) {
      this.userName = userName;
      this.messageId = newHash(userName + String(Date.now()));
      this.recipientUserName = recipientUserName || this.userName;
      this.messageDateTime = messageDateTime || String(Date.now());
      this.parentMessageId = parentMessageId || this.messageId;
      this.messageText = messageText || "";
      this.senderPublicName = senderPublicName || "";
      this.recipientPublicName = recipientPublicName || "";
    }
  }
  
  export default Message;