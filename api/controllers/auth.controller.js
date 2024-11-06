import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma.js';


export const register = async (req, res) => {
    // get data from body 
    const { username, email, password } = req.body;
    try {
        // Check if the username or email already exists
        const existingUser = await prisma.user.findFirst({where: {email: email}});
        
        if (existingUser) {
            const errors = {}; // this is object for errors messages

            if (existingUser.email === email) {
                errors.email = "Email already exists!";
            }
            return res.status(400).json({ errors });
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashPassword,
            }
        });

        res.status(201).json({ message: 'Registration successful!'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to register!' });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body; // fileds from login page 

    try { 
        // Check if the user exists
        const user = await prisma.user.findUnique({ where: {email} });
        
        if (!user) return res.status(400).json({ message: "Invalid Credentials!" });
        
        // Compare the provided password with the hashed password
        // password -> client form ma je add kare te
        // user.password -> database mathi hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: "Invalid Credentials!" });
        
        const maxAge = 1000 * 60 * 60 * 24;
        //create  token with payload and secret key
            const token = jwt.sign({id: user.id,isAdmin:true},  process.env.JWT_SECRET,{expiresIn: maxAge});

            // console.log('token ->', token);
            const {password:userPass, ...userInfo} = user; 

            // set cookie and send user info in res 
            res.cookie( "token", token, {httpOnly: true,maxAge:maxAge,/*secure:true*/}).status(200).json(userInfo);
        }
     catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to log in!' });
    }
}

export const logout = (req, res) => {

    res.clearCookie("token").status(200).json({ message: 'Logout successful!' });
}
