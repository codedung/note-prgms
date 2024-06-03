import { ReactNode } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface LayoutProps {
  children: ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <LayoutStyle>
      <Link to="/login">로그인</Link>
      <Link to="/join">회원가입</Link>
      {children}
    </LayoutStyle>
  );
};

const LayoutStyle = styled.div``;

export default Layout;
