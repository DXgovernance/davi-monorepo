import { useState, useEffect, useMemo } from 'react';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { bulkDecodeCallsFromOptions } from 'hooks/Guilds/contracts/useDecodedCall';
import { Call, Option } from 'components/ActionsBuilder/types';
import { encodeActions } from 'utils';
import useProposalMetadata from 'hooks/Guilds/useProposalMetadata';
import { useRichContractRegistry } from 'hooks/Guilds/contracts/useRichContractRegistry';
import { ERC20_APPROVE_SIGNATURE } from 'utils';
import { useNetwork } from 'wagmi';
import { getBigNumberPercentage } from 'utils/bnPercentage';
import { EMPTY_CALL } from 'Modules/Guilds/pages/CreateProposal';
import { useVotingResults } from '../useVotingResults';

import { FetcherHooksInterface } from 'stores/types';
import { getGuildOptionLabel } from 'utils/proposals';

const isApprovalData = (data: string) =>
  data && data?.substring(0, 10) === ERC20_APPROVE_SIGNATURE;
const isApprovalCall = (call: Call) => isApprovalData(call?.data);

type IUseProposalCalls = FetcherHooksInterface['useProposalCalls'];

export const useProposalCalls: IUseProposalCalls = (daoId, proposal) => {
  // Decode calls from existing proposal

  const { data: metadata } = useProposalMetadata(proposal?.contentHash);
  const votingResults = useVotingResults(
    daoId,
    proposal?.id,
    proposal?.totalVotes
  );
  const { contracts } = useRichContractRegistry();
  const { chain } = useNetwork();
  const { t } = useTranslation();
  const theme = useTheme();
  const [options, setOptions] = useState<Option[]>([]);

  const totalVotes = proposal?.totalVotes;
  const toArray = proposal?.to;
  const dataArray = proposal?.data;
  const valuesArray = proposal?.value;

  const totalOptionsNum = totalVotes?.length || 0;
  const displayableOptionsNum = totalOptionsNum - 1; // Not counting AGAINST (index 0) option

  const callsPerOption = totalOptionsNum
    ? Math.ceil(dataArray?.length / displayableOptionsNum)
    : 0;
  const optionLabels = metadata?.voteOptions;

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

  const splitCalls = useMemo(() => {
    if (!calls) return null;
    const splitCalls: Call[][] = [];
    for (let i = 0; i < totalOptionsNum; i++) {
      const start = (i - 1) * callsPerOption;
      const end = i * callsPerOption;
      // skipping index 0 since is the "Against" option and doesn't have any call
      splitCalls.push(i === 0 ? [] : calls.slice(start, end));
    }
    return splitCalls;
  }, [calls, callsPerOption, totalOptionsNum]);

  useEffect(() => {
    let cancelled = false;

    if (!daoId || !proposal?.id || !splitCalls) {
      setOptions([]);
      return () => {};
    }
    async function decodeOptions() {
      const encodedOptions: Option[] = await Promise.all(
        splitCalls.map(async (calls, index) => {
          const actions = await encodeActions(calls, contracts, chain?.id);
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
            totalVotes: votingResults?.options[index],
            votePercentage: getBigNumberPercentage(
              votingResults?.options[index],
              votingResults?.totalLocked
            ),
          };
        })
      );

      return bulkDecodeCallsFromOptions(encodedOptions, contracts, chain?.id);
    }
    decodeOptions().then(options =>
      // Return options putting default against-call last
      setOptions([...options.slice(1), options[0]])
    );

    decodeOptions().then(options => {
      if (!cancelled) {
        // Return options putting default against-call last
        setOptions([...options.slice(1), options[0]]);
      }
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    daoId,
    proposal?.id,
    contracts,
    chain,
    splitCalls,
    theme,
    optionLabels,
    totalOptionsNum,
    votingResults?.totalLocked,
  ]);

  return {
    options,
  };
};

export default useProposalCalls;
