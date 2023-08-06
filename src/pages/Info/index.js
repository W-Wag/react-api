import { Container } from '../../styles/GlobalStyles';
import Image from './assets/fichamento-aluno.png';
import * as Styled from './styled';

export default function Page404() {
  return (
    <Container>
      <Styled.Title>Informações</Styled.Title>
      <Styled.Paragraph>
        Este site tem como objetivo simplificar o processo de cadastramento de alunos, fornecendo
        uma forma fácil e prática de armazenar informações como foto, nome, endereço, data de
        nascimento e outros dados relevantes.
      </Styled.Paragraph>

      <img src={Image} alt="Imagem fichar aluno" crossOrigin="" style={{ width: '100%' }} />

      <Styled.Paragraph>
        Vemos acima na imagem que você poderá ver a lista de alunos cadastrados por você, editar e
        ver todos os dados do aluno e exclui-lo caso necessário.
      </Styled.Paragraph>

      <Styled.Paragraph>
        Contate-nos para obter mais informações e também obter acesso a esse sistema e facilitar o
        trabalho de cadastrar alunos.
      </Styled.Paragraph>

      <Styled.Contact
        href="https://api.whatsapp.com/send?1=pt_BR&phone=5561991171870"
        target="_blank"
        rel="noreferrer">
        {' '}
        Entre em contato aqui
      </Styled.Contact>
    </Container>
  );
}
