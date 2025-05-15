import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

// Keyframe for gradient animation
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Sidebar container with fixed positioning
const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100vh;
  background: linear-gradient(180deg, rgba(59, 7, 100, 0.9), rgba(30, 58, 138, 0.9));
  background-size: 200% 200%;
  animation: ${gradientAnimation} 15s ease infinite;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border-right: 2px solid #a855f7; /* Purple for NFT vibe */
  box-shadow: 4px 0 12px rgba(168, 85, 247, 0.4);
  backdrop-filter: blur(6px);
  z-index: 1000;
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform 0.3s ease-in-out;

  @media (min-width: 769px) {
    transform: translateX(0);
  }
`;

// Overlay for mobile when sidebar is open
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 999;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;

  @media (min-width: 769px) {
    display: none;
  }
`;

// Hamburger menu button
const HamburgerButton = styled.button`
  position: fixed;
  top: 1rem;
  left: 1rem;
  background: none;
  border: none;
  color: #a855f7;
  font-size: 2rem;
  cursor: pointer;
  z-index: 1001;
  transition: all 0.3s ease;

  &:hover {
    color: #ec4899;
    text-shadow: 0 0 10px rgba(236, 72, 153, 0.7);
  }

  @media (min-width: 769px) {
    display: none;
  }
`;

// Styled Link with neon glow and hover animation
const SidebarLink = styled(Link)`
  color: #e0e0e0;
  text-decoration: none;
  font-size: 1.2rem;
  font-family: 'Orbitron', sans-serif;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    color: #ec4899;
    transform: translateX(5px);
    box-shadow: 0 0 15px rgba(236, 72, 153, 0.5), 0 0 5px rgba(236, 72, 153, 0.3);
  }

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: #ec4899;
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }

  &:hover:after {
    width: 80%;
  }

  &.active {
    color: #ec4899;
    background: rgba(168, 85, 247, 0.2);
  }
`;

// Logout button styled to match neon theme
const LogoutButton = styled.button`
  color: #e0e0e0;
  background: none;
  border: none;
  font-size: 1.2rem;
  font-family: 'Orbitron', sans-serif;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  text-align: left;

  &:hover {
    color: #ec4899;
    transform: translateX(5px);
    box-shadow: 0 0 15px rgba(236, 72, 153, 0.5), 0 0 5px rgba(236, 72, 153, 0.3);
  }

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: #ec4899;
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }

  &:hover:after {
    width: 80%;
  }
`;

// Glowing effect for the sidebar
const GlowEffect = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%);
  pointer-events: none;
  z-index: -1;
`;

// Logo or title at the top of the sidebar
const SidebarHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h1 {
    font-size: 1.8rem;
    color: transparent;
    background: linear-gradient(to right, #a855f7, #ec4899);
    -webkit-background-clip: text;
    background-clip: text;
    text-shadow: 0 0 8px rgba(168, 85, 247, 0.7);
    text-transform: uppercase;
    letter-spacing: 2px;
  }
`;

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Show confirmation prompt
    if (window.confirm('Are you sure you want to log out?')) {
      logout();
      navigate('/login');
      if (isOpen) {
        setIsOpen(false); // Close sidebar on mobile after logout
      }
    }
  };

  return (
    <>
      <HamburgerButton onClick={toggleSidebar} aria-label="Toggle sidebar">
        {isOpen ? <FaTimes /> : <FaBars />}
      </HamburgerButton>
      <Overlay isOpen={isOpen} onClick={toggleSidebar} />
      <SidebarContainer isOpen={isOpen}>
        <GlowEffect />
        <SidebarHeader>
          <h1>Coastal Guardian</h1>
        </SidebarHeader>
        <SidebarLink to="/" className={({ isActive }) => (isActive ? 'active' : '')} onClick={toggleSidebar}>
          Dashboard
        </SidebarLink>
        <SidebarLink to="/profile" className={({ isActive }) => (isActive ? 'active' : '')} onClick={toggleSidebar}>
          Profile
        </SidebarLink>
        <SidebarLink to="/events" className={({ isActive }) => (isActive ? 'active' : '')} onClick={toggleSidebar}>
          NFT Events
        </SidebarLink>
        <SidebarLink to="/rewards" className={({ isActive }) => (isActive ? 'active' : '')} onClick={toggleSidebar}>
          NFT Rewards
        </SidebarLink>
        <SidebarLink to="/leaderboard" className={({ isActive }) => (isActive ? 'active' : '')} onClick={toggleSidebar}>
          NFT Leaderboard
        </SidebarLink>
        <SidebarLink to="/admin" className={({ isActive }) => (isActive ? 'active' : '')} onClick={toggleSidebar}>
          Manage NFT Events
        </SidebarLink>
        <LogoutButton onClick={handleLogout} aria-label="Log out">Logout</LogoutButton>
      </SidebarContainer>
    </>
  );
}

export default Sidebar;
