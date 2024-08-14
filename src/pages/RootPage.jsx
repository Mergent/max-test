import React from "react"
import { Link, Outlet } from "react-router-dom";

import { Breadcrumb, Layout, theme } from 'antd';
import Logo from "../components/UI/Logo";
const { Header, Content, Footer } = Layout;

const RootPage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Header>
      </Header>
      <Content
        style={{
          padding: '0 48px',
        }}
      >
        <Breadcrumb
          items={[
            {
              title: <Link to="/">Home</Link>
            },
            {
              title: <Link to="/users">Users</Link>
            },
            {
              title: <Link to="/register">Registration</Link>
            },

          ]}
        />

        <div
          style={{
            background: colorBgContainer,
            minHeight: "auto",
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <Logo />
          <Outlet />
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',

        }}
      >
        {new Date().getFullYear()} Created by max
      </Footer>
    </Layout>
  );
};
export default RootPage;
