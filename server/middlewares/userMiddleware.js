import jwt from "jsonwebtoken";


export async function verifyUserToken(req,res,next) {
    try {
        const token=req.cookies.token;
        

        if(!token){
            return res.json({
                success:false,
                message:"Unauthorized.. Login Again"
            })
        }

        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)

        if(!decoded){
            return res.json({
                success:false,
                message:"Unauthorized.. Login Again"
            })
        }

        

        req.user = decoded;

        next();
        


    } catch (error) {
        console.log(error.message);
        
    }
}   