import { useTranslation } from 'react-i18next';
import { Heading } from 'components/primitives/Typography';
import { Divider } from 'components/Divider';

import { MainContainer, Table, TableCell, TableHeader } from './Members.styled';

const Members = () => {
  const { t } = useTranslation();

  return (
    <MainContainer>
      <Heading size={2}>{t('members')}</Heading>
      <Divider />
      <Table>
        <thead>
          <tr>
            <TableHeader alignment={'left'}>Member</TableHeader>
            <TableHeader alignment={'right'}>REP amount</TableHeader>
            <TableHeader alignment={'right'}>Voting power</TableHeader>
          </tr>
        </thead>
        <tbody>
          <tr>
            <TableCell alignment={'left'}> test.eth </TableCell>
            <TableCell alignment={'right'}> 1100 REP </TableCell>
            <TableCell alignment={'right'}> 6.50% </TableCell>
          </tr>
          <tr>
            <TableCell alignment={'left'}> dinocres.eth </TableCell>
            <TableCell alignment={'right'}> 1200 REP </TableCell>
            <TableCell alignment={'right'}> 7.65% </TableCell>
          </tr>
        </tbody>
      </Table>
    </MainContainer>
  );
};

export default Members;
