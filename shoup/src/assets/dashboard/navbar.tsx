import React from 'react';
import { Button, Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo/chou.png';
import '../../global.css';

const { Header } = Layout;

interface NavbarProps {
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onLogin, onLogout }) => {
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
        </Menu>
      </div>
      {!isLoggedIn && (
        <div className="register-container">
          <Button type="primary" className="register-button custom-button" onClick={onLogin}>
            <Link to="/login">Login</Link>
          </Button>
        </div>
      )}
      {isLoggedIn && (
        <div className="register-container">
          <Button type="primary" className="register-container" onClick={onLogout}>
            Logout
          </Button>
        </div>
      )}
    </Header>
  );
};

export default Navbar;