import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  TimePicker,
  Select,
  Typography,
} from "antd";
import axios from "axios";
import React, { useState } from "react";
import { baseurl } from "../App";

const { Title } = Typography;
const { RangePicker } = DatePicker;

const config = {
  rules: [
    {
      type: "object",
      required: true,
      message: "Please select time!",
    },
  ],
};
const rangeConfig = {
  rules: [
    {
      type: "array",
      required: true,
      message: "Please select time!",
    },
  ],
};

const Bookingfm = () => {
  const [componentSize, setComponentSize] = useState("default");

  const [fdate, setfdate] = useState("");
  const [tdate, settdate] = useState("");
  const [pcount, setpcount] = useState("");
  const [hlist, sethlist] = useState([
    { id: -1, name: "Select From/To Date and Occupancy" },
  ]);

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const blurfunc = () => {
    console.log(pcount === "" || tdate === "" || fdate === "");
    if (pcount === "" || tdate === "" || fdate === "") {
      console.log("empty");
      return;
    }
    axios
      .get(`${baseurl}/hall/list/`, {
        params: {
          start: fdate,
          end: tdate,
          occupancy: pcount,
        },
      })
      .then((res) => {
        console.log(res.data);
        sethlist(res.data);
      })
      .catch((err) => {
        sethlist([{ id: -2, name: "Enter valid Date" }]);
      });
  };

  const changef = (e) => {
    console.log(e);
    setfdate(e[0]._d.toISOString());
    settdate(e[1]._d.toISOString());
  };
  const changeff = (e) => {
    console.log(e);
    setpcount(e);
    // console.log(pcount);
  };
  const onFinish = (values) => {
    // console.log("hello")
    //   const rangeValue = fieldsValue['range-picker'];
    //   const rangeTimeValue = fieldsValue['range-time-picker'];
    //   const values = {
    //     ...fieldsValue,
    //     'range-time-picker': [
    //       rangeTimeValue[0].toISOString(),
    //       rangeTimeValue[1].toISOString(),
    //     ],
    //   };
    values = { ...values, start: fdate, end: tdate };
    axios.post(`${baseurl}/hall/book/`, values).then((res) => {
      console.log(res);
    });
  };

  return (
    <>
      <Title level={2} className="text-center">
        Book Hall
      </Title>
      <Form
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 16,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onFinish={onFinish}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <Form.Item
          label="From/To Date and Time"
          {...rangeConfig}
          onBlur={blurfunc}
        >
          <RangePicker
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            onBlur={blurfunc}
            onChange={changef}
          />
        </Form.Item>

        <Form.Item
          label="No. of people"
          name="occupancy"
          onBlur={blurfunc}
          rules={[
            {
              required: true,
              message: "Please input Number of People",
            },
          ]}
        >
          <InputNumber onBlur={blurfunc} onChange={changeff} />
        </Form.Item>

        <Form.Item
          label="Select Hall"
          name="hall"
          rules={[
            {
              required: true,
              message: "Please Select Hall Name",
            },
          ]}
        >
          <Select>
            {hlist.map((item) => {
              if (item.id < 0) {
                return (
                  <Select.Option value={item.id} key={item.id} disabled>
                    {item.name}
                  </Select.Option>
                );
              }
              return (
                <Select.Option value={item.id} key={item.id}>
                  {item.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item
          label="Purpose"
          name="purpose"
          rules={[
            {
              required: true,
              message: "Please Enter Purpose of Booking",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Any Remarks" name="remarks">
          <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 8, offset: 6 }}>
          <Button type="primary" htmlType="submit" className="w-full">
            Request Booking
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Bookingfm;
