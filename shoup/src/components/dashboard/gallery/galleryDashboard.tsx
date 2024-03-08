import React, { useState, useEffect } from 'react';
import { Card, Modal, Button, Layout, Row, Col, Pagination, Select } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Search from 'antd/es/input/Search';
import { Option } from 'antd/es/mentions';

interface Artwork {
  id: number;
  name: string;
  image: string;
  description: string;
  artist: string;
  type: string;
}

const GalleryPage: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [orderBy, setOrderBy] = useState<string>('created');
  const [selectedArtist, setSelectedArtist] = useState<string | undefined>(undefined);
  const [searchText, setSearchText] = useState<string>('');

  const pageSize = 8;
  
  const [artworks, setArtworks] = useState<any[]>([
    { id: 1, name: 'Artwork 1', image: 'https://via.placeholder.com/150', description: 'Description of Artwork 1' },
    { id: 2, name: 'Artwork 2', image: 'https://via.placeholder.com/150', description: 'Description of Artwork 2' },
    { id: 3, name: 'Artwork 3', image: 'https://via.placeholder.com/150', description: 'Description of Artwork 3' },
    { id: 4, name: 'Artwork 3', image: 'https://via.placeholder.com/150', description: 'Description of Artwork 3' },

  ]);

  const handleArtworkClick = (artwork: any) => {
    setSelectedArtwork(artwork);
    setModalVisible(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filteredArtworks = artworks.filter(artwork => {
    const nameMatch = artwork.name.toLowerCase().includes(searchText.toLowerCase());
    const artistMatch = !selectedArtist || artwork.artist === selectedArtist;
    return nameMatch && artistMatch;
  });

  const sortedArtworks = filteredArtworks.sort((a, b) => {
    if (orderBy === 'created') {
      return new Date(b.created).getTime() - new Date(a.created).getTime();
    }
    return 0;
  });

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedArtworks = sortedArtworks.slice(startIndex, startIndex + pageSize);

  return (
    <Layout>
      <Content style={{ backgroundColor: '#A8C7E6', minHeight: '540px' }}>
        <Row>
          <Col span={24}>
            <div className='content-item-mid'>
              <h1 style={{
                color:'#364D79', 
                fontFamily: 'Abril Fatface', 
                fontWeight:'bold'
              }}>Our Works</h1>
            </div>
          </Col>
          <Col span={24}>
          <div className='content-item-mid'>
          <Search
                placeholder="Search by artwork name"
                onChange={(e) => setSearchText(e.target.value)}
                style={{ width: 200, marginRight: 16 }}
              />
              <Select
                placeholder="Select artist"
                onChange={(value) => setSelectedArtist(value)}
                style={{ width: 200, marginRight: 16 }}
              >
                <Option value="Choutato">Choutato</Option>
                <Option value="RottenCarrot">RottenCarrot</Option>
              </Select>
              <Select
                defaultValue="created"
                onChange={(value) => setOrderBy(value)}
                style={{ width: 200 }}
              >
                <Option value="name">Order by Name</Option>
              </Select>
            </div> 
            </Col>
        </Row>

        <Row>
          <Col span={24}>
            <div className='gallery-page'>
              <div className='art-container'>
                {paginatedArtworks.map((artwork) => (
                  <Card
                    key={artwork.id}
                    hoverable
                    style={{ width: 240, margin: 16 }}
                    cover={<img alt={artwork.name} src={artwork.image} />}
                    onClick={() => handleArtworkClick(artwork)}
                  >
                    <Card.Meta title={artwork.name} style={{textAlign: 'center'}}/>
                  </Card>
                ))}
              </div>
              <Modal
                title={selectedArtwork ? selectedArtwork.name : ''}
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={null}
              >
                <p>{selectedArtwork ? selectedArtwork.description : ''}</p>
                <p>Made By {selectedArtwork ? selectedArtwork.artist : ''}</p>
                <p>Type of Art {selectedArtwork ? selectedArtwork.type : ''}</p>
              </Modal>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
          <Pagination
            current={currentPage}
            total={sortedArtworks.length} // Use sortedArtworks.length here
            pageSize={pageSize}
            onChange={handlePageChange}
            style={{ marginTop: 16, textAlign: 'center', color: '#364D79'}}
          />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default GalleryPage;
