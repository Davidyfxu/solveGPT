import React from "react";
import { Layout, Nav, Button, Image } from "@douyinfe/semi-ui";
import {
  IconSemiLogo,
  IconBell,
  IconHome,
  IconLive,
  IconSetting,
  IconMoon,
} from "@douyinfe/semi-icons";
import { Outlet, useNavigate } from "react-router-dom";

const Home = () => {
  const { Header, Footer, Content } = Layout;
  const navigator = useNavigate();
  const switchMode = () => {
    const body = document.body;
    if (body.hasAttribute("theme-mode")) {
      body.removeAttribute("theme-mode");
    } else {
      body.setAttribute("theme-mode", "dark");
    }
  };

  return (
    <Layout style={{ height: "98vh" }}>
      <Header>
        <Nav mode="horizontal" defaultSelectedKeys={["Home"]}>
          <Nav.Header>
            <Image width={250} height={70} src={"src/assets/solveGPT.jpg"} />
          </Nav.Header>
          <Nav.Item
            itemKey="classNote"
            text="课堂讲义"
            icon={<IconHome size="large" />}
            onClick={() => navigator("/class-note")}
          />
          <Nav.Item
            itemKey="questionUpload"
            text="题目管理"
            icon={<IconLive size="large" />}
            onClick={() => navigator("/question-upload")}
          />
          <Nav.Item
            itemKey="chat"
            text="自动批改"
            icon={<IconSetting size="large" />}
            onClick={() => navigator("/chat")}
          />
          <Nav.Footer>
            <Button
              theme="borderless"
              onClick={switchMode}
              icon={<IconMoon size="large" />}
            />
          </Nav.Footer>
        </Nav>
      </Header>
      <Content
        style={{
          padding: "16px",
        }}
      >
        <Outlet />
      </Content>
      <Footer
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "16px",
          color: "var(--semi-color-text-2)",
          backgroundColor: "rgba(var(--semi-grey-0), 1)",
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconHome size="large" style={{ marginRight: "8px" }} />
          <span>Copyright © 2023 SolveGPT. All Rights Reserved. </span>
        </span>
      </Footer>
    </Layout>
  );
};

export default Home;
