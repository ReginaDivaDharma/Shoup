import { Card, Pagination, Row } from 'antd';
import { useEffect, useState } from 'react';
import GalleryModal from './galleryModal';

interface Artwork {
  artwork_id: number;
  artwork_name: string;
  artwork_image: string;
  artwork_description: string;
  artist_name: string;
  artwork_type: string;
}

interface GalleryCardProps {
  filters: {
    orderBy: string;
    selectedArtist: string | undefined;
    searchText: string;
  };
}

const GalleryCard: React.FC<GalleryCardProps> = ({ filters }) => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 4;

  const handleArtworkClick = (artwork: any) => {
    setSelectedArtwork(artwork);
    setModalVisible(true);
  };

  useEffect(() => {
    fetchArtworks();
  }, [filters]);

  const fetchArtworks = () => {
    const url = `http://localhost:5000/artworks/gallery?orderBy=${filters.orderBy}&selectedArtist=${filters.selectedArtist}&searchText=${filters.searchText}`;

    fetch(url)
      .then(response => response.json())
      .then(data => setArtworks(data))
      .catch(error => console.error('Error:', error));
  };

  // calculate total number of pages
  const totalPages = Math.ceil(artworks.length / itemsPerPage);

  // paginate items
  const paginatedArtworks = artworks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Row>
        <div className='gallery-page'>
          <div className='art-container'>
            {paginatedArtworks.map((artwork) => (
              <Card
                key={artwork.artwork_id}
                hoverable
                style={{ width: 240, margin: 16 }}
                cover={<img alt={artwork.artwork_name} src={`/artwork/${artwork.artwork_image.split('\\').pop()}`} />}  // Extracting filename from path
                onClick={() => handleArtworkClick(artwork)}
              >
                <Card.Meta title={artwork.artwork_name} style={{textAlign: 'center', alignItems:'center', alignContent:'center'}} />
              </Card>
            ))}
            <GalleryModal
              artwork={selectedArtwork}
              visible={modalVisible}
              onClose={() => setModalVisible(false)}
            />
          </div>
        </div>
      </Row>

      <Row className='content-item-mid'>
        <div style={{
          marginTop:'20px',
          marginBottom: '40px'
        }}>
          <Pagination
            current={currentPage}
            total={artworks.length}
            pageSize={itemsPerPage}
            onChange={handlePageChange}
          />
        </div>
      </Row>
    </div>
  );
};

export default GalleryCard;
