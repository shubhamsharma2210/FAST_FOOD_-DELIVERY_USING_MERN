import jwt from 'jsonwebtoken'

const authMiddleware = async(req,res,next) => {
    const {token} = req.headers;
    if(!token){
        return res.json({success:false, message: "Not authraized login again"})
    }
    try {
        const token_decode = jwt.verify(token,process.env.JWT_SCECRET)
        req.body.userId = token_decode.id
        next();
    } catch (error) {
        console.log(error)
        res.json({success:false, message : "error auth middleware"})
    }
}

export default authMiddleware