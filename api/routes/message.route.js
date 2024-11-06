import express from 'express';
import {addMessage} from "../controllers/message.controller.js";
const router = express.Router();
import {verifyToken} from "../middleware/verifyjwt.js";

router.post('/:chatId',verifyToken,addMessage);
export default router;