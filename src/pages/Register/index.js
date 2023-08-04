import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { FaExclamation } from 'react-icons/fa';
import { get } from 'lodash';

import axios from '../../services/axios';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';
import { Container } from '../../styles/GlobalStyles';
import * as Styled from './styled';
import Loading from '../../components/Loading';

export default function Register() {
  const id = useSelector((state) => state.auth.user.id);
  const nomeStored = useSelector((state) => state.auth.user.nome);
  const emailStored = useSelector((state) => state.auth.user.email);
  const isLoading = useSelector((state) => state.auth.isLoading);

  const dispatch = useDispatch();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [deletar, setDeletar] = useState(false);

  useEffect(() => {
    if (!id) return;
    setNome(nomeStored);
    setEmail(emailStored);
  }, [emailStored, id, nomeStored]);

  async function handleSubmit(e) {
    let formErrors = false;
    e.preventDefault();
    if (nome.length < 3 || nome.length > 255) {
      formErrors = true;
      toast.error('Nome deve ter entre 3 e 255 caracteres');
    }
    if (!id && (password.length < 6 || password.length > 50)) {
      formErrors = true;
      toast.error('Senha deve ter entre 6 e 50 caracteres');
    }
    if (!isEmail(email)) {
      formErrors = true;
      toast.error('E-mail inválido');
    }
    if (formErrors) return;

    dispatch(actions.RegisterRequest({ nome, email, password, id }));
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`/users/`);
      dispatch(actions.LoginFailure());
      toast.success('Usuário desativado com sucesso.');
      history.push('/');
    } catch (err) {
      const status = get(err, 'response.status', []);
      if (status === 401) {
        toast.error('Você precisa fazer login');
        history.push('/login');
      } else {
        toast.error('Ocorreu um erro ao desativar o usuário');
      }
    }
  };
  const handleCheckDelete = (e) => {
    e.preventDefault();
    if (deletar) return handleDelete();
    setDeletar(true);
    return toast.warning('Ao clicar novamente seu usuário será desativado, você tem certeza?');
  };
  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Styled.Title>{id ? 'Editar Dados' : 'Crie sua conta'}</Styled.Title>
      <Styled.Form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          Nome:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite seu nome"
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu e-mail"
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={id ? 'Digite sua nova senha' : 'Digite sua senha'}
          />
        </label>

        {id ? (
          <Styled.DeleteBtn onClick={handleCheckDelete}>
            {deletar ? <FaExclamation size={16} /> : 'Desativar Usuário'}
          </Styled.DeleteBtn>
        ) : (
          <> </>
        )}

        <button type="submit">{id ? 'Salvar' : 'Cadastrar'}</button>
      </Styled.Form>
    </Container>
  );
}
