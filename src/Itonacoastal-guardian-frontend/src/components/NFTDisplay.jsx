import React from 'react';
import styled from 'styled-components';

const NFTGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const NFTCard = styled.div`
  background: #ecf0f1;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
`;

function NFTDisplay({ nfts }) {
  return (
    <div>
      <h3>Your NFTs</h3>
      <NFTGrid>
        {nfts.map((nft) => (
          <NFTCard key={nft.id}>
            <h4>{nft.name}</h4>
            <img src={nft.image} alt={nft.name} style={{ width: '100%' }} />
          </NFTCard>
        ))}
      </NFTGrid>
    </div>
  );
}

export default NFTDisplay;