import prisma from '../lib/prisma.js';
import bcrypt from 'bcrypt';

// Get all user 
export const getUsers = async(req,res)=>{
 try{
    const users = await prisma.user.findMany();
    res.status(200).json(users);
 }
 catch(err)
 {
    console.log(err);
    res.status(500).send({message:"Failed To get users"})
 }

}


// Get Single user their own details only
// export const getUser = async(req,res)=>{
   
//    const id = req.params.id;
   
//    if(id !== req.userId) return res.status(401).json({message:"You are NOT Authorized"});

//     try{
//         const user = await prisma.user.findUnique( { where: {id} } );
//         res.status(200).json({user});
//     }
//     catch(err)
//     {
//        console.log(err);
//        res.status(500).send({message:"Failed To get user"})
//     }

// }


// Update user own's details only
   export const updateUsre = async(req,res)=>{

      // take user id from url
      const id = req.params.id;
      const userId = req.userId;
      
      const {password,avtar,...inputs}=req.body // handle password separately
      
      //check with cookies token which we have passed in req.token 
      if(id !== userId)
         return res.status(403).json({message:"Not Authorized"}); 
      
      let updatedpass = null

   try{
      if(password)
      {
         updatedpass = await bcrypt.hash(password,10);
      }
      const updatedUser = await prisma.user.update({
         where : {id},
         data: {
            ...inputs,
            ...(updatedpass && {password : updatedpass}), // check if updated password is null then do nothing otherwise update password 
            ...(avtar && {avtar})
         }
      })
      
      const {password:userPass,...rest} = updatedUser //updated data

      console.log(rest)  
      res.status(200).json(rest);   

   }
    catch(err)
    {
       console.log(err);
       res.status(500).send({message:"Failed To update users"})
    }
   
   }

   export const deleteUser = async(req,res)=>{
    
        // take user id from url
      const id = req.params.id;

      //check with cookies token which we have passed in req.token 
      const cookieId = req.userId;
      
      if( id !== cookieId)
         return res.status(403).send({message:"Not Authorized"}); 

   try{
         await prisma.user.delete({
            where:{id}
         })

         res.status(200).send({message:"User Deleted"})
    }
    catch(err)
    {
       console.log(err);
       res.status(500).send({message:"Failed To Delete user"})
    }
   
   }

   export const savePost = async (req, res) => {
      const postId = req.body.postId;
      const tokenUserId = req.userId;
    
      try {
        const savedPost = await prisma.savedPost.findUnique({
          where: {
            userId_postId: {
              userId: tokenUserId,
              postId,
            },
          },
        });
    
        if (savedPost) {
          await prisma.savedPost.delete({
            where: {
              id: savedPost.id,
            },
          });
          res.status(200).json({ message: "Post removed from saved list" });
        } else {
          await prisma.savedPost.create({
            data: {
              userId: tokenUserId,
              postId,
            },
          });
          res.status(200).json({ message: "Post saved" });
        }
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to delete users!" });
      }
    };
    
    export const profilePosts = async (req, res) => {
      const tokenUserId = req.userId;
      try {
        const userPosts = await prisma.post.findMany({
          where: { userId: tokenUserId },
        });
        const saved = await prisma.savedPost.findMany({
          where: { userId: tokenUserId },
          include: {
            post: true,
          },
        });
    
        const savedPosts = saved.map((item) => item.post);

        // console.log("Mylist",userPosts)
        // console.log("savedlist",savedPosts)

        res.status(200).json({ userPosts, savedPosts });
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to get profile posts!" });
      }
    };
    