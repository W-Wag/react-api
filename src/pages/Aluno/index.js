import { useState, useEffect } from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { isEmail, isInt, isFloat } from 'validator';
import { useDispatch } from 'react-redux';
import { FaUserCircle, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import axios from '../../services/axios';
import history from '../../services/history';
import Loading from '../../components/Loading';
import { Container } from '../../styles/GlobalStyles';
import * as Styled from './styled';
import * as actions from '../../store/modules/auth/actions';

export default function Aluno({ match }) {
  const id = get(match, 'params.id', '');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [foto, setFoto] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return;
    async function getData() {
      try {
        setIsLoading(true);
        const response = await axios.get(`/alunos/${id}`);
        const Foto = get(response.data, 'Uploads[0].url', '');
        setNome(response.data.nome);
        setSobrenome(response.data.sobrenome);
        setEmail(response.data.email);
        setIdade(response.data.idade);
        setPeso(response.data.peso);
        setFoto(Foto);
        setAltura(response.data.altura);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.data.errors', []);

        if (status !== 200) errors.map((error) => toast.error(error.message));
        history.push('/');
      }
    }
    getData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = false;

    if (nome.length < 3 || nome.length > 255) {
      toast.error('Nome deve ter entre 3 e 255 caracteres');
      formErrors = true;
    }
    if (sobrenome.length < 3 || sobrenome.length > 255) {
      toast.error('Sobrenome deve ter entre 3 e 255 caracteres');
      formErrors = true;
    }
    if (!isEmail(email)) {
      toast.error('E-mail inválido');
      formErrors = true;
    }
    if (idade.length > 0 && idade.length < 150 && !isInt(idade)) {
      toast.error('Idade inválida');
      formErrors = true;
    }
    if (!isFloat(String(peso))) {
      toast.error('Peso precisa ser um número');
      formErrors = true;
    }
    if (!isFloat(String(altura))) {
      toast.error('Altura precisa ser um número');
      formErrors = true;
    }

    if (formErrors) return;

    try {
      setIsLoading(true);
      if (id) {
        await axios.put(`/alunos/${id}`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });

        toast.success('Aluno(a) atualizado com sucesso.');
      } else {
        const { data } = await axios.post('/alunos', {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });

        toast.success('Aluno(a) criado com sucesso.');
        history.push(`/aluno/${data.id}/edit`);
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      const status = get(err, 'response.status', 0);
      const data = get(err, 'response.data', {});
      const errors = get(data, 'errors', []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('Erro desconhecido');
      }
      if (status === 401) {
        dispatch(actions.LoginFailure());
        toast.info('Você precisa fazer login novamente.');
        history.push('/login');
      }
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Styled.Title>{id ? 'Editar Aluno' : 'Novo Aluno'}</Styled.Title>

      {id && (
        <Styled.ProfilePicture>
          {foto ? <img src={foto} alt={nome} crossOrigin="" /> : <FaUserCircle size={180} />}
          <Link to={`fotos/${id}`}>
            <FaEdit size={24} />
          </Link>
        </Styled.ProfilePicture>
      )}

      <Styled.Form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          Nome:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite o nome do aluno"
          />
        </label>
        <label htmlFor="sobrenome">
          Sobrenome:
          <input
            type="text"
            value={sobrenome}
            onChange={(e) => setSobrenome(e.target.value)}
            placeholder="Digite o sobrenome do aluno"
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite o email do aluno"
          />
        </label>
        <label htmlFor="idade">
          Idade:
          <input
            type="number"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
            placeholder="Digite a idade do aluno"
          />
        </label>
        <label htmlFor="peso">
          Peso:
          <input
            type="text"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            placeholder="Digite o peso do aluno"
          />
        </label>
        <label htmlFor="altura">
          Altura:
          <input
            type="text"
            value={altura}
            onChange={(e) => setAltura(e.target.value)}
            placeholder="Digite a altura do aluno"
          />
        </label>

        <button type="submit">Enviar</button>
      </Styled.Form>
    </Container>
  );
}

Aluno.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
