import React, { useState, useEffect } from 'react';
import { Table, Space, Card, message } from 'antd';
import type { TableProps } from 'antd';
import ManageGalleryEditModal from './manageGalleryEditModal';

interface Artwork {
  artwork_id: number;
  artwork_name: string;
  artwork_image: string;
  artwork_description: string;
  artist_name: string;
  artwork_type: string;
  sold_artwork_qty: number;
}

interface ManageGalleryTableProps {
  filters: {
    orderBy: string;
    selectedArtist: string | undefined;
    searchText: string;
  };
}

const ManageGalleryTable: React.FC<ManageGalleryTableProps> = ({ filters }) => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleArtworkClick = (artwork: any) => {
    setSelectedArtwork(artwork);
    setModalVisible(true);
  };

  useEffect(() => {
    fetchArtworks();
  }, [filters]);

  const fetchArtworks = async () => {
    try {
      const response = await fetch(`http://localhost:5000/artworks/gallery?orderBy=${filters.orderBy}&selectedArtist=${filters.selectedArtist}&searchText=${filters.searchText}`);
      if (response.ok) {
        const data = await response.json();
        setArtworks(data);
      } else {
        console.error('Error fetching artworks:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching artworks:', error);
    }
  };

  const handleDelete = async (artworkId: number) => {
    try {
      const response = await fetch(`http://localhost:5000/artworks/delete/${artworkId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // remove the deleted artwork from the state
        setArtworks(artworks.filter(artwork => artwork.artwork_id !== artworkId));
        message.success('Artwork deleted successfully');
      } else {
        message.error('Failed to delete artwork');
      }
    } catch (error) {
      console.error('Error deleting artwork:', error);
      message.error('An error occurred while deleting artwork');
    }
  };

  const columns: TableProps<Artwork>['columns'] = [
    {
      title: 'Artwork Name',
      dataIndex: 'artwork_name',
      key: 'artwork_name',
    },
    {
      title: 'Artist Name',
      dataIndex: 'artist_name',
      key: 'artist_name',
    },
    {
      title: 'Artwork Type',
      dataIndex: 'artwork_type',
      key: 'artwork_type',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleArtworkClick(record)}>Edit</a>
          <a onClick={() => handleDelete(record.artwork_id)}>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <Card>
      <Table columns={columns} dataSource={artworks} />
      <ManageGalleryEditModal
        artwork={selectedArtwork}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </Card>
  );
};

export default ManageGalleryTable;
