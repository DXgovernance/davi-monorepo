import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHookStoreProvider } from 'stores';
import { Heading } from 'components/primitives/Typography';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import AssetPermissions from './AssetPermissions';
import FunctionCallPermissions from './FunctionCallPermissions';
import { MainContainer, TabContainer, TabContent } from './Permissions.styled';

const Permissions = ({ subDaoAddress = null }) => {
  const { t } = useTranslation();
  const {
    hooks: {
      fetchers: { useGetAllPermissions },
    },
  } = useHookStoreProvider();
  const { guildId: daoAddress } = useTypedParams();

  const permissionsAddress = subDaoAddress ?? daoAddress;

  const tokenPermissions = useGetAllPermissions(permissionsAddress, 'tokens');
  const functionCallPermissions = useGetAllPermissions(
    permissionsAddress,
    'functionCalls'
  );

  const [activeTab, setActiveTab] = useState<'assets' | 'functionCalls'>(
    'assets'
  );

  console.log(tokenPermissions);

  return (
    <>
      <TabContainer>
        <TabContent
          active={activeTab === 'assets'}
          position="left"
          onClick={() => setActiveTab('assets')}
        >
          <Heading size={2}>
            {t('actionBuilder.permissions.assetTransfer')}
          </Heading>
        </TabContent>
        <TabContent
          active={activeTab === 'functionCalls'}
          position="right"
          onClick={() => setActiveTab('functionCalls')}
        >
          <Heading size={2}>
            {t('actionBuilder.permissions.functionCalls')}
          </Heading>
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
