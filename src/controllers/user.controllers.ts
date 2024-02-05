import { Request, Response } from "express";


export const hello = async (_: Request, res: Response) => {
    try {
        res.send(`hello manh vu`);
    } catch (error) {
        console.log(error)
    }
  };