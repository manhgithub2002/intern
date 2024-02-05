import { User } from "./../entity/User";
import { Request, Response } from "express";
import {
  getUserById,
  getUserByUsername,
  storeUser,
} from "../services/users/user.services";
import argon2 from "argon2";
import { createToken, sendRefreshToken } from "../utils/auth.utils";
import { UserAuthPayload } from "../types/UserAuthPayload";
import admin from '../firebaseConfig'

export const register = async (req: Request, res: Response) => {
  try {
    const { fullname, username, email, password } = req.body;

    const existingUser = await getUserByUsername(username);

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Username is existed!",
      });
    }

    const hassedPassword = await argon2.hash(password);

    const newUser = new User();
    newUser.fullname = fullname;
    newUser.username = username;
    newUser.email = email;
    newUser.password = hassedPassword;

    await storeUser(newUser);

    return res.status(200).json({
      success: true,
      message: "User registration successful!",
      user: newUser,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: error,
      success: "Fail to register!"
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const existingUser = await getUserByUsername(username);

  if (!existingUser) {
    return res.status(409).json({
      success: false,
      message: "User not found!",
    });
  }

  const isPassword = await argon2.verify(existingUser.password, password);

  if (!isPassword) {
    return res.status(400).json({
      success: false,
      message: "Incorrect password!",
    });
  }

  sendRefreshToken(res, existingUser);

  return res.status(200).json({
    success: true,
    message: "Login successfully!",
    user: existingUser,
    accessToken: createToken("accessToken", existingUser),
  });
};

export const loginWithFirebase = async (req: Request, res: Response) => {
  const { idToken } = req.body;
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    const existingUser = await getUserByUsername(decodedToken.email);

    if (existingUser) {
      //update time,refresh token
      return res.status(200).json({
        success: true,
        message: "Login successfully!",
        user: existingUser,
      })
    } else {
      //insert new user
      const newUser = new User();
      newUser.fullname = decodedToken.name;
      newUser.username = '';
      newUser.email = decodedToken.email;
      newUser.password = '';

      await storeUser(newUser);

      return res.status(200).json({
        success: true,
        message: "Login successfully!",
        user: newUser,
      })
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send('');
  }
}
export const logout = async (req: Request, res: Response) => {
  const userId = req.body.id as number;

  const existingUser = await getUserById(userId);

  if (!existingUser) {
    return res.status(400).json({
      success: false,
    });
  }

  existingUser.tokenVersion += 1;

  await storeUser(existingUser);

  res.clearCookie(process.env.REFRESH_TOKEN_COOKIE_NAME as string, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/refresh_token",
  });

  return res.status(200).json({
    success: true,
  });
};

export const hello = async (req: Request, res: Response) => {
  const userReq = req as UserAuthPayload;
  if(!userReq){
    return res.status(400).json({
      success: false,
      message: "Get some error!"
    })
  }
  const user = await getUserById(userReq.decodedUser.userId);

  return res.status(200).json({
    success: true,
    message: `hello manh vu, ${user?.fullname}`
  })
};
