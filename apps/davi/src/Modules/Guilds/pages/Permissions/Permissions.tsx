import { useState } from 'react';
import { useHookStoreProvider } from 'stores';
import { Heading } from 'components/primitives/Typography';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { MainContainer, TabContainer, TabContent } from './Permissions.styled';
import AssetPermissions from './AssetPermissions';
import FunctionCallPermissions from './FunctionCallPermissions';
import { useTranslation } from 'react-i18next';

const Permissions = () => {
  const { t } = useTranslation();
  const {
    hooks: {
      fetchers: { useGetAllPermissions },
    },
  } = useHookStoreProvider();
  const { guildId: daoAddress } = useTypedParams();

  const tokenPermissions = useGetAllPermissions(daoAddress, 'tokens');
  const functionCallPermissions = useGetAllPermissions(
    daoAddress,
    'functionCalls'
  );

  const [activeTab, setActiveTab] = useState<'assets' | 'functionCalls'>(
    'assets'
  );

  return (
    <>
      <TabContainer>
        <TabContent
          active={activeTab === 'assets'}
          position="left"
          onClick={() => setActiveTab('assets')}
        >
          <Heading size={2}>{t('assetPermissions')}</Heading>
        </TabContent>
        <TabContent
          active={activeTab === 'functionCalls'}
          position="right"
          onClick={() => setActiveTab('functionCalls')}
        >
          <Heading size={2}>{t('functionCallPermissions')}</Heading>
        </TabContent>
      </TabContainer>

      <MainContainer>
        {activeTab === 'assets' && (
          <AssetPermissions tokenPermissions={tokenPermissions} />
        )}
        {activeTab === 'functionCalls' && (
          <FunctionCallPermissions
            functionCallPermissions={functionCallPermissions}
          />
        )}
      </MainContainer>
    </>
  );
};

export default Permissions;
