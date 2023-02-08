import { IconButton } from 'components/primitives/Button';
import { Result, ResultState } from 'components/Result';
import { StyledLink } from 'components/primitives/Links';
import { FiArrowLeft } from 'react-icons/fi';

import { useTranslation } from 'react-i18next';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';

const NotFound: React.FC = () => {
  const { chainName } = useTypedParams();
  const { t } = useTranslation();

  return (
    <Result
      state={ResultState.ERROR}
      title={t('404.pageNotExist')}
      subtitle={t('404.makeSureCorrectAddress')}
      extra={
        <StyledLink to={`/${chainName}`}>
          <IconButton iconLeft>
            <FiArrowLeft /> {t('404.takeMeHome')}
          </IconButton>
        </StyledLink>
      }
    />
  );
};

export default NotFound;
