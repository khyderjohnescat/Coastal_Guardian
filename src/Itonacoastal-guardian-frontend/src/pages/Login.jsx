import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';

// Styled components for the login page
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #fafafa;
`;

const LoginForm = styled.form`
  background: #ffffff;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #e5e7eb;
  width: 100%;
  max-width: 420px;
  box-sizing: border-box;
`;

const Title = styled.h2`
  margin: 0 0 1rem;
  text-align: center;
  font-size: 1.75rem;
  font-weight: 600;
  color: #1f2937;
`;

const Subtitle = styled.p`
  text-align: center;
  margin-bottom: 2rem;
  color: #6b7280;
  font-size: 0.9rem;
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.875rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  color: #1f2937;
  background-color: #ffffff;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.875rem;
  background: #2563eb;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;

  &:hover {
    background: #1d4ed8;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: #d1d5db;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled.p`
  color: #dc2626;
  text-align: center;
  font-size: 0.75rem;
  margin-top: 1rem;
  font-weight: 400;
`;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const STATIC_ACCOUNT = {
    email: 'user@example.com',
    password: 'password123',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (email === STATIC_ACCOUNT.email && password === STATIC_ACCOUNT.password) {
        await login(email, password);
        setIsLoading(false);
        navigate('/');
      } else {
        throw new Error('Invalid email or password. Please try again.');
      }
    } catch (err) {
      setIsLoading(false);
      setError(err.message || 'Login failed. Please try again.');
    }
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <Title>User Login</Title>
        <Subtitle>Access your account using your credentials</Subtitle>
        <InputGroup>
          <Label htmlFor="email">Email Address</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Please enter your email address"
          />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Please enter your password"
          />
        </InputGroup>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Authenticating...' : 'Log In'}
        </Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </LoginForm>
    </LoginContainer>
  );
}

export default Login;
