import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';
import UserDao from '../daos/User/UserDao';
import { paramMissingError } from '../shared/constants';
import User from '../entities/User';

const userDao = new UserDao();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;

//************************************************************************************************
//* Get Operators
//************************************************************************************************

/**
 * Get all users.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export async function getAllUsers(req: Request, res: Response) {
    const users = await userDao.getAll();
    return res.status(OK).json({users});
}

//************************************************************************************************
//* Post Operators
//************************************************************************************************
/**
 * Get one user by the username.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
 export async function getOneUser(req: Request, res: Response) {
    const { username } = req.params;

    const userData = await userDao.getOne(username);
    
    if(!username) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    } else {
        return res.status(OK).json(userData);
    }
}

/**
 * Add one user.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export async function addOneUser(req: Request, res: Response) {
    const { username, first_name, last_name, phone_number, public_name } = req.body;
    logger.info(req.body);
    
    if (!username && !first_name && !last_name && !phone_number && !public_name) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    } else {
        await userDao.addUser(req.body);
        return res.status(CREATED).end();
    }
}

//************************************************************************************************
//* Put Operators
//************************************************************************************************

/**
 * Update one user.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export async function updateOneUser(req: Request, res: Response) {
    const { username, first_name, last_name, phone_number, publicName } = req.body;

    if (!username && !first_name && !last_name && !phone_number && !publicName) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    
    if (username === String(username)) {
        const userData = await userDao.updateUser(req.body);
        return res.status(OK).json({userData});
    }
}

//************************************************************************************************
//* Delete Operators
//************************************************************************************************

/**
 * Delete one user.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export async function deleteOneUser(req: Request, res: Response) {
    const { username } = req.params;

    if(!username) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    } else {
        await userDao.delete(username);
        return res.status(OK).json("User was deleted").end();
    }
}
