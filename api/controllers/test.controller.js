import jwt from 'jsonwebtoken';
export const shouldBeLoggedIn =async (req, res) => {
     
    // this is already done in middleware
    //  if(!req.userId) return res.status(401).json({message: 'Unauthorized'});
    
    res.status(200).json({message:`You are authenticated`});
}

export const shouldBeAdmin = (req, res) => {
     
    // verify token lay ne karvanu
    const token = req.cookies.token;
    
    if(!token) return res.status(401).json({message:'Unauthorized'});
    
    jwt.verify(token,process.env.JWT_SECRET,async (err,payload) => {
        if(err) return res.status(403).json({message:'Token is invalid'});
        if(!payload.isAdmin)
        {
            return res.status(403).json({message:'Not authorized'});
        }
    })
   
    res.status(200).json({message:"You are authorized"});
}
