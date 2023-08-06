import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Title = styled.h1`
  font-size: 30px;
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
  input {
    height: 40px;
    font-size: 20px;
    border: 1px solid #ddd;
    padding: 0 10px;
    border-radius: 4px;
    margin-top: 8px;

    &:focus {
      border: 1px solid ${colors.primaryDarkColor};
    }
  }
`;
export const InfoRedirect = styled(Link)`
  display: block;
  padding: 20px 0 10px 0;
  color: gray;
  font-weight: 600;

  &:hover {
    color: ${colors.primaryDarkColor};
    font-weight: bold;
  }
`;
