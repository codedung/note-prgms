import { DOES_NOT_EXIST_USER } from "@/constant/message";
import bcrypt from "bcrypt";
import { transport } from "./nodemailer";
import { APP_USER } from "@/setting";
const getHashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
};

const matchPassword = async (
  password: string,
  hashPassword: string | undefined
) => {
  if (hashPassword === undefined) return { msg: DOES_NOT_EXIST_USER };
  const result = await bcrypt.compare(password, hashPassword);
  return result;
};

const getRandomNumber = () => {
  return String(Math.floor(Math.random() * 100000)).padStart(6, "0");
};

const sendMailFunction = async (email: string) => {
  try {
    const randomNum = getRandomNumber();
    await transport.sendMail({
      from: APP_USER,
      to: email,
      subject: "Note, 인증번호를 확인하세요",
      text: `인증번호 : ${randomNum}를 입력해주세요.`,
    });
    return { success: true, randomNum: randomNum };
  } catch (err) {
    return { success: false };
  }
};
export { getHashPassword, matchPassword, sendMailFunction };
