import { Request, Response } from "express";
import UsersService from "@/Users/users.service";
import { StatusCodes } from "http-status-codes";
import {
  CHECK_EMAIL_PASSWORD,
  DOES_NOT_EXIST_USER,
  EXIST_USER,
  FAIL_SEND_EMAIL,
} from "@/constant/message";
import { COOKIE_EXPIRED } from "@/setting";

const join = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    if (user.email === "" || user.password === "")
      throw new Error(CHECK_EMAIL_PASSWORD);
    const joinResult = await UsersService.userRegister(user);
    if (!joinResult.success) throw new Error(joinResult.msg);
    return res.status(StatusCodes.OK).json({ message: joinResult.msg });
  } catch (err) {
    if (err instanceof Error) {
      if (err.message === EXIST_USER)
        return res.status(StatusCodes.CONFLICT).json({ message: err.message });
      if (err.message === CHECK_EMAIL_PASSWORD)
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: err.message });
    }
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    console.log(user.email);
    console.log(user.password);
    if (
      (user.email === "" && user.password === "") ||
      (user.email !== "" && user.password === "") ||
      (user.email == "" && user.password !== "")
    )
      throw new Error(CHECK_EMAIL_PASSWORD);

    const loginResult = await UsersService.userLogin(user);
    if (!loginResult.success) throw new Error(loginResult.msg);
    res.setHeader("Authorization", `Bearer ${loginResult.token?.accessToken}`);
    res.cookie("refreshToken", loginResult.token?.refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + COOKIE_EXPIRED),
    });
    res.status(StatusCodes.OK).json({
      message: loginResult.msg,
      userId: loginResult.user?.id,
      email: loginResult.user?.email,
    });
  } catch (err) {
    if (err instanceof Error) {
      if (err.message === DOES_NOT_EXIST_USER)
        return res.status(StatusCodes.NOT_FOUND).json({ message: err.message });
      if (err.message === CHECK_EMAIL_PASSWORD)
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: err.message });
    }
  }
};
const checkEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    console.log(email);
    const sendMailResult = await UsersService.sendMail(email);
    if (!sendMailResult.success) throw new Error(sendMailResult.msg);
    res.status(StatusCodes.OK).json({
      randomNum: sendMailResult.randomNum,
    });
  } catch (err) {
    if (err instanceof Error) {
      if (err.message === FAIL_SEND_EMAIL)
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: err.message });
    }
  }
};
const UsersController = { join, login, checkEmail };
export default UsersController;
