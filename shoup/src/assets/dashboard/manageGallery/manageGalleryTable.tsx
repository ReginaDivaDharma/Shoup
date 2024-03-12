import React, { useState, useEffect } from 'react';
import { Table, Tag, Space, Card } from 'antd';
import type { TableProps } from 'antd';

interface Artwork {
  artwork_id: number;
  artwork_name: string;
  artwork_image: string;
  artwork_description: string;
  artist_name: string;
  artwork_type: string;
}

const ManageGalleryTable: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);

  useEffect(() => {
    fetchArtworks();
  }, []);

  const fetchArtworks = async () => {
    try {
      const response = await fetch('http://localhost:5000/artworks');
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

  const columns: TableProps<Artwork>['columns'] = [
    {
      title: 'Artwork Name',
      dataIndex: 'artwork_name',
      key: 'artwork_name'
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
          <a>View</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <Card>
        <Table columns={columns} dataSource={artworks} />
    </Card>
  );
};

export default ManageGalleryTable;
