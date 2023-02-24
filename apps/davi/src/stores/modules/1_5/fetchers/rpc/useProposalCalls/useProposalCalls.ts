import { useState, useEffect, useMemo } from 'react';
import { useNetwork } from 'wagmi';
import { BigNumber } from 'ethers';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';

import {
  preventEmptyString,
  ZERO_HASH,
  ERC20_APPROVE_SIGNATURE,
  getGuildOptionLabel,
} from 'utils';
import { getBigNumberPercentage } from 'utils/bnPercentage';
import { FetcherHooksInterface } from 'stores/types';
import {
  bulkDecodeCallsFromOptions,
  decodeCall,
} from 'hooks/Guilds/contracts/useDecodedCall';
import useProposalMetadata from 'hooks/Guilds/useProposalMetadata';
import { useRichContractRegistry } from 'hooks/Guilds/contracts/useRichContractRegistry';
import { Call, Option } from 'components/ActionsBuilder/types';
import { EMPTY_CALL } from 'Modules/Guilds/pages/CreateProposal';

const isApprovalData = (data: string) =>
  data && data?.substring(0, 10) === ERC20_APPROVE_SIGNATURE;
const isApprovalCall = (call: Call) => isApprovalData(call?.data);
const isZeroHash = (data: string) => data === ZERO_HASH;

type IUseProposalCalls = FetcherHooksInterface['useProposalCalls'];

export const useProposalCalls: IUseProposalCalls = (daoId, proposal) => {
  const { data: metadata } = useProposalMetadata(proposal?.contentHash);

  const voteOptions = {
    0: proposal?.totalVotes[0], // NO votes
    1: proposal?.totalVotes[1], // YES votes
  };

  // TODO: useTotalLocked hook when ready
  const totalLocked = BigNumber.from(1000000000000000); //! HARDCODED

  const { contracts } = useRichContractRegistry();
  const { chain } = useNetwork();
  const { t } = useTranslation();
  const theme = useTheme();
  const [options, setOptions] = useState<Option[]>([]);

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
    const OPTION_INDEX = 1;
    let cancelled = false;

    if (!daoId || !proposal?.id || !calls) {
      setOptions([]);
      return () => {};
    }
    async function decodeOptions() {
      const filteredCalls = calls.filter(
        call =>
          !isZeroHash(call?.data) || !preventEmptyString(call?.value).isZero()
      );

      const encodedActions = await Promise.all(
        filteredCalls.map(async (call: Call) => {
          if (!!call?.approvalCall) {
            // If current call is an "spending" call will have a inner approvalCall
            const { decodedCall: decodedApprovalCall } = await decodeCall(
              call?.approvalCall,
              contracts,
              chain?.id
            );
            // Avoid spreading unnecesary approvalCall;
            const { approvalCall, ...newCall } = call;

            return {
              ...newCall,
              approval: {
                ...decodedApprovalCall,
                amount: decodedApprovalCall?.args?._value,
                token: decodedApprovalCall?.to,
              },
            };
          }
          return call;
        })
      );

      const optionLabel = getGuildOptionLabel({
        metadata,
        optionKey: OPTION_INDEX,
        t,
      });

      const encodedOptions: Option = {
        id: `option-${OPTION_INDEX}`,
        label: optionLabel || `Option ${OPTION_INDEX}`,
        color: theme?.colors?.votes?.[OPTION_INDEX],
        actions: encodedActions,
        totalVotes: voteOptions[OPTION_INDEX],
        votePercentage: getBigNumberPercentage(
          voteOptions[OPTION_INDEX],
          totalLocked
        ),
      };

      return bulkDecodeCallsFromOptions([encodedOptions], contracts, chain?.id);
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
    calls,
    theme,
    metadata,
    t,
    // TODO: check for re-renders
    // votingResults?.totalLocked,
    // votingResults?.options,
  ]);

  return {
    options,
  };
};

export default useProposalCalls;
