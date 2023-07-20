import { useState, useEffect } from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { isInt } from 'validator';
import { useDispatch } from 'react-redux';
import { FaUserCircle, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import InputMask from 'react-input-mask';

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
  const [dataNascimento, setDataNascimento] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [nomeResponsavel1, setNomeResponsavel1] = useState('');
  const [nomeResponsavel2, setNomeResponsavel2] = useState('');
  const [profissaoResponsavel1, setProfissaoResponsavel1] = useState('');
  const [profissaoResponsavel2, setProfissaoResponsavel2] = useState('');
  const [numIrmaos, setNumIrmaos] = useState('');
  const [pessoasMoramComigo, setPessoasMoramComigo] = useState('');
  const [pessoasBuscam, setPessoasBuscam] = useState('');
  const [escolaAnoPassado, setEscolaAnoPassado] = useState('');
  const [observacoes, setObservacoes] = useState('');
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
        setDataNascimento(response.data.data_nascimento);
        setEndereco(response.data.endereco);
        setTelefone(response.data.telefone);
        setNomeResponsavel1(response.data.nome_responsavel_1);
        setNomeResponsavel2(response.data.nome_responsavel_2);
        setProfissaoResponsavel1(response.data.profissao_responsavel_1);
        setProfissaoResponsavel2(response.data.profissao_responsavel_2);
        setNumIrmaos(response.data.num_irmaos);
        setPessoasMoramComigo(response.data.pessoas_moram_comigo);
        setPessoasBuscam(response.data.pessoas_buscam);
        setEscolaAnoPassado(response.data.escola_ano_passado);
        setObservacoes(response.data.observacoes);
        setFoto(Foto);
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
    if (dataNascimento.length < 10 || dataNascimento.length > 10) {
      toast.error('Data de nascimento esta invalida (DD/MM/AAAA)');
      formErrors = true;
    }
    if (endereco.length < 3 || endereco.length > 255) {
      toast.error('Endereço deve ter entre 3 e 255 caracteres');
      formErrors = true;
    }
    if (telefone.length < 9 || telefone.length > 13) {
      toast.error('Telefone deve ter entre 9 e 13 caracteres');
      formErrors = true;
    }
    if (!isInt(String(numIrmaos))) {
      toast.error('Número de irmãos deve ser um número inteiro');
      formErrors = true;
    }
    if (formErrors) return;

    try {
      setIsLoading(true);
      if (id) {
        await axios.put(`/alunos/${id}`, {
          nome,
          sobrenome,
          data_nascimento: dataNascimento,
          endereco,
          telefone,
          nome_responsavel_1: nomeResponsavel1,
          nome_responsavel_2: nomeResponsavel2,
          profissao_responsavel_1: profissaoResponsavel1,
          profissao_responsavel_2: profissaoResponsavel2,
          num_irmaos: numIrmaos,
          pessoas_moram_comigo: pessoasMoramComigo,
          pessoas_buscam: pessoasBuscam,
          escola_ano_passado: escolaAnoPassado,
          observacoes,
        });

        toast.success('Aluno(a) atualizado com sucesso.');
      } else {
        const { data } = await axios.post('/alunos', {
          nome,
          sobrenome,
          data_nascimento: dataNascimento,
          endereco,
          telefone,
          nome_responsavel_1: nomeResponsavel1,
          nome_responsavel_2: nomeResponsavel2,
          profissao_responsavel_1: profissaoResponsavel1,
          profissao_responsavel_2: profissaoResponsavel2,
          num_irmaos: numIrmaos,
          pessoas_moram_comigo: pessoasMoramComigo,
          pessoas_buscam: pessoasBuscam,
          escola_ano_passado: escolaAnoPassado,
          observacoes,
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
        <span>
          Data de Nascimento:
          <InputMask
            value={dataNascimento}
            mask="99-99-9999"
            onChange={(e) => setDataNascimento(e.target.value)}
            placeholder="DD-MM-AAAA"
          />
        </span>
        <label htmlFor="endereco">
          Endereço:
          <input
            type="text"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            placeholder="Digite o endereço do aluno"
          />
        </label>
        <label htmlFor="telefone">
          Telefone:
          <input
            type="text"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            placeholder="Digite o telefone do aluno"
          />
        </label>
        <label htmlFor="nomeResponsavel1">
          Nome do responsável 1:
          <input
            type="text"
            value={nomeResponsavel1}
            onChange={(e) => setNomeResponsavel1(e.target.value)}
            placeholder="Digite o nome do responsável 1"
          />
        </label>
        <label htmlFor="nomeResponsavel2">
          Nome do responsável 2:
          <input
            type="text"
            value={nomeResponsavel2}
            onChange={(e) => setNomeResponsavel2(e.target.value)}
            placeholder="Digite o nome do responsável 2"
          />
        </label>
        <label htmlFor="profissaoResponsavel1">
          Profissão do responsável 1:
          <input
            type="text"
            value={profissaoResponsavel1}
            onChange={(e) => setProfissaoResponsavel1(e.target.value)}
            placeholder="Digite a profissão do responsável 1"
          />
        </label>
        <label htmlFor="profissaoResponsavel2">
          Profissão do responsável 2:
          <input
            type="text"
            value={profissaoResponsavel2}
            onChange={(e) => setProfissaoResponsavel2(e.target.value)}
            placeholder="Digite a profissão do responsável 2"
          />
        </label>
        <label htmlFor="numIrmaos">
          Número de irmãos:
          <input
            type="number"
            value={numIrmaos}
            onChange={(e) => setNumIrmaos(e.target.value)}
            placeholder="Digite o número de irmãos"
          />
        </label>
        <label htmlFor="pessoasMoramComigo">
          Pessoas moram comigo:
          <input
            type="text"
            value={pessoasMoramComigo}
            onChange={(e) => setPessoasMoramComigo(e.target.value)}
            placeholder="Digite as pessoas que moram com o aluno"
          />
        </label>
        <label htmlFor="pessoasBuscam">
          Pessoas buscam:
          <input
            type="text"
            value={pessoasBuscam}
            onChange={(e) => setPessoasBuscam(e.target.value)}
            placeholder="Digite as pessoas que buscamo aluno"
          />
        </label>
        <label htmlFor="escolaAnoPassado">
          Escola ano passado:
          <input
            type="text"
            value={escolaAnoPassado}
            onChange={(e) => setEscolaAnoPassado(e.target.value)}
            placeholder="Digite a escola ano passado"
          />
        </label>
        <label htmlFor="observacoes">
          Observações:
          <textarea
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
            placeholder="Digite as observações"
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
