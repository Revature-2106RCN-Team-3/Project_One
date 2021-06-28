import { Router } from 'express';
import { getAllUsers, addOneUser, updateOneUser, deleteOneUser } from './Users';


// User-route used for searches
const loginRouter = Router();
loginRouter.get('/all', getAllUsers);
loginRouter.post('/add', addOneUser);
loginRouter.put('/update', updateOneUser);
loginRouter.delete('/delete/:id', deleteOneUser);

// User-route used for searches
const userRouter = Router();
userRouter.get('/all', getAllUsers);
userRouter.post('/add', addOneUser);
userRouter.put('/update', updateOneUser);
userRouter.delete('/delete/:id', deleteOneUser);

// Post-route
const postRouter = Router();
postRouter.get('/all', getAllUsers);
postRouter.post('/add', addOneUser);
postRouter.put('/update', updateOneUser);
postRouter.delete('/delete/:id', deleteOneUser);

// Messages-route
const messagesRouter = Router();
messagesRouter.get('/messages/all', getMessages; // shows all your message groups
messagesRouter.post('/messages/new/groupmessage', newMessageGroup); // creates a new direct message
messagesRouter.post('/messages/new/:parentMessageId/', newMessage) // direct message from within existing direct message
messagesRouter.put('/messages/update', updateMessage); // update message from within existing direct message
messagesRouter.delete('/messages/delete/:parentMessageId', deleteMessageGroup); // deletes direct message group
messagesRouter.delete('/messages/delete/:parentMessageId/:messageId', deleteMessageGroup); // deletes direct message group

// Export the base-router
const baseRouter = Router();
baseRouter.use('/', userRouter);
export default baseRouter;
