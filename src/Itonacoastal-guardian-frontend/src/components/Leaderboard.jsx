// src/components/Leaderboard.js
import React from 'react';
import styled from 'styled-components';
import { FaMedal } from 'react-icons/fa';

const Wrapper = styled.div`
    margin: 2rem auto;
    max-width: 1200px;
    padding: 2rem;
    background: linear-gradient(135deg, rgba(26, 26, 46, 0.9) 0%, rgba(22, 33, 62, 0.9) 100%);
    border: 2px solid #00ffff;
    border-radius: 12px;
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
    position: relative;
    overflow: hidden;
    font-family: 'Orbitron', sans-serif;
    color: #e0e0e0;
  
    @media (max-width: 768px) {
      margin: 1rem;
      padding: 1rem;
    }
  `;

const Title = styled.h2`
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #222;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Item = styled.li`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  padding: 1rem;
  border-radius: 12px;
  background: ${({ rank }) => {
    if (rank === 1) return 'linear-gradient(135deg, #ffe47a33, #ffd70033)';
    if (rank === 2) return 'linear-gradient(135deg, #d8d8d833, #c0c0c033)';
    if (rank === 3) return 'linear-gradient(135deg, #e2b48033, #cd7f3233)';
    return '#fafafa';
  }};
  border: ${({ rank }) => (rank <= 3 ? '2px solid currentColor' : '1px solid #e0e0e0')};
  color: ${({ rank }) => {
    if (rank === 1) return '#b8860b';
    if (rank === 2) return '#808080';
    if (rank === 3) return '#8b4513';
    return '#333';
  }};
  transition: transform 0.2s, box-shadow 0.2s;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const NFTInfo = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 12px;
  object-fit: cover;
  margin-right: 1rem;
  border: 2px solid #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const Name = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
`;

const Sub = styled.span`
  font-size: 0.85rem;
  color: #666;
  margin-top: 0.2rem;
`;

const Stats = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Points = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
`;

const Token = styled.span`
  font-size: 0.85rem;
  color: #666;
  margin-top: 0.2rem;
`;

function Leaderboard({ title = 'NFT Leaderboard', items = [] }) {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <List>
        {items.map((item, idx) => {
          const rank = idx + 1;
          return (
            <Item key={item.id || item.tokenId} rank={rank}>
              <NFTInfo>
                {rank <= 3 && (
                  <FaMedal style={{ marginRight: '0.75rem', fontSize: '1.4rem' }} />
                )}
                {item.imageUrl && <Avatar src={item.imageUrl} alt={item.name} />}
                <Details>
                  <Name>{item.name}</Name>
                  {item.collection && <Sub>{item.collection}</Sub>}
                  {item.tokenId && <Token>Token #{item.tokenId}</Token>}
                </Details>
              </NFTInfo>
              <Stats>
                <Points>{item.points.toLocaleString()} pts</Points>
                {item.level && <Sub>{item.level}</Sub>}
              </Stats>
            </Item>
          );
        })}
      </List>
    </Wrapper>
  );
}

export default Leaderboard;