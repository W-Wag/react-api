import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Title = styled.h1`
  font-size: 30px;
  text-align: center;
`;
export const Form = styled.form`
  display: flex;

  label {
    width: 180px;
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #eee;
    border: 5px dashed ${colors.primaryDarkColor};
    border-radius: 50%;
    margin: 30px auto;
    cursor: pointer;
    overflow: hidden;
  }

  img {
    width: 180px;
    height: 180px;
  }

  input {
    display: none;
  }
`;
