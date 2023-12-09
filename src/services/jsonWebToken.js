import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET;

const generateToken = async (payload) => {
    try {

        return new Promise((resolve, reject) => {

            jwt.sign( payload, secret, { expiresIn: "24h" }, (err, token) => {
                if(err) {
                    throw err
                }
                resolve(token);

            });
        
        })
    } catch (err) {
        throw new Error("Error in generating token");
    }
}

const validateToken = async (req, res, next) => {
    try {
        const userToken = req.headers.token;
        const data = jwt.verify(userToken , secret);
        req.user = {
            id: data.userId,
            role: data.role
        }

        next();

    } catch (err) {
        next(err)
    } 
}


export default {
    generateToken,
    validateToken
}