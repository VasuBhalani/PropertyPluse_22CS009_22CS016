import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

import express from 'express';
import cookieParser from 'cookie-parser';
import postRoute from './routes/post.route.js';
import authRoute from './routes/auth.route.js'; 
import testRoute from './routes/test.route.js';
import userRoute from './routes/user.route.js';
import chatRoute from './routes/chat.route.js';
import messageRoute from './routes/message.route.js';
import {verifyToken} from './middleware/verifyjwt.js'

const app = express();
const port = 3000;

app.use(cors({origin:process.env.CLIENT_URL,credentials:true}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRoute);
app.use('/api/user',userRoute);
app.use('/api/test',testRoute);
app.use('/api/post',postRoute);
app.use('/api/chats',chatRoute);
app.use('/api/messages',messageRoute);

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});