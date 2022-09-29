import config from '../config/config';
import { NextFunction, Request, Response } from "express";
import  Jwt  from "jsonwebtoken";
const verifiedToken = (req: Request, res: Response , next: NextFunction) =>{
    try {
            const authorization = req.header('authorization')
            const token = authorization?.split(' ')[1];

            if (!token){
               return res.status(400).json({error: 'Access denied'})
            }

            Jwt.verify(token || "", config.secrets.token);
            next();

    } catch (error) {
        return res.status(400).json( {error: 'invalid token'})
    }
}

export default { verifiedToken}