import { Request, Response } from "express";
import { User } from "../entity/User";
import { getUserByEmail, storeUser } from "../services/users/user.services";
import { IExcelData } from "../types/IExcelData";
import { read, utils } from "xlsx";

export const uploadUserExcelFile = async (req: Request, res: Response) => {
  try {
    let existedUserArrayId = [];
    const path = req.file?.buffer;
    if(!path){
        return res.status(409).json({
            success: false,
            message: "File path not found!"
        })
    }

    const workbook = read(path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data: IExcelData[] = utils.sheet_to_json(sheet) as IExcelData[];

    if(data.length === 0){
        return res.status(401).json({
            success: false,
            message: "Don't have data!"
        })
    }

    for (const item of data) {
      //Check existed user
      if(await getUserByEmail(item["Email"])){
        existedUserArrayId.push(item["STT"]);
      } else {
        //Insert user to database
        const user = new User();
        user.fullname = item["Họ và tên"];
        user.username = "";
        user.email = item["Email"];
        user.password = "";
        await storeUser(user);
      }
    }

    return res.status(200).json({
      success: true,
      message: `${data.length - existedUserArrayId.length} have inserted in DB ${existedUserArrayId.length} can't insert to DB: STT: ${existedUserArrayId}`
    });
  } catch (error) {
    console.log(`Fail to upload this file, ${error}`);
    return res.status(400).json({
      success: false,
      message: "Fail to upload this file!"
    });
  }
};