import { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';
import { Container } from '../../styles/GlobalStyles';
import * as Styled from './styled';
import * as actions from '../../store/modules/auth/actions';
import Loading from '../../components/Loading';

export default function Login(props) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isLoading = useSelector((state) => state.auth.isLoading);
  const prevPath = get(props, 'location.state.prevPath', '/');

  function handleSubmit(e) {
    let formErrors = false;
    e.preventDefault();
    if (password.length < 6 || password.length > 50) {
      formErrors = true;
      toast.error('Senha inválida');
    }
    if (!isEmail(email)) {
      formErrors = true;
      toast.error('E-mail inválido');
    }

    if (formErrors) return;
    dispatch(actions.LoginRequest({ email, password, prevPath }));
  }
  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Styled.Title>Login</Styled.Title>
      <Styled.Form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Coloque seu e-mail cadastrado aqui"
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Coloque sua senha cadastrada aqui"
          />
        </label>
        <button type="submit">Entrar</button>
      </Styled.Form>
      <Styled.InfoRedirect to="/info">
        Não tem conta ou quer saber mais sobre o site? Clique Aqui!
      </Styled.InfoRedirect>
    </Container>
  );
}
