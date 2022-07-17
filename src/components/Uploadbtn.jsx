import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import React from 'react';

const beforeUpload = (file) =>{
  {
    const isPNG = file.type === 'image/png';

    if (!isPNG) {
      message.error(`${file.name} is not a png file`);
    }
    const reader = new FileReader();

    reader.onload = e => {
        console.log(e.target.result);
    };
    reader.readAsText(file);
    return isPNG || Upload.LIST_IGNORE;
  }
}
const props = {
  beforeUpload: (file) => {
    const isPNG = file.type === 'image/png';

    if (!isPNG) {
      message.error(`${file.name} is not a png file`);
    }
    const reader = new FileReader();

    reader.onload = e => {
        console.log(e.target.result);
    };
    reader.readAsText(file);
    return isPNG || Upload.LIST_IGNORE;
  },
  onChange: (info) => {
    console.log(info.fileList);
  },
};

const Uploadbtn = () => (
  <Upload {...props}>
    <Button icon={<UploadOutlined />}>Upload jpg only</Button>
  </Upload>
);

export default Uploadbtn;