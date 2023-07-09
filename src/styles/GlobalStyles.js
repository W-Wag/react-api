import styled, { createGlobalStyle } from 'styled-components';
import * as colors from '../config/colors';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  body {
    font-family: 'Roboto', sans-serif;
    background: ${colors.primaryColor};
    color: ${colors.primaryDarkColor};
  }
  html, body, #root {
    height: 100%;
  }
  button {
    cursor: pointer;
    background: ${colors.primaryDarkColor};
    border: none;
    color: #fff;
    padding: 10px 20px;
    border-radius: 4px;
    font-weight: bold;
    transition: filter 0.3s;
  }
  button:hover {
    filter: brightness(120%);
    opacity: 0.8;
  }
  a {
    text-decoration: none;
    color: ${colors.primaryColor};
  }
  ul {
    list-style: none;
  }

  body .Toastify .Toastify__toast-container .Toastify__toast--success {
    background-color: ${colors.successColor};
    color: greenyellow;
  }
  body .Toastify .Toastify__toast-container .Toastify__toast--error {
    background-color: ${colors.errorColor};
    color: red;
  }
  body .Toastify .Toastify__toast-container .Toastify__toast--warning {
    color: yellowgreen;
  }
  body .Toastify .Toastify__toast-container .Toastify__toast--info {
    color: black;
  }
`;

export const Container = styled.section`
  max-width: 600px;
  background: #fff;
  margin: 50px auto;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
