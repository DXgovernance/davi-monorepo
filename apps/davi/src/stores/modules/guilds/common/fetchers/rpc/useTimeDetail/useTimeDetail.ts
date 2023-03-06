import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { useHookStoreProvider } from 'stores';
import { isBeforeCurrentTime } from 'utils/time/time';
import useTimeDifferenceHumanized from 'hooks/Guilds/time/useTimeDifferenceHumanized';
import { FetcherHooksInterface } from 'stores/types';
import { ProposalState } from 'types/types.guilds.d';

type IUseTimeDetail = FetcherHooksInterface['useTimeDetail'];

export const useTimeDetail: IUseTimeDetail = (guildId, status, endTime) => {
  const { t } = useTranslation();
  const {
    hooks: {
      fetchers: { useGuildConfig },
    },
  } = useHookStoreProvider();
  const { data: guildConfig } = useGuildConfig(guildId);
  const endTimeMoment =
    status === ProposalState.Executable || status === ProposalState.Failed
      ? moment(endTime).add(
          guildConfig?.timeForExecution?.toNumber(),
          t('duration.seconds_other')
        )
      : endTime;

  const timeDifferenceHumanized = useTimeDifferenceHumanized(endTimeMoment);

  let endTimeDetail: string = null;

  // with states Executable and Failed we show the time difference with execution time. Otherwise, with ending time
  if (status === ProposalState.Executable || status === ProposalState.Failed) {
    endTimeDetail = isBeforeCurrentTime(endTimeMoment)
      ? t('proposal.time.expiredTimeAgo', { timeDifferenceHumanized })
      : t('proposal.time.expiresInTimeDetail', { timeDifferenceHumanized });
  } else {
    endTimeDetail = isBeforeCurrentTime(endTimeMoment)
      ? t('proposal.time.endedTimeAgo', { timeDifferenceHumanized })
      : t('proposal.time.endingTimeLeft', { timeDifferenceHumanized });
  }

  return { detail: endTimeDetail, moment: endTimeMoment };
};
