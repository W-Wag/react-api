import { useState, useEffect } from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import axios from '../../services/axios';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';
import { Container } from '../../styles/GlobalStyles';
import Loading from '../../components/Loading';
import * as Styled from './styled';

export default function Fotos({ match }) {
  const id = get(match, 'params.id', '');
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [foto, setFoto] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/alunos/${id}`);
        setFoto(get(data, 'Uploads[0].url', ''));
        setIsLoading(false);
      } catch (err) {
        toast.error('Erro ao obter imagem');
        setIsLoading(false);
        history.push('/');
      }
    };
    getData();
  }, [id]);

  const handleChange = async (e) => {
    const file = e.target.files[0];
    const fotoUrl = URL.createObjectURL(file);
    setFoto(fotoUrl);

    const formData = new FormData();
    formData.append('aluno_id', id);
    formData.append('arquivo', file);

    try {
      setIsLoading(true);
      await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setIsLoading(false);
      toast.success('Foto enviada com sucesso!');
    } catch (err) {
      setIsLoading(false);
      const status = get(err, 'response', '');
      toast.error('Erro ao enviar foto.');

      if (status === 401) {
        dispatch(actions.LoginFailure());
        toast.error('Você precisa fazer login novamente.');
      }
    }
  };
  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Styled.Title>Fotos</Styled.Title>

      <Styled.Form>
        <label htmlFor="foto">
          {foto ? <img src={foto} alt="Foto" crossOrigin="" /> : 'Selecionar'}
          <input type="file" id="foto" onChange={handleChange} />
        </label>
      </Styled.Form>
    </Container>
  );
}

Fotos.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
