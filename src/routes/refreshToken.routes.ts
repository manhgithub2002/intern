import express from "express";
import { JwtPayload, Secret, verify } from "jsonwebtoken";
import { getUserById } from "../services/users/user.services";
import { createToken, sendRefreshToken } from "../utils/auth.utils";

const router = express.Router();

router.get('/', async(req, res) => {
    const refreshToken = req.cookies[process.env.REFRESH_TOKEN_COOKIE_NAME as string]

    if(!refreshToken){
        return res.status(409).json({
            success: false,
            message: "Not found refresh token"
        });
    }

    try {
        const decodedUser = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as Secret) as JwtPayload & {userId: number, tokenVersion: number};

        const existingUser = await getUserById(decodedUser.userId);

        if(!existingUser || existingUser.tokenVersion != decodedUser.tokenVersion){
            return res.sendStatus(401);
        }

        sendRefreshToken(res, existingUser);

        return res.status(200).json({
            success: true,
            accessToken: createToken('accessToken', existingUser)
        })

    } catch (error) {
        console.log(`ERROR REFESH TOKEN, ${error}`);
        return res.status(400).json({
            success: false,
            message: "Error to refresh"
        });
    }
})

export default router;
