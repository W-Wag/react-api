import { useEffect, useState } from 'react';
import { get } from 'lodash';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaEdit, FaTrash, FaExclamation } from 'react-icons/fa';
import { toast } from 'react-toastify';

import axios from '../../services/axios';
import { Container } from '../../styles/GlobalStyles';
import * as Styled from './styled';
import Loading from '../../components/Loading';

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await axios.get('/alunos');
      setAlunos(response.data);
      setIsLoading(false);
    }
    getData();
  }, []);

  const askHandleDelete = (e) => {
    e.preventDefault();
    const exclamation = e.currentTarget.nextSibling;
    exclamation.setAttribute('display', 'block');
    e.currentTarget.remove();
    toast.warning('Ao clicar novamente esse aluno será excluído, tem certeza?');
  };
  const handleDelete = async (e, id, index) => {
    e.persist();
    try {
      setIsLoading(true);
      await axios.delete(`/alunos/${id}`);
      setIsLoading(false);
      const novosAlunos = [...alunos];
      novosAlunos.splice(index, 1);
      setAlunos(novosAlunos);
      setIsLoading(false);
    } catch (err) {
      const status = get(err, 'response.status', []);
      if (status === 401) {
        toast.error('Você precisa fazer login');
      } else {
        toast.error('Ocorreu um erro ao excluir aluno');
      }
      setIsLoading(false);
    }
  };
  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Styled.Title>Alunos</Styled.Title>
      <Styled.NewStudent to="/aluno">Criar Aluno</Styled.NewStudent>
      <Styled.AlunoContainer>
        {alunos.map((aluno, index) => (
          <div key={String(aluno.id)}>
            <Styled.ProfilePicture>
              {get(aluno, 'Uploads[0].url', '') ? (
                <img crossOrigin="" src={aluno.Uploads[0].url} alt="" />
              ) : (
                <FaUserCircle size={36} />
              )}
            </Styled.ProfilePicture>
            <span>{aluno.nome}</span>
            <span>{aluno.email}</span>
            <Link to={`/aluno/${aluno.id}/edit`}>
              <FaEdit size={16} />
            </Link>
            <Link onClick={askHandleDelete} to={`/aluno/${aluno.id}/delete`}>
              <FaTrash size={16} />
            </Link>
            <FaExclamation
              size={16}
              display="none"
              cursor="pointer"
              color="red"
              onClick={(e) => handleDelete(e, aluno.id, index)}
            />
          </div>
        ))}
      </Styled.AlunoContainer>
    </Container>
  );
}
