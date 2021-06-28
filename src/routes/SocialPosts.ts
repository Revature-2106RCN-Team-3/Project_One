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
    const { user } = req.body;
    if (!user) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    await socialPostDao.add(user);
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
    const { user } = req.body;
    if (!user) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    user.id = Number(user.id);
    await socialPostDao.update(user);
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
    const { id } = req.params;
    await socialPostDao.delete(Number(id));
    return res.status(OK).end();
}
