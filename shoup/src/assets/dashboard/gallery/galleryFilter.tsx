import { Select, Input } from 'antd';
import { Option } from 'antd/es/mentions';
import { useEffect, useState } from 'react';

interface GalleryFilterProps {
    onFilterChange: 
    (filters: { orderBy: string; selectedArtist: string | undefined; searchText: string }) => void;
}

const GalleryFilter: React.FC<GalleryFilterProps> = ({ onFilterChange }) => {
    const [orderBy, setOrderBy] = useState<string>('created');
    const [selectedArtist, setSelectedArtist] = useState<string | undefined>(undefined);
    const [searchText, setSearchText] = useState<string>('');

    const handleFilterChange = () => {
        onFilterChange({ orderBy, selectedArtist, searchText });
    };

  return (
    <div>
            <Input
                placeholder="Search by artwork name"
                value={searchText}
                onChange={(e) => {
                    setSearchText(e.target.value);
                    handleFilterChange();
                }}
                style={{ width: 200, marginRight: 16 }}
            />
            <Select
                placeholder="Select artist"
                value={selectedArtist}
                onChange={(value) => {
                    setSelectedArtist(value);
                    handleFilterChange();
                }}
                style={{ width: 200, marginRight: 16 }}
            >
                <Option value="Choutato">Choutato</Option>
                <Option value="RottenCarrot">RottenCarrot</Option>
            </Select>
            <Select
                value={orderBy}
                onChange={(value) => {
                    setOrderBy(value);
                    handleFilterChange();
                }}
                style={{ width: 200 }}
            >
                <Option value="name">Order by Name</Option>
            </Select>
        </div>
  );
};

export default GalleryFilter;
