import styled from "styled-components";
import Button from "../components/common/Button";
import { useUser } from "../hooks/useUser";
import { FormEvent, useState } from "react";
import InputText from "../components/common/InputText";
import { useForm } from "react-hook-form";
import { iJoinFormProps } from "../models/users.model";
import { useUserStore } from "../store/userStore";
import { emailRegex } from "../constans/regexPatterns";
import { useNavigate } from "react-router-dom";

export const allowedDomain = [
  "naver.com",
  "gmail.com",
  "github.com",
  "daum.net",
  "kakao.com",
  "test.com",
];

const JoinPages = () => {
  const [sendEmail, setSendEamil] = useState<boolean>(false);
  const [authCheck, setAuthCheck] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [confirmNum, setConfirmNum] = useState<string>("");
  const { randomNum, setRandomNum } = useUserStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<iJoinFormProps>({
    mode: "onChange",
  });
  const { userEmailCheck, userJoin } = useUser();

  const setEmailData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const setCheckData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmNum(e.target.value);
  };

  const domainCheck = (email: string) => {
    const [, domain] = email.split("@");
    if (allowedDomain.includes(domain)) return true;
    return false;
  };
  const onPostEmailCheck = async (e: FormEvent) => {
    if (sendEmail && authCheck) {
      setAuthCheck(false);
      setSendEamil(false);
    }
    e.preventDefault();
    if (email === "") {
      setError(
        "email",
        { message: "이메일을 작성하세요." },
        { shouldFocus: true }
      );
    }
    if (!emailRegex.test(email)) {
      setError(
        "email",
        { message: "이메일 형식이 아닙니다." },
        { shouldFocus: true }
      );
      return;
    }
    if (!domainCheck(email)) {
      console.log("저기");
      setError(
        "email",
        { message: "허용되지 않은 도메인입니다." },
        { shouldFocus: true }
      );
      return;
    }
    const { randomNum } = await userEmailCheck(email);
    console.log(randomNum);
    if (randomNum) {
      setSendEamil(true);
      setRandomNum(randomNum);
    }
  };
  const onAuthNumberCheck = (e: FormEvent) => {
    e.preventDefault();
    if (randomNum !== confirmNum) {
      window.alert("인증번호를 확인하세요");
    } else {
      setAuthCheck(!authCheck);
    }
  };
  const onSubmit = (data: iJoinFormProps) => {
    if (!authCheck) {
      setError(
        "email",
        { message: "이메일 인증을 먼저 진행해주세요." },
        { shouldFocus: true }
      );
    }
    if (data.password !== data.passwordCheck) {
      setError(
        "password",
        { message: "비밀번호를 확인해주세요." },
        { shouldFocus: true }
      );
      reset({ password: "", passwordCheck: "" });
      return;
    }
    const reqData = {
      email: data.email,
      password: data.password,
    };
    userJoin(reqData)
      .then((res) => {
        window.alert(res.message);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <JoinPagesStyle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <legend>회원가입</legend>
        <fieldset>
          <label>email</label>
          <InputText
            {...register("email", {
              required: { value: true, message: "이메일을 입력하세요." },
            })}
            type="email"
            // value={email}
            placeholder="이메일을 입력하세요"
            onChange={setEmailData}
          />
          {!authCheck && (
            <Button type="button" onClick={onPostEmailCheck}>
              인증하기
            </Button>
          )}
          {authCheck && <p className="check-email">인증이 완료되었습니다.</p>}
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
        </fieldset>
        {sendEmail && !authCheck && (
          <>
            <fieldset>
              <label>인증번호</label>
              <InputText
                {...register("emailCheck", {
                  required: {
                    value: true,
                    message: "인증번호를 입력하세요.",
                  },
                })}
                type="text"
                placeholder="인증번호 6자리를 입력하세요."
                onChange={setCheckData}
              />
              {!authCheck && (
                <>
                  <Button type="button" onClick={onAuthNumberCheck}>
                    인증번호 확인
                  </Button>
                </>
              )}
              {errors.emailCheck && (
                <p className="error-message">{errors.emailCheck.message}</p>
              )}
            </fieldset>
          </>
        )}
        <fieldset>
          <label>password</label>
          <InputText
            {...register("password", {
              required: { value: true, message: "비밀번호를 입력하세요." },
            })}
            type="password"
            placeholder="영문, 숫자, 특수문자 중 2가지 이상을 사용하세요"
          />
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}
        </fieldset>
        <fieldset>
          <label>password check</label>
          <InputText
            {...register("passwordCheck", {
              required: { value: true, message: "비밀번호 확인을 입력하세요." },
            })}
            type="password"
            placeholder="영문, 숫자, 특수문자 중 2가지 이상을 사용하세요"
          />
          {errors.passwordCheck && (
            <p className="error-message">{errors.passwordCheck.message}</p>
          )}
        </fieldset>
        <Button type="submit">회원가입</Button>
      </form>
    </JoinPagesStyle>
  );
};

const JoinPagesStyle = styled.div``;

export default JoinPages;
