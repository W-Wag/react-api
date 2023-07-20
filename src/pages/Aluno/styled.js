import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Title = styled.h1`
  font-size: 30px;
  text-align: center;
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

  span {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  input {
    height: 40px;
    font-size: 20px;
    border: 1px solid #ddd;
    padding: 0 10px;

    &:focus {
      border: 1px solid ${colors.primaryDarkColor};
    }
  }
  textarea {
    resize: none;
    border: 1px solid #ddd;
    padding: 10px;
    width: 100%;
    height: 100px;
    font-size: 15px;

    &:focus {
      border: 1px solid ${colors.primaryDarkColor};
    }
  }
`;
export const ProfilePicture = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0 20px;
  position: relative;
  margin-top: 30px;

  img {
    width: 180px;
    height: 180px;
    border-radius: 50%;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    position: absolute;
    bottom: 0;
    left: 55%;
    color: #000;
    background: ${colors.primaryColor};
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
`;
