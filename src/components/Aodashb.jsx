import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Typography } from "antd";
import { Link, Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import components from "./index";
import axios from "axios";
import { baseurl } from "../App";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;
console.log(components);

const Aodashb = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [comps, setcomps] = useState([]);
  const dynamiccomps = (naam, pro) => {
    // console.log(naam, components[naam]);
    const Comp = components[naam];
    return <Comp {...pro} />;
  };
  useEffect(() => {
    axios.get(`${baseurl}/account/dashboard/`).then((res) => {
      console.log(res.data);
      setcomps(res.data.routes);
    });
  }, []);

  return (
    <Layout className="w-screen h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="text-white text-2xl font-bold text-center mb-5 mt-2">
          GoHall
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          {comps.map((item) => {
            return (
              <Menu.Item key={item.id}>
                <Link to={item.route}>
                  <span>{item.text}</span>
                </Link>
              </Menu.Item>
            );
          })}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="flex items-center justify-between"
          style={{
            padding: 0,
            background: "#fff",
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger w-14 flex justify-center items-center",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <Title level={2} className="mt-3">
            Dashboard
          </Title>
          <div></div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {/* <Outlet /> */}
          <Routes>
            {comps.map((item) => {
              return (
                <Route
                  path={item.route}
                  element={dynamiccomps(item.component, item.props)}
                />
              );
            })}
          </Routes>

          {/* <Route path="addhall" element={<Addhall />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="bookingfm" element={<Bookingfm />} /> */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Aodashb;
