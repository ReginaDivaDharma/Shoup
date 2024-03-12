import React from 'react';
import { Modal, Form, Input, Button, Upload, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

interface Props {
  visible: boolean;
  onCancel: () => void;
  onAdd: (values: any) => void;
}

const ManageGalleryModal: React.FC<Props> = ({ visible, onCancel, onAdd }) => {
  const [form] = Form.useForm();

  const handleFinish = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append('artwork_name', values.artwork_name);
      formData.append('artwork_description', values.artwork_description);
      formData.append('user_id', values.artist_name); // Assuming the artist_name is the artist_id
      formData.append('artwork_type', values.artwork_type);
      if (values.artwork_image) {
        formData.append('artwork_image', values.artwork_image[0].originFileObj);
      }

      const response = await fetch('http://localhost:5000/artworksnew', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        onAdd(values);
        form.resetFields();
      } else {
        console.error('Error adding artwork:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding artwork:', error);
    }
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <Modal
      title="Add Artwork"
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} onFinish={handleFinish} action="http://localhost:5000/artworksnew" method="post">
        <Form.Item label="Artwork Name" name="artwork_name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Artwork Description" name="artwork_description" rules={[{ required: true }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="artist_name"
          label="Artist Name"
          rules={[{ required: true, message: 'Please select an artist' }]}
        >
          <Select placeholder="Select an artist">
            <Select.Option value="1">Choutato</Select.Option>
            <Select.Option value="2">RottenCarrot</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="artwork_type"
          label="Artwork Type"
          rules={[{ required: true, message: 'Please select an artwork type' }]}
        >
          <Select placeholder="Select an type">
            <Select.Option value="Keychain">Keychain</Select.Option>
            <Select.Option value="Phonestrap">Phonestrap</Select.Option>
            <Select.Option value="Standee">Standee</Select.Option>
            <Select.Option value="Whiteboard">Whiteboard</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="artwork_image"
          label="Artwork Image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            name="artwork_image"
            listType="picture"
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form>
    </Modal>
  );
};

export default ManageGalleryModal;
