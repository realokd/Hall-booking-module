import { Button, Checkbox, Form, Input, Spin } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import { baseurl } from "../../src/App";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { LoadingOutlined } from "@ant-design/icons";

const Aologin = ({ login, lo }) => {
  const [loading, setloading] = useState(false);

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
        color: "white",
      }}
      spin
    />
  );
  let navigate = useNavigate();
  const onFinish = (values) => {
    setloading(true);
    axios
      .post(`${baseurl}/account/login/`, values)
      .then((response) => {
        localStorage.setItem("refresh", response.data.refresh);
        localStorage.setItem("access", response.data.access);
        setloading(false);
        navigate("/dashboard");
      })
      .catch((err) => {
        setloading(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Invalide Credentials",
        });
      });
  };

  useEffect(() => {
    if (localStorage.getItem("access")) navigate("/dashboard");
  }, []);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <h2 className="text-6xl font-bold pb-2">Login</h2>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" className="w-full">
            {loading ? <Spin indicator={antIcon} /> : "Login"}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Aologin;
