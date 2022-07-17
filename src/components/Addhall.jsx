import {
    Button,
    DatePicker,
    Form,
    Input,
    InputNumber,
    message,
    Upload,
    Typography
  } from 'antd';
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { data } from 'autoprefixer';
import { baseurl } from '../App';

const { Title } = Typography;

const Addhall = () => {

  const [defaultListOfFiles, setdefaultListOfFiles] = useState([])

  // const onFinish = (values) => {
  //   values = {...values , ...defaultListOfFiles}
  //   console.log(values);
  //   axios.post( `${baseurl}/account/login/`, values)
  //   .then((response)=>{

  //   });
  // };

  const beforeUpload = (file) =>{
    {
      const isPNG = file.type === 'image/png';
      if (!isPNG) {
        message.error(`${file.name} is not a png file`);
      }
      return isPNG || Upload.LIST_IGNORE;
    }
  }
  
  const handleOnChange = ({ file, fileList, event }) => {
    // console.log(file);
    //Using Hooks to update the state to the current filelist
    
    fileList.forEach((item)=>{
      setdefaultListOfFiles([...defaultListOfFiles, item.originFileObj])
    })
  };

  const onFinish = fieldsValue => {
    // const { onSuccess, onError, file, onProgress } = options;
    console.log(fieldsValue);
    const fmData = new FormData();
    const config = {
      headers: { "content-type": "multipart/form-data"}
    };
    defaultListOfFiles.forEach((item)=>{
      fmData.append("image", item)
    })
    console.log(fmData.getAll("images"))  
    Object.keys(fieldsValue).forEach(key => {
      // console.log(key, fieldsValue[key]);
      fmData.append(key, fieldsValue[key])
    });
    axios
      .post( `${baseurl}/accounts/hall/`, fmData, config)
      .then(res => {
        console.log(res.data);
      })
      .catch(err=>{

      });
  }
  return (
    <div>
          <Title level={2} className="mt-3 mb-2 text-center">Add a Hall</Title>
        <Form name="addhall" 
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal" 
              onFinish={onFinish}
              >
                <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Hall Name is required' }]}
                >
                    <Input />
                </Form.Item>  

                <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: 'Description is required' }]}
                >
                    <Input />
                </Form.Item>  

                <Form.Item
                label="Occupancy"
                name="max_occupancy"
                rules={[{ required: true, message: 'Occupancy is required' }]}
                >
                    <InputNumber />
                </Form.Item> 

                <Form.Item
                label="Max Booking Days"
                name="booking_limit"
                rules={[{ required: true, message: 'Maximum booking days are required' }]}

                >
                    <InputNumber />
                </Form.Item> 
                <Form.Item
                label="Upload Hall Images"
                rules={[{ required: true, message: 'Pictures are required' }]}

                >
                <Upload  beforeUpload = {beforeUpload} onChange={handleOnChange} fileList={defaultListOfFiles} customRequest={()=>{}} >
                   <Button icon={<UploadOutlined />}>Upload jpg only</Button>
                </Upload>
                </Form.Item> 
                <Form.Item wrapperCol={{
                 offset: 18,
                 span: 24,
                  }}>
                    <Button type='primary' htmlType='submit' offset={{span: 6}}>
                        + Add Hall
                    </Button>
                </Form.Item>
              </Form>
    </div>
  )
}

export default Addhall