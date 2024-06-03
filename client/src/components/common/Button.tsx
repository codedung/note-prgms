import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

const Button = ({
  children,
  onClick,
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <ButtonStyle onClick={onClick}>{children}</ButtonStyle>;
};

const ButtonStyle = styled.button``;

export default Button;
