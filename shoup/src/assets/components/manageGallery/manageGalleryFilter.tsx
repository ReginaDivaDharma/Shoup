import { Select, Input, Button, Row, Col } from 'antd';
import { Option } from 'antd/es/mentions';
import { useEffect, useState } from 'react';

interface User {
    user_id: number;
    user_name: string;
}

interface ManageGalleryFilterProps {
    onFilterChange: (filters: { orderBy: string; selectedArtist: string | undefined; searchText: string }) => void;
}

const ManageGalleryFilter: React.FC<ManageGalleryFilterProps> = ({ onFilterChange }) => {
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
            <Row gutter={16} align="middle">
                <Col>
                    <p>Artwork Name</p>
                    <Input
                        placeholder="Search by artwork name"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{ width: 200, marginRight: 16 }}
                    />
                </Col>
                <Col>
                    <p>Select Artist</p>
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
                </Col>
                <Col>
                    <p>Order By Artwork Name</p>
                    <Select
                        placeholder="Order By Name"
                        value={orderBy}
                        onChange={(value) => setOrderBy(value)}
                        style={{ width: 200, marginRight: 16 }}
                    >
                        <Option value="desc">Descending</Option>
                        <Option value="asc">Ascending</Option>
                    </Select>
                </Col>
                <Col>
                    <div style={{ marginTop: '50px' }}>
                        <Button
                            className='register-button custom-button'
                            style={{ marginRight: '20px' }}
                            type="primary"
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                        <Button className='register-button custom-button' onClick={handleReset}>Reset</Button>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default ManageGalleryFilter;
