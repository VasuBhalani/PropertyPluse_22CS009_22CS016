import prisma from '../lib/prisma.js';
import jwt from "jsonwebtoken"
export const getPosts = async (req,res)=>{

    const query = req.query;
    try{
        const posts = await prisma.post.findMany(
            {
                where:{
                    city: query.city || undefined,
                    type: query.type || undefined,
                    property: query.property || undefined,
                    bedroom: parseInt(query.bedroom) || undefined,
                    price: {
                      gte: parseInt(query.minPrice) || 0,
                      lte: parseInt(query.maxPrice) || 100000000,
                    },
                }
            }
        );
        res.status(200).json(posts);
       
    }
     catch(err)
     {
        console.log(err);
        res.status(500).send({message:"Failed To get Posts "})
     }

}

/*
it has all info 
-post 
-postDetail
-username
-user avtar
-from savedPost it check if it is saved or not
 if saved post then pass isSaved : true
 for retrive that we use jwt and pass user id and from perams we get post id
 
- this will use to show saved list also  


*/
export const getPost = async (req, res) => {
    const id = req.params.id;
    try {
      const post = await prisma.post.findUnique({
        where: { id },
        include: {
          postDetail: true,
          user: {
            select: {
              username: true,
              avtar: true,
            },
          },
        },
      });
  
      const token = req.cookies?.token;
  
      if (token) {
        jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
          if (!err) {
            const saved = await prisma.savedPost.findUnique({
              where: {
                userId_postId: {
                  postId: id,
                  userId: payload.id,
                },
              },
            });
            res.status(200).json({ ...post, isSaved: saved ? true : false });
          }
        });
      }
      res.status(200).json({ ...post, isSaved: false });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to get post" });
    }
  };  

export const addPost = async (req,res)=>{
     const userId = req.userId  
     if(!userId) return  res.status(403).send({message:"You are not Authorized"})

     const body = req.body;
    try{
      const newPost = await prisma.post.create({
            data : {
            ...body.postData,
            userId : userId,
            postDetail :{  // it will add data into PostDetails collection
              create : body.postDetails  // Nested data creation for PostDetail
            } 
            }
    });
    res.status(200).json({newPost});
    }catch(err){
        console.log(err);
        res.status(500).send({message:"Failed To create Post"})      
    }
}

export const updatePost = async (req,res)=>{
    try{

    }catch(err){
        console.log(err);
        res.status(500).send({message:"Failed To Update Post"})      
    }
}

export const deletePost = async (req,res)=>{
    const postid = req.params.id;
    const userId = req.userId;

    try{

        const post = await prisma.post.findUnique({
            where :{id:postid}
        })

        if(post.userId !== userId)
         return res.status(403).send({message:"You are not allowed to delete this post"})
         
        await prisma.post.delete({
            where:{id:postid}
        })

        res.status(200).send({message:"Post deleted successfully"})
    
    }catch(err){
        console.log(err);
        res.status(500).send({message:"Failed To Delete Post"})      
    }
}

