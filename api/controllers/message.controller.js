import prisma from "../lib/prisma.js";

export const addMessage =async (req,res)=>{
    const userId = req.userId; 
    const chatId = req.params.chatId;
    const text = req.body.text;
    try{

        const chat = await prisma.chat.findUnique({
            where :{
                id : chatId,
                userIds:{
                    hasSome: [userId]
                }

            }
        })

        if(!chat) return res.status(404).json({message:"Chat  Not Found!"})
        
        const message = await prisma.message.create({
            data:{
                text,
                chatId,
                userId //sender id 
            }
        })    
        
        await prisma.chat.update({
            where:{
                id: chatId,
            },
            data:{
                seenBy : [userId],
                lastmessage: text
            }
        })
        res.status(200).json(message);
    }catch(err)
    {
      console.log(err);
      res.status(500).json({message:"Failed to add message"});

    }
}