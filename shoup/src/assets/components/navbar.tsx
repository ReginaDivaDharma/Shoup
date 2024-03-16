import React from 'react';
import { Button, Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo/chou.png';
import '../../global.css';

const { Header } = Layout;

const Navbar: React.FC = () => {
  return (
    <Header className='navbar'>
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo-image"/>
        <span className="logo-text">Shoup</span>
      </div>
      <div className="menu-container">
      <Menu theme="light" mode="horizontal" className="menu" selectedKeys={[]}>
        <Menu.Item key="home" className="menu-item">
            <Link to="/">Homepage</Link>
        </Menu.Item>
        <Menu.Item key="gallery" className="menu-item">
            <Link to="/gallery">Gallery</Link>
        </Menu.Item>
        <Menu.Item key="gallerymanage" className="menu-item">
            <Link to="/managegallery">Gallery Manage</Link>
        </Menu.Item>
        {/* <Menu.Item key="artists" className="menu-item">
          Artists
        </Menu.Item> */}
      </Menu>
      </div>
      {/* <div className="register-container">
        <Button type="primary" className="register-button custom-button">
            <Link to="/login">Login</Link>
        </Button>
      </div> */}
    </Header>
  );
};

export default Navbar;
