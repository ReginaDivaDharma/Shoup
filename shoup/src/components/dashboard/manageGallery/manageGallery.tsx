import React from 'react';
import { Button, Card, Form, Input, Modal } from 'antd';
import ManageGalleryTable from '../../../assets/dashboard/manageGallery/manageGalleryTable';
import ManageGalleryModal from '../../../assets/dashboard/manageGallery/manageGalleryModal';

const GalleryManage: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const handleAddArtwork = async (values: any) => {
  };

  return (
    <Card style={{ width: '100%' }}>
      <Button onClick={() => setIsModalVisible(true)} style={{ marginBottom: '16px' }}>Add Artwork</Button>
      
      <ManageGalleryModal 
        visible={isModalVisible} 
        onCancel={() => setIsModalVisible(false)} 
        onAdd={handleAddArtwork} 
      />

      <ManageGalleryTable />
    </Card>
  );
};

export default GalleryManage;
