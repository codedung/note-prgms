export interface iUserProps {
  email: string;
  password: string;
}

export interface iResJoinProps {
  message: string;
}

export interface iJoinFormProps extends iUserProps {
  emailCheck: string;
  passwordCheck: string;
}
