import React, { useState } from 'react';
import { Button, Card, Col, Form, Input, Layout, Modal, Row } from 'antd';
import ManageGalleryTable from '../../assets/components/manageGallery/manageGalleryTable';
import ManageGalleryModal from '../../assets/components/manageGallery/manageGalleryModal';
import ManageGalleryFilter from '../../assets/components/manageGallery/manageGalleryFilter';

const GalleryManage: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const handleAddArtwork = async (values: any) => {
    // Add artwork logic goes here
  };

  const [filters, setFilters] = useState<{
    orderBy: string;
    selectedArtist: string | undefined;
    searchText: string;
  }>({
    orderBy: 'asc',
    selectedArtist: '',
    searchText: ''
  });

  const handleFilterChange = (newFilters: { orderBy: string; selectedArtist: string | undefined; searchText: string }) => {
    setFilters(newFilters);
  };

  return (
    <Layout>
      <Row>
        <Col span={24}>
          <Card style={{ width: '100%' }}>
            <div className='content-item-mid' style={{
              marginBottom: '40px',
              marginTop: '10px'
            }}>
              <Button onClick={() => setIsModalVisible(true)} style={{ 
                marginBottom: '16px', 
                marginRight: 'auto',
                marginTop: '55px',
                marginLeft: '55px'
                }}>Add Artwork
              </Button>   
              <div style={{
                marginRight: '55px',
              }}>
              <ManageGalleryFilter
                onFilterChange={handleFilterChange}
              />
              </div> 
            </div>
            <ManageGalleryModal
              visible={isModalVisible}
              onCancel={() => setIsModalVisible(false)}
              onAdd={handleAddArtwork}
            />
            <ManageGalleryTable 
              filters={filters}
            />
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default GalleryManage;
