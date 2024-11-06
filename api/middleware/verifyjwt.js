import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next)=>{
    const token = req.cookies.token;
    
    if(!token){
        return res.status(401).json({message:'Unauthorized'});
    }
    //verify token is logged in
    jwt.verify(token,process.env.JWT_SECRET, async (err,payload) => {
        
        if(err) return res.status(403).json({message:'Token is invalid'});
        
        // console.log("payload : " + JSON.stringify(payload));
        req.userId = payload.id;
        next();
    })
}