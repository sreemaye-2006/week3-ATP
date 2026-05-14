import jwt from 'jsonwebtoken';

const { verify } = jwt;

/**
 * Middleware to verify JSON Web Token (JWT) from cookies.
 * Secures API endpoints by ensuring the user is authenticated.
 */
export function verifyToken(req, res, next) {
    // To access the cookies property of the request object, we need 
    // the cookie-parser middleware. Otherwise, req.cookies is undefined.
    const token = req.cookies?.token;
    
    // If no token exists in cookies
    if (!token) {
        return res.status(401).json({ message: "Please login to access this resource" });
    }
    
    // If token exists, try to verify it
    try {
        // Replace 'abcdef' with a proper secret key from environment variables in production
        const decodedToken = verify(token, 'abcdef'); 
        console.log("Decoded Token:", decodedToken);
        
        // Pass control to the next middleware or route handler
        next();
    } catch(err) {
        // Token is invalid or expired
        res.status(401).json({ message: "Session expired or invalid token. Please relogin." });
    }
}