import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import ErrorPages from "../pages/ErrorPages";
import LoginPages from "../pages/LoginPages";
import JoinPages from "../pages/JoinPages";
import { useUserStore } from "../store/userStore";
import { ReactNode } from "react";

const AuthenticateCheck = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn } = useUserStore();
  if (!isLoggedIn) return;

  return <>{children}</>;
};
const ErrorLayoutWrapper = () => (
  <Layout>
    <ErrorPages />
  </Layout>
);
const routerArray = [
  {
    path: "/",
    element: <Layout children={<h1>메인</h1>} />,
    errorElement: <ErrorLayoutWrapper />,
  },
  {
    path: "/login",
    element: (
      <AuthenticateCheck>
        <Layout children={<LoginPages />} />
      </AuthenticateCheck>
    ),
    errorElement: <ErrorLayoutWrapper />,
  },
  {
    path: "/join",
    element: <Layout children={<JoinPages />} />,
    errorElement: <ErrorLayoutWrapper />,
  },
];

export const router = createBrowserRouter(routerArray);
