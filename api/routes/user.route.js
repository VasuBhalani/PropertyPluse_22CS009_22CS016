import express from 'express'
import {getUsers,updateUsre,deleteUser,savePost,profilePosts} from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/verifyjwt.js';
const router=express.Router();

router.get('/',getUsers);
// router.get('/search/:id',verifyToken,getUser); it is not require and it conflict with profilePost
router.put('/:id',verifyToken,updateUsre);
router.delete('/:id',verifyToken,deleteUser);
router.post("/save", verifyToken, savePost);
router.get("/profilePosts", verifyToken, profilePosts);


export default router;