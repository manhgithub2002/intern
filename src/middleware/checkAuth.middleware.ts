import { NextFunction, Request, Response } from "express";
import { JwtPayload, Secret, verify } from "jsonwebtoken";
import { UserAuthPayload } from "../types/UserAuthPayload";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        const accessToken = authHeader && authHeader.split(' ')[1];

        if (!accessToken) {
            throw new Error("Error authenticating user");
        }

        (req as UserAuthPayload).decodedUser = verify(accessToken, process.env.ACCESS_TOKEN_SECRET as Secret) as JwtPayload & {userId: number, tokenVersion: number};


        return next();
    } catch (error) {
        return res.status(500).json({
            message: `Error authenticating user, ${error.message || JSON.stringify(error)}` 
        });
    }
}