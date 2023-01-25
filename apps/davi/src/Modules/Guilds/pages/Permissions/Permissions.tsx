import { Heading } from 'components/primitives/Typography';
import { useGetAllERC20Permissions } from 'hooks/Guilds/erc20/useGetAllERC20Permissions';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { useTranslation } from 'react-i18next';
import {
  MainContainer,
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './Permissions.styled';

const AssetPermissionRow = () => {
  return (
    <TableRow>
      <TableCell width="auto" alignment="left">
        Token
      </TableCell>
      <TableCell width="auto">Address</TableCell>
      <TableCell width="auto" alignment="right">
        Allowed amount
      </TableCell>
    </TableRow>
  );
};

const Permissions = () => {
  const { t } = useTranslation();
  const { guildId } = useTypedParams();

  const { data: permissions } = useGetAllERC20Permissions(guildId);
  console.log(permissions);

  return (
    <MainContainer>
      <Heading size={2}>Permissions tab TODO</Heading>
      <Table>
        <TableHead>
          <tr>
            <TableHeader alignment={'left'}>{t('asset')}</TableHeader>
            <TableHeader alignment={'center'}>{t('assetAddress')}</TableHeader>
            <TableHeader alignment={'right'}>{t('allowedAmount')}</TableHeader>
          </tr>
        </TableHead>
        <tbody>
          <AssetPermissionRow />
          <AssetPermissionRow />
          <AssetPermissionRow />
        </tbody>
      </Table>
    </MainContainer>
  );
};

export default Permissions;
