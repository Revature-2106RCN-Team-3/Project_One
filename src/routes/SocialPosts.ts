import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';
import logger from '@shared/Logger';
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

export async function getMainPosts(req: Request, res: Response) {
    const { socialPosts } = req.body;
    logger.info(socialPosts.userName);
    logger.info("i dont think im pulling in the body lol")
    if (!socialPosts) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    const post = await socialPostDao.getPost(socialPosts);
    return res.status(OK).json({post});
}

export async function getComments(req: Request, res: Response) {
    const { socialPosts } = req.body;
    if (!socialPosts) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    const post = await socialPostDao.getComments(socialPosts);
    return res.status(OK).json({post});
}

/**
 * Add one user.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export async function addorUpdatePost(req: Request, res: Response) {
    const { socialPosts } = req.body;
    console.log(socialPosts);
    console.log("i dont think im pulling in the body lol")
    if (!socialPosts) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    console.log("made it to the part where i call the dao");
    await socialPostDao.addMainPost(socialPosts);
    return res.status(CREATED).end();
}


/**
 * Update one user.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export async function updateOnePost(req: Request, res: Response) {
    const { socialPosts } = req.body;
    if (!socialPosts) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    await socialPostDao.addMainPost(socialPosts);
    return res.status(OK).end();
}


/**
 * Delete one user.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export async function deleteOnePost(req: Request, res: Response) {
    const { socialPosts } = req.body;
    if (!socialPosts) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    await socialPostDao.deletePost(socialPosts);
    return res.status(OK).end();
}
