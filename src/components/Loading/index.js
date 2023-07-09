import PropTypes from 'prop-types';
import * as Styled from './styled';

export default function Loading({ isLoading }) {
  if (!isLoading) return <> </>;
  return (
    <Styled.Container>
      <div />
      <span> Carregando... </span>
    </Styled.Container>
  );
}

Loading.defaultProps = {
  isLoading: false,
};
Loading.propTypes = {
  isLoading: PropTypes.bool,
};
