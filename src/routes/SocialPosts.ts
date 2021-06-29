import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

import SocialPostDao from '@daos/SocialPost/SocialPostDao';
import { paramMissingError } from '@shared/constants';

const socialPostDao = new SocialPostDao();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;

/**
 * Get all users.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
 export async function getAllPosts(req: Request, res: Response) {
    const posts = await socialPostDao.getAll();
    return res.status(OK).json({posts});
}


/**
 * Add one user.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export async function addOneUser(req: Request, res: Response) {
    const { socialPosts } = req.body;
    if (!socialPosts) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    await socialPostDao.addorUpdatePost(socialPosts);
    return res.status(CREATED).end();
}


/**
 * Update one user.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export async function updateOneUser(req: Request, res: Response) {
    const { socialPosts } = req.body;
    if (!socialPosts) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    
    await socialPostDao.addorUpdatePost(socialPosts);
    return res.status(OK).end();
}


/**
 * Delete one user.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export async function deleteOneUser(req: Request, res: Response) {
    const { username } = req.params;
    await socialPostDao.deletePost(String(username));
    return res.status(OK).end();
}
