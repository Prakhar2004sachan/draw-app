import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export function genrateToken(payload : object){
    // @ts-ignore
    return jwt.sign(payload, JWT_SECRET, {expiresIn: "15d"})
}

export function verifyToken(token: string){
    // @ts-ignore
    return jwt.verify(token, JWT_SECRET) as {userId: string, email: string};
}