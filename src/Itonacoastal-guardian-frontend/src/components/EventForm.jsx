import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.form`
  background: #3498db;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 0.5rem;
  background: #2c3e50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

function EventForm({ onAddEvent }) {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    points: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddEvent(formData);
    setFormData({ title: '', date: '', points: '' });
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h3>Create New Event</h3>
      <Input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Event Title"
        required
      />
      <Input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
      />
      <Input
        type="number"
        name="points"
        value={formData.points}
        onChange={handleChange}
        placeholder="Points"
        required
      />
      <Button type="submit">Add Event</Button>
    </FormContainer>
  );
}

export default EventForm;