import React, { useState } from 'react';
import styled from 'styled-components';

// Styled components for Modal and Form
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: rgba(17, 24, 39, 0.9);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid rgba(168, 85, 247, 0.3);
  box-shadow: 0 0 30px rgba(168, 85, 247, 0.4);
  backdrop-filter: blur(4px);
  width: 100%;
  max-width: 500px;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 0 40px rgba(168, 85, 247, 0.5);
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #a855f7;
  font-size: 1.5rem;
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

const FormTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 500;
  color: #a855f7;
  text-shadow: 0 0 5px rgba(168, 85, 247, 0.5);
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SubmitButton = styled.button`
  background: linear-gradient(to right, #a855f7, #ec4899);
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  color: #fff;
  font-family: 'Orbitron', 'Arial', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  text-transform: uppercase;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 15px rgba(236, 72, 153, 0.7);
  }

  &:active {
    transform: scale(0.95);
  }
`;

function EventForm({ isOpen, onClose, onAddEvent }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [tokens, setTokens] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && date && tokens) {
      onAddEvent({ title, date, points: parseInt(tokens) });
      setTitle('');
      setDate('');
      setTokens('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>×</CloseButton>
        <FormTitle>Add New NFT Event</FormTitle>
        <Form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-sm font-medium text-gray-300">
              Event Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., NFT Coastal Drop"
              className="block w-full rounded-md bg-gray-800 border-gray-600 text-gray-200 focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 p-2"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="date" className="text-sm font-medium text-gray-300">
              Event Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="block w-full rounded-md bg-gray-800 border-gray-600 text-gray-200 focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 p-2"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="tokens" className="text-sm font-medium text-gray-300">
              Reward Tokens
            </label>
            <input
              type="number"
              id="tokens"
              value={tokens}
              onChange={(e) => setTokens(e.target.value)}
              placeholder="e.g., 50"
              min="1"
              className="block w-full rounded-md bg-gray-800 border-gray-600 text-gray-200 focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 p-2"
              required
            />
          </div>
          <SubmitButton type="submit">Add Event</SubmitButton>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
}

export default EventForm;