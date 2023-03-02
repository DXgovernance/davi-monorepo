import { useState, useEffect, useMemo } from 'react';
import { useNetwork } from 'wagmi';
import { BigNumber } from 'ethers';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';

import {
  ERC20_APPROVE_SIGNATURE,
  getGuildOptionLabel,
  encodeActions,
} from 'utils';
import { getBigNumberPercentage } from 'utils/bnPercentage';
import { FetcherHooksInterface } from 'stores/types';
import { bulkDecodeCallsFromOptions } from 'hooks/Guilds/contracts/useDecodedCall';
import useProposalMetadata from 'hooks/Guilds/useProposalMetadata';
import { useRichContractRegistry } from 'hooks/Guilds/contracts/useRichContractRegistry';
import { Call, Option } from 'components/ActionsBuilder/types';
import { EMPTY_CALL } from 'Modules/Guilds/pages/CreateProposal';
import { useTotalLocked } from '../../subgraph';

const isApprovalData = (data: string) =>
  data && data?.substring(0, 10) === ERC20_APPROVE_SIGNATURE;
const isApprovalCall = (call: Call) => isApprovalData(call?.data);

type IUseProposalCalls = FetcherHooksInterface['useProposalCalls'];

export const useProposalCalls: IUseProposalCalls = (daoId, proposal) => {
  const { data: metadata } = useProposalMetadata(proposal?.contentHash);

  const { contracts } = useRichContractRegistry();
  const { chain } = useNetwork();
  const { t } = useTranslation();
  const theme = useTheme();
  const [options, setOptions] = useState<Option[]>([]);
  const { data: totalLocked } = useTotalLocked(daoId, proposal?.id);

  const toArray = proposal?.to;
  const dataArray = proposal?.data;
  const valuesArray = proposal?.value;

  const calls: Call[] = useMemo(() => {
    const buildCall = (idx: number): Call => ({
      from: daoId,
      to: toArray[idx],
      data: dataArray[idx],
      value: valuesArray[idx],
    });

    return dataArray
      ?.map((_, index) => {
        const call = buildCall(index);
        if (isApprovalData(dataArray[index - 1])) {
          return {
            ...call,
            // We assume that if previous call was an approval, then current one is the one that is being approved
            // So passing nested temporary approvalCall and remove it from the calls array
            approvalCall: buildCall(index - 1),
          };
        }

        // Inyecting empty call to keep consistency on number of calls per option after nesting approval call. This will be skipped later when decoding options.
        if (isApprovalCall(call)) return EMPTY_CALL;
        return call;
      })
      .filter(Boolean);
  }, [daoId, toArray, dataArray, valuesArray]);

  useEffect(() => {
    if (!daoId || !proposal?.id || !calls) {
      setOptions([]);
      return () => {};
    }

    let cancelled = false;

    const populateOption = async (
      actions: Call[],
      votes: BigNumber,
      index: number
    ): Promise<Option> => {
      const optionLabel = getGuildOptionLabel({
        metadata,
        optionKey: index,
        t,
      });

      return {
        id: `option-${index}`,
        label: optionLabel || `Option ${index}`,
        color: theme?.colors?.votes?.[index],
        actions,
        totalVotes: votes,
        votePercentage: getBigNumberPercentage(votes, totalLocked),
      };
    };

    const decodeOptions = async () => {
      // NO and YES indexes are defined at the contract level
      const YES_INDEX = 1;
      const NO_INDEX = 0;

      // Yes option
      const encodedYesActions = await encodeActions(
        calls,
        contracts,
        chain?.id
      );
      const yesVotes = proposal?.totalVotes[YES_INDEX];
      const populatedYesOption = await populateOption(
        encodedYesActions,
        yesVotes,
        YES_INDEX
      );

      // No option
      const encodedNoActions = []; // NO has no actions
      const noVotes = proposal?.totalVotes[NO_INDEX];
      const populatedNoOption = await populateOption(
        encodedNoActions,
        noVotes,
        NO_INDEX
      );

      return bulkDecodeCallsFromOptions(
        [populatedYesOption, populatedNoOption],
        contracts,
        chain?.id
      );
    };

    decodeOptions().then(options => setOptions(options));

    decodeOptions().then(options => {
      if (!cancelled) setOptions(options);
    });

    return () => {
      cancelled = true;
    };
  }, [
    daoId,
    proposal?.id,
    proposal?.totalVotes,
    totalLocked,
    contracts,
    chain,
    calls,
    theme,
    metadata,
    t,
  ]);

  return {
    options,
  };
};

export default useProposalCalls;
