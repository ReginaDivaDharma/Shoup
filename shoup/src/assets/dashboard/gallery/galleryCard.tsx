import { Card, Modal } from 'antd';
import { useEffect, useState } from 'react';

interface Artwork {
    id: number;
    name: string;
    image: string;
    description: string;
    artist: string;
    type: string;
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
    
    const handleArtworkClick = (artwork: any) => {
        setSelectedArtwork(artwork);
        setModalVisible(true);
      };

      useEffect(() => {
        fetchArtworks(); 
      }, [filters]); 
    
      // ambil artwork
      const fetchArtworks = () => {
        fetch('http://localhost:5000/artwork')
          .then(response => response.json())
          .then(data => setArtworks(data))
          .catch(error => console.error('Error:', error));
      };

  return (
    <div className='gallery-page'>
              <div className='art-container'>
                {artworks.map((artwork) => (
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
  );
};

export default GalleryCard;
