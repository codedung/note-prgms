import { User } from "@/Users/users.entity";
import jwt from "jsonwebtoken";

const getToken = async (user: User, secret: string, expire: string) => {
  const payload = {
    id: user.id,
    email: user.email,
    profile: user.profile,
  };
  const token = jwt.sign(payload, secret, {
    expiresIn: expire,
  });
  return token;
};
export { getToken };
