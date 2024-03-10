import { Card, Modal } from 'antd';
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
    
    const handleArtworkClick = (artwork: any) => {
        setSelectedArtwork(artwork);
        setModalVisible(true);
      };

      useEffect(() => {
        fetchArtworks(); 
      }, [filters]); 
    
      const fetchArtworks = () => {
        const url = `http://localhost:5000/artwork?orderBy=${filters.orderBy}&selectedArtist=${filters.selectedArtist}&searchText=${filters.searchText}`;
        
        fetch(url)
          .then(response => response.json())
          .then(data => setArtworks(data))
          .catch(error => console.error('Error:', error));
      };

  return (
    <div className='gallery-page'>
              <div className='art-container'>
                {artworks.map((artwork) => (
                  <Card
                    key={artwork.artwork_id}
                    hoverable
                    style={{ width: 240, margin: 16 }}
                    cover={<img alt={artwork.artwork_name} src={artwork.artwork_image} />}
                    onClick={() => handleArtworkClick(artwork)}
                  >
                    <Card.Meta title={artwork.artwork_name} style={{textAlign: 'center',alignItems:'center',alignContent:'center'}}/>
                  </Card>
                ))}
              </div>
              <GalleryModal 
                artwork={selectedArtwork}
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
              />
    </div>
  );
};

export default GalleryCard;
