import { IUser } from "@entities/User";
import { IPost } from "@entities/SocialPosts";

declare module 'express' {
    export interface Request  {
        body: {
            user: IUser,
            socialPosts: IPost
        };
    }
}
