
import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

import MessagesDao from '@daos/Messages/MessagesDao';
import { paramMissingError } from '@shared/constants';
import Message from '@entities/Messages';

const messageDao = new MessagesDao();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;

export async function getMessages(req: Request, res: Response) {
    const { messages } = req.body;
    if (!messages) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    const posts = await messageDao.getMessages(messages);
    return res.status(OK).json({posts});
}

export async function getMessageGroups(req: Request, res: Response) {
    const { messages } = req.body;
    if (!messages) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    const posts = await messageDao.getGroups(messages);
    return res.status(OK).json({posts});
}

export async function updateMessage(req: Request, res: Response) {
    const { messages } = req.body;
    if (!messages) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    const posts = await messageDao.getGroups(messages);
    return res.status(OK).json({posts});
}

export async function deleteMessage(req: Request, res: Response) {
    const { messages } = req.body;
    const parentMessageID = req.query.parentMessageId?.toString();
    const messageID = req.query.messageId?.toString();
    await messageDao.deleteMessage(messages, parentMessageID, messageID);
    return res.status(OK).end();
}