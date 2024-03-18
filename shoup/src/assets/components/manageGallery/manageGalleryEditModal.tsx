import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, Select, message, InputNumber } from 'antd';

interface Artwork {
  artwork_id: number;
  artwork_name: string;
  artwork_description: string;
  artist_name: string;
  artwork_type: string;
  sold_artwork_qty: number;
}

interface ManageGalleryEditProps {
  onClose: () => void;
  artwork: Artwork | null;
  visible: boolean;
}

const ManageGalleryEditModal: React.FC<ManageGalleryEditProps> = ({ artwork, visible, onClose }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (artwork) {
      form.setFieldsValue({
        artwork_name: artwork.artwork_name || '',
        artwork_description: artwork.artwork_description || '',
        artwork_type: artwork.artwork_type || '',
        sold_artwork_qty: artwork.sold_artwork_qty || 0,
      });
    }
  }, [artwork, form]);

  const onFinish = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append('artwork_name', values.artwork_name);
      formData.append('artwork_description', values.artwork_description);
      formData.append('artwork_type', values.artwork_type);
      formData.append('sold_artwork_qty', values.sold_artwork_qty);

      if (!artwork) {
        console.error('Artwork data is missing.');
        message.error('An error occurred while updating artwork. Please try again.');
        return;
      }

      const response = await fetch(`http://localhost:5000/artworks/update/${artwork.artwork_id}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Update successful:', data);
        message.success('Artwork updated successfully');
        onClose();
      } else {
        const errorData = await response.json();
        console.error('Update failed:', errorData);
        message.error('Failed to update artwork. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('An error occurred while updating artwork. Please try again.');
    }
  };

  return (
    <Modal
      title={artwork ? artwork.artwork_name : ''}
      visible={visible}
      onCancel={onClose}
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

        <Form.Item
          name="sold_artwork_qty"
          label="Sold Quantity"
          rules={[{ required: true, message: 'Please input quantity!' }]}
        >
          <InputNumber min={1} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ManageGalleryEditModal;
