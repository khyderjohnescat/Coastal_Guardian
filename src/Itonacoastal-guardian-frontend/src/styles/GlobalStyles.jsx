import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    background-color:rgb(0, 0, 0);
  }
  h1, h2, h3 {
    color: #2c3e50;
  }
`;

export default GlobalStyles;