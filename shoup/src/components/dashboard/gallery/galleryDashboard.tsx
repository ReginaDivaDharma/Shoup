import React, { useState } from 'react';
import { Layout, Row, Col, Pagination } from 'antd';
import { Content } from 'antd/es/layout/layout';
import GalleryCard from '../../../assets/dashboard/gallery/galleryCard';
import GalleryFilter from '../../../assets/dashboard/gallery/galleryFilter';

const GalleryPage: React.FC = () => {

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
      <Content style={{ backgroundColor: '#A8C7E6', minHeight: '540px' }}>
        <Row>
          <Col span={24}>
            <div className='content-item-mid'>
              <h1 style={{
                color:'#364D79', 
                fontFamily: 'Abril Fatface', 
                fontWeight:'bold',
                marginBottom: '35px'
              }}>Our Works</h1>
            </div>
          </Col>
          <Col span={24}>
            <div className='content-item-mid' style={{marginBottom: '40px'}}>
              <GalleryFilter
                onFilterChange={handleFilterChange}
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
          <div className='content-item-mid'>
            <GalleryCard
                filters={filters}
            />
          </div>
          </Col>
        </Row>

        {/* <Row>
          <Col span={24}>
          <Pagination
            current={currentPage}
            total={sortedArtworks.length} // Use sortedArtworks.length here
            pageSize={pageSize}
            onChange={handlePageChange}
            style={{ marginTop: 16, textAlign: 'center', color: '#364D79'}}
          />
          </Col>
        </Row> */}

      </Content>
    </Layout>
  );
};

export default GalleryPage;