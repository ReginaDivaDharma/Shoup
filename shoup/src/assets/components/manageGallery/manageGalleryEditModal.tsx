import React, { useState } from 'react';
import { Modal, Form, Input, Button, Upload, Select, message } from 'antd';

interface ManageGalleryEditProps {
  visible: boolean;
  onCancel: () => void;
  onAdd: (values: any) => void;
}

const ManageGalleryEditModal: React.FC<ManageGalleryEditProps> = ({ visible, onCancel, onAdd }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);

  const onFinish = async (values: any) => {
    console.log('Received values:', values);
  
    try {
      const formData = new FormData();
      formData.append('artwork_name', values.artwork_name);
      formData.append('artwork_description', values.artwork_description);
      formData.append('artwork_type', values.artwork_type);
  
      const response = await fetch(`http://localhost:5000/artworks/update/:id`, {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Upload successful:', data);
        message.success('Artwork uploaded successfully');
        onAdd(values); 
      } else {
        const errorData = await response.json();
        console.error('Upload failed:', errorData);
        message.error('Failed to upload artwork');
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('An error occurred while uploading artwork');
    }
  };

  const onUploadChange = ({ fileList }: { fileList: any }) => {
    setFileList(fileList);
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <Modal
      title="Edit Artwork"
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="artwork_name" label="Artwork Name" rules={[{ required: true, message: 'Please input Name!' }]}>
          <Input />
        </Form.Item>

        <Form.Item
          name="artwork_description"
          label="Artwork Description"
          rules={[{ required: true, message: 'Please input description!' }]}
        >
          <Input.TextArea />
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

        <Form.Item>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ManageGalleryEditModal;
