import express from 'express';
import { verifyToken } from '../middleware/verifyjwt.js';
import { getChats,getChat, addChat, readChat} from '../controllers/chat.controller.js';
const router = express.Router();

router.get('/',verifyToken,getChats);
router.get('/:id',verifyToken,getChat); // it is not require and it conflict with profilePost
router.post('/',verifyToken,addChat);
router.post('/read/:id',verifyToken,readChat);


export default router;