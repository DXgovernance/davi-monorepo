import { GuildsTheme } from 'components/theme';
import { createElement } from 'react';
import {
  FiAlertTriangle,
  FiCheckCircle,
  FiHelpCircle,
  FiXOctagon,
} from 'react-icons/fi';
import styled, { useTheme } from 'styled-components';
import { Box } from 'components/primitives/Layout/Box';
import { Heading } from 'components/primitives/Typography';

export enum ResultState {
  SUCCESS,
  ERROR,
  WARNING,
  INFO,
}

interface ResultProps {
  state: ResultState;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  extra?: React.ReactNode;
}

const ResultWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 2rem 0;
`;

const Title = styled(Heading).attrs<any>(() => ({
  size: '2',
}))<any>`
  margin-bottom: 0;
`;

const Subtitle = styled(Heading).attrs<{ theme: GuildsTheme }>(() => ({
  size: '1',
}))`
  color: ${({ theme }) => theme.colors.grey2};
`;

const IconMap = {
  [ResultState.SUCCESS]: FiCheckCircle,
  [ResultState.ERROR]: FiXOctagon,
  [ResultState.INFO]: FiHelpCircle,
  [ResultState.WARNING]: FiAlertTriangle,
};

export const Result: React.FC<ResultProps> = ({
  title,
  state,
  icon,
  subtitle,
  extra,
}) => {
  const theme = useTheme();
  return (
    <ResultWrapper>
      {icon ||
        createElement(IconMap[state], {
          size: 32,
          color:
            state === ResultState.ERROR
              ? theme?.colors?.red
              : theme?.colors?.primary1,
        })}
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
      {extra}
    </ResultWrapper>
  );
};
