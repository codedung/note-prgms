import styled from "styled-components";
import Button from "../components/common/Button";
import { useForm } from "react-hook-form";
import { iUserProps } from "../models/users.model";
import InputText from "../components/common/InputText";
import { useUser } from "../hooks/useUser";
const LoginPages = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iUserProps>();

  const { userLogin } = useUser();

  const onSubmit = async (data: iUserProps) => {
    console.log(data);
    await userLogin(data);
  };
  return (
    <LoginPagesStyle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <legend>로그인</legend>
        <fieldset>
          <label>email</label>
          <InputText
            {...register("email", {
              required: { value: true, message: "이메일을 입력하세요" },
            })}
            type="text"
            placeholder="이메일을 입력하세요"
          />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
        </fieldset>
        <fieldset>
          <label>password</label>
          <InputText
            {...register("password", {
              required: { value: true, message: "비밀번호를을 입력하세요" },
            })}
            type="password"
            placeholder="영문, 숫자, 특수문자 중 2가지 이상을 사용하세요"
          />
        </fieldset>
        <Button type="submit">로그인</Button>
      </form>
    </LoginPagesStyle>
  );
};

const LoginPagesStyle = styled.div``;

export default LoginPages;
