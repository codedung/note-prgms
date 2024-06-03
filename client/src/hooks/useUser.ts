import { useNavigate } from "react-router-dom";
import { checkEmail, join, login } from "../api/user.api";
import { iUserProps } from "../models/users.model";
import { useUserStore } from "../store/userStore";
export const useUser = () => {
  const { storeLogin } = useUserStore();
  const navigate = useNavigate();
  const userEmailCheck = async (email: string) => {
    try {
      const checkResponse = await checkEmail(email);
      return checkResponse;
    } catch (err) {
      console.log(err);
      return err;
    }
  };
  const userJoin = async (data: iUserProps) => {
    try {
      const joinResult = await join(data);
      return joinResult;
    } catch (err) {
      return err;
    }
  };
  const userLogin = async (data: iUserProps) => {
    try {
      const loginResult = await login(data);
      const userId = loginResult.data.userId;
      const email = loginResult.data.email;
      const accessToken = loginResult.headers["authorization"];
      const token = accessToken.split(" ")[1];
      storeLogin(token, userId, email);
      navigate("/");
    } catch (err) {
      return err;
    }
  };
  return { userEmailCheck, userJoin, userLogin };
};
