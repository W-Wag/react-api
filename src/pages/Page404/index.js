import { Container } from '../../styles/GlobalStyles';
import { MissingPage } from './styled';

export default function Page404() {
  return (
    <Container>
      <MissingPage>
        <h1>Página não encontrada</h1>
      </MissingPage>
    </Container>
  );
}
