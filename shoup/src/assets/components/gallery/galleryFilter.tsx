import { Select, Input, Button } from 'antd';
import { Option } from 'antd/es/mentions';
import { useEffect, useState } from 'react';

interface User {
    user_id: number;
    user_name: string;
}

interface GalleryFilterProps {
    onFilterChange: 
    (filters: { orderBy: string; selectedArtist: string | undefined; searchText: string }) => void;
}

const GalleryFilter: React.FC<GalleryFilterProps> = ({ onFilterChange }) => {
    const [orderBy, setOrderBy] = useState<string>('desc');
    const [selectedArtist, setSelectedArtist] = useState<string>('');
    const [searchText, setSearchText] = useState<string>('');
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        fetch('http://localhost:5000/users')
            .then(response => response.json())
            .then(data => {
                setUsers(data);
            })
            .catch(error => console.error('Error fetching users:', error));
    };

    const handleFilterChange = () => {
        onFilterChange({ orderBy, selectedArtist, searchText });
    };

    const handleReset = () => {
        setSearchText('');
        setSelectedArtist('');
        setOrderBy('asc');
        handleFilterChange();
    };

    const handleSubmit = () => {
        handleFilterChange();
    };

    return (
        <div>
            <Input
                placeholder="Search by artwork name"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ width: 200, marginRight: 16 }}
            />
            <Select
                placeholder="Select artist"
                value={selectedArtist}
                onChange={(value) => setSelectedArtist(value)}
                style={{ width: 200, marginRight: 16 }}
            >
                {users.map(user => (
                    <Option key={String(user.user_id)} value={user.user_name}>{user.user_name}</Option>
                ))}
            </Select>
            <Select
                placeholder="Order By Name"
                value={orderBy}
                onChange={(value) => setOrderBy(value)}
                style={{ width: 200, marginRight: 16 }}
            >
                <Option value="desc">Descending</Option>
                <Option value="asc">Ascending</Option>
            </Select>
            <Button 
            className = 'register-button custom-button'
            style={{
                marginRight: '20px',
            }} type="primary" onClick={handleSubmit}>Submit</Button>
            <Button className = 'register-button custom-button' onClick={handleReset}>Reset</Button>
        </div>
    );
};

export default GalleryFilter;
