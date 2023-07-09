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
export const DeleteBtn = styled.button`
  margin: 30px auto;
  background: red;
  color: ${colors.errorColor};
  cursor: pointer;
  width: 100%;
  font-size: 15px;
`;
