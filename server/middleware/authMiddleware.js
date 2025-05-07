import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

// protect routes

export const protect = async (req, res, next) => {
    let token = req.cookies.jwt
    if( token ){
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // jwt.verify(token, process.env.JWT_SECRET): This method decodes and verifies the token using the secret key (process.env.JWT_SECRET). If the token is valid, it will return the decoded payload (which is expected to contain userId in this case).
            const user = await User.findById(decoded.userId).select('-password')
            if (!user) {
                return res.status(401).json('User not found')
                // If no user is found matching the id from the jwt.
            }
            req.user = user
            // Attach user to Request: The user data is attached to req.user, making it available for downstream middleware and route handlers.
            next()
            // Next Call: If everything works, next() is called, which allows the request to continue to the next middleware or route handler.
        }catch(error){res.status(401).json('Not Authorized, token failed')}
        // If no token is found in the cookies, the request is immediately rejected with a 401 Unauthorized status and an appropriate error message.
    }
    else {
        res.status(401).json('Not Authorized, no token')
        // If an error occurs in the try block (e.g., invalid token, expired token, etc.), the error is caught, and a 401 Unauthorized response is sent back to the client, stating that the token has failed.
    }
}

