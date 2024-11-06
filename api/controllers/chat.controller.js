import  prisma  from "../lib/prisma.js";
export const getChats = async (req,res)=>{
    const userId = req.userId;
    try{
        
        const chats = await prisma.chat.findMany({
          where:{
            userIds:{
                hasSome:[userId]
            }
          }
        })
        for(const chat of chats)
        {
            const receiverId = chat.userIds.find( (id) => id !== userId )
              
            const receiver = await prisma.user.findUnique({
                where :{
                     id : receiverId
                },
                select : {
                    id :true,
                    username :true,
                    avtar :true 
                }
            });
            chat.receiver = receiver; 
        }
        res.status(200).json(chats);
    }catch(err){
     console.log(err);
     res.status(500).json({message:"Failed to get Chats"});
    }
}
export const getChat = async (req,res)=>{
  
    const chatId = req.params.id;
    const userId = req.userId;
    try{
        const Chat = await prisma.chat.findUnique({
            where:{
                    id : chatId,
                    userIds:{hasSome:[userId]}  
                  },
            include:{ // it will sort message according time and give all data 
                message:{
                    orderBy :{
                    createdAt: "asc"
                    }
                }
            }      
        })    

        await prisma.chat.update({
            where:{
                id:chatId
            },
            data:{
                seenBy:{
                    push:[userId]
                }
            }
        }) 
        res.status(200).json(Chat);
    }catch(err){
     console.log(err);
     res.status(500).json({message:"Failed to get Chat"});
    }
}

export const addChat = async (req,res)=>{
    const userId = req.userId;
    const receiverId = req.body.receiverId
    try{
        
        const newChat = await prisma.chat.create({
            data:{
                userIds:[userId,receiverId]
            }
        })
        res.status(200).json(newChat);
    }catch(err){
     console.log(err);
     res.status(500).json({message:"Failed to add Chat"});
    }
}

export const readChat = async (req,res)=>{
  
    const userId = req.userId;
    const chatId = req.params.id;

    try{
        const chat = await prisma.chat.update({
            where :{
                id : chatId,
                userIds : {
                    hasSome :[userId]
                }
            },
            data : {
              seenBy : {
                set : [userId]
              }
            }
        })

        res.status(200).json(chat);
    }catch(err){
     console.log(err);
     res.status(500).json({message:"Failed to read Chat"});
    }
}