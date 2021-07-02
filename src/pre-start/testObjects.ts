/**
 * ! this module is only meant to store objects to be used with jest testing
 */


//************************************************************************************************
//* General objects to test daos
//************************************************************************************************

// Post Object 1 is the default object passed through each test for posts
export const postObj1 = {
  userName: String("matthewterry68.mt@gmail.com"),
  postId: String(
    "$2b$10$tU7mWLVWToPSeN9e/uKSR.Kjn5LiX1WfAyQdbT1sevF7EpN7gzwWW"
  ),
  postText: String("aghhhhhh this is post text!!"),
  parentPostId: String(
    "$2b$10$tU7mWLVWToPSeN9e/uKSR.Kjn5LiX1WfAyQdbT1sevF7EpN7gzwWW"
  ),
  like: Boolean(true),
  dislikes: Boolean(false),
  mainPost: Number(1),
};

// Post object 2 test for when postId and mainPostId are different during comment updates
export const postObj2 = {
  userName: String("matthewterry68.mt@gmail.com"),
  postId: String(
    "$2b$10$/Y74Twt.GPYADDRRHOvIXOITEDXTYGCo94H5gHcyecXxZyC.ez9Ra"
  ),
  postText: String("aghhhhhh this is post text!!"),
  parentPostId: String(
    "$2b$10$tU7mWLVWToPSeN9e/uKSR.Kjn5LiX1WfAyQdbT1sevF7EpN7gzwWW"
  ),
  like: Boolean(false),
  dislikes: Boolean(true),
  mainPost: Number(1),
};

// Post object 3 test for like/ dislike both being false
export const postObj3 = {
  userName: String("matthewterry68.mt@gmail.com"),
  postId: String(
    "$2b$10$tU7mWLVWToPSeN9e/uKSR.Kjn5LiX1WfAyQdbT1sevF7EpN7gzwWW"
  ),
  postText: String("aghhhhhh this is post text!!"),
  parentPostId: String(
    "$2b$10$tU7mWLVWToPSeN9e/uKSR.Kjn5LiX1WfAyQdbT1sevF7EpN7gzwWW"
  ),
  like: Boolean(false),
  dislikes: Boolean(false),
  mainPost: Number(1),
};

//************************************************************************************************
//* json formatted objects to test routes
//************************************************************************************************

// json formatted message body to pass through routes
export const msgBody1 = {
  "messages":{
      "userName": "Bob",
      "parentMessageId": "01"
  }
}

// json formatted post body to pass through routes
export const postBody1 = {
  socialPosts: {
    userName: "matthewterry68.mt@gmail.com",
    postId: "$2b$10$tU7mWLVWToPSeN9e/uKSR.Kjn5LiX1WfAyQdbT1sevF7EpN7gzwWW",
    postText: "aghhhhhh this is post text!!",
    parentPostId:
      "$2b$10$tU7mWLVWToPSeN9e/uKSR.Kjn5LiX1WfAyQdbT1sevF7EpN7gzwWW",
    like: true,
    dislikes: false,
    mainPost: 1,
  },
};

export const usersBody1 = {
  "username": "matthewterry68.mt@gmail.com",
  "first_name": "matthew",
  "last_name": "terry",
  "phone_number": "555-555-5555",
  "publicName": "mat2718",
  "userNameHash": ""
}