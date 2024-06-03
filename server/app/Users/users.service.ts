import { dataSource } from "@/utils/typeormConn";
import { User } from "./users.entity";
import {
  getHashPassword,
  matchPassword,
  sendMailFunction,
} from "@/utils/users.util";
import { iRegisterProps } from "./users.type";
import {
  CHECK_EMAIL_PASSWORD,
  DOES_NOT_EXIST_USER,
  EXIST_USER,
  FAIL_SEND_EMAIL,
  SUCCESS_JOIN,
  SUCCESS_LOGIN,
  SUCCESS_SEND_EMAIL,
} from "@/constant/message";
import {
  NORMAL_EXPIRED_IN,
  NORMAL_SECRET_KEY,
  REFRESH_EXPIRED_IN,
  REFRESH_SECRET_KEY,
} from "@/setting";
import { getToken } from "@/utils/auth.utils";

const userRepository = dataSource.getRepository(User);

const sendMail = async (email: string) => {
  const sendResult = await sendMailFunction(email);
  if (!sendResult.success) return { success: false, msg: FAIL_SEND_EMAIL };
  return {
    success: true,
    msg: SUCCESS_SEND_EMAIL,
    randomNum: sendResult.randomNum,
  };
};
const getUserData = async (email: string) => {
  const matchData: User | null = await userRepository.findOneBy({
    email: email,
  });
  if (matchData === null) return { msg: DOES_NOT_EXIST_USER };
  return { msg: EXIST_USER, user: matchData };
};

const userRegister = async (user: iRegisterProps) => {
  const userInfo = new User();
  const userMatch = await getUserData(user.email);
  if (userMatch.msg === EXIST_USER) return { success: false, msg: EXIST_USER };
  userInfo.email = user.email;
  const hashPassword = await getHashPassword(user.password);
  userInfo.password = hashPassword;

  await userRepository.save(userInfo);
  return { success: true, msg: `${user.email}님 ${SUCCESS_JOIN}` };
};

const userLogin = async (user: Pick<iRegisterProps, "email" | "password">) => {
  const userMatch = await getUserData(user.email);
  const userInfo = userMatch.user;
  if (userInfo === undefined) return { success: false, msg: userMatch.msg };
  const passwordMatch = await matchPassword(user.password, userInfo.password);
  if (!passwordMatch) return { success: false, msg: CHECK_EMAIL_PASSWORD };
  const accessToken = await getToken(
    userInfo,
    NORMAL_SECRET_KEY,
    NORMAL_EXPIRED_IN
  );
  const refreshToken = await getToken(
    userInfo,
    REFRESH_SECRET_KEY,
    REFRESH_EXPIRED_IN
  );

  return {
    success: true,
    msg: SUCCESS_LOGIN,
    token: { accessToken, refreshToken },
    user: userInfo,
  };
};

const UsersService = { userRegister, getUserData, userLogin, sendMail };
export default UsersService;
