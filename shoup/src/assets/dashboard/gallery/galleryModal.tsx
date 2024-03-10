import React from 'react';
import { Modal, Table, Button } from 'antd';

interface Artwork {
  artwork_id: number;
  artwork_name: string;
  artwork_image: string;
  artwork_description: string;
  artist_name: string;
  artwork_type: string;
}

interface GalleryModalProps {
  artwork: Artwork | null;
  visible: boolean;
  onClose: () => void;
}

const GalleryModal: React.FC<GalleryModalProps> = ({ artwork, visible, onClose }) => {
  const columns = [
    {
      title: 'Attribute',
      dataIndex: 'attribute',
      key: 'attribute',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    },
  ];

  const modalData = [
    { attribute: 'Artwork Image', value: artwork ? <img src={`${process.env.PUBLIC_URL}/artwork/${artwork.artwork_image}`} alt={artwork.artwork_name} style={{ maxWidth: '100%', height: 'auto' }} /> : null },
    { attribute: 'Name', value: artwork ? artwork.artwork_name : '' },
    { attribute: 'Description', value: artwork ? artwork.artwork_description : '' },
    { attribute: 'Made By', value: artwork ? artwork.artist_name : '' },
    { attribute: 'Type of Art', value: artwork ? artwork.artwork_type : '' },
  ];

  return (
    <Modal
      title={artwork ? artwork.artwork_name : ''}
      visible={visible}
      onCancel={onClose}
      footer={[
        
      ]}
    >
      <Table
        dataSource={modalData}
        columns={columns}
        pagination={false}
        showHeader={false}
      />
    </Modal>
  );
};

export default GalleryModal;
