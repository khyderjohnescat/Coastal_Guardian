import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa';

// Sidebar container with fixed positioning
const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100vh;
  background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  box-shadow: 4px 0 12px rgba(0, 255, 255, 0.2);
  border-right: 2px solid rgba(0, 255, 255, 0.3);
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
  color: #00ffff;
  font-size: 2rem;
  cursor: pointer;
  z-index: 1001;
  transition: all 0.3s ease;

  &:hover {
    text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
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
    color: #00ffff;
    transform: translateX(5px);
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.5), 0 0 5px rgba(0, 255, 255, 0.3);
  }

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: #00ffff;
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }

  &:hover:after {
    width: 80%;
  }

  &.active {
    color: #00ffff;
    background: rgba(0, 255, 255, 0.1);
  }
`;

// Glowing effect for the sidebar
const GlowEffect = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(0, 255, 255, 0.15) 0%, transparent 70%);
  pointer-events: none;
  z-index: -1;
`;

// Logo or title at the top of the sidebar
const SidebarHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h1 {
    font-size: 1.8rem;
    color: #00ffff;
    text-shadow: 0 0 8px rgba(0, 255, 255, 0.5);
    text-transform: uppercase;
    letter-spacing: 2px;
  }
`;

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <HamburgerButton onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </HamburgerButton>
      <Overlay isOpen={isOpen} onClick={toggleSidebar} />
      <SidebarContainer isOpen={isOpen}>
        <GlowEffect />
        <SidebarHeader>
          <h1>Coastal Guardian</h1>
        </SidebarHeader>
        <SidebarLink to="/" activeClassName="active" onClick={toggleSidebar}>
          Profile
        </SidebarLink>
        <SidebarLink to="/events" activeClassName="active" onClick={toggleSidebar}>
          Events
        </SidebarLink>
        <SidebarLink to="/rewards" activeClassName="active" onClick={toggleSidebar}>
          Rewards
        </SidebarLink>
        <SidebarLink to="/leaderboard" activeClassName="active" onClick={toggleSidebar}>
          Leaderboard
        </SidebarLink>
        <SidebarLink to="/admin" activeClassName="active" onClick={toggleSidebar}>
          Admin
        </SidebarLink>
      </SidebarContainer>
    </>
  );
}

export default Sidebar;