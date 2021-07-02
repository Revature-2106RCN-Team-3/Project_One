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
    username: string;
    message_id: string;
    parent_message_id: string;
    message_timestamp: string;
    recipientUserName: string;
    message_text: string;
    senderPublicName: string;
    recipientPublicName: string;
  }
  
  class Message implements IMessage {
    public username: string;
    public message_id: string;
    public parent_message_id: string;
    public message_timestamp: string;
    public recipientUserName: string;
    public message_text: string;
    public senderPublicName: string;
    public recipientPublicName: string;

    constructor(username: string, message_id?: string, recipientUserName?: string, parent_message_id?: string, message_timestamp?: string, message_text?: string, senderPublicName?: string,
          recipientPublicName?: string) {
      this.username = username;
      this.message_id = message_id || 'null';
      this.recipientUserName = recipientUserName || this.username;
      this.message_timestamp = message_timestamp || String(Date.now());
      this.parent_message_id = parent_message_id || '0';
      this.message_text = message_text || "";
      this.senderPublicName = senderPublicName || "";
      this.recipientPublicName = recipientPublicName || "";
    }
  }
  
  export default Message;