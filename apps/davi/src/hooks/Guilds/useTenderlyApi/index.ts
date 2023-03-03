import { Option } from 'components/ActionsBuilder/types';
import { useNetwork } from 'wagmi';

// Variables are hardcoded because they didn't work
// with GitHub. It might change later
const TENDERLY_USER = 'dxdao';
const TENDERLY_PROJECT = 'dxdao-proposal-simulation';
const TENDERLY_ACCESS_KEY = 'fbzJG0PD3R8sX5i2vCCqh4r3YyrELtIO';
const TENDERLY_BASE_URL = `https://api.tenderly.co/api/v1/account/${TENDERLY_USER}/project/${TENDERLY_PROJECT}/`;

export const useTransactionSimulation = () => {
  const { chain } = useNetwork();

  async function simulateTransactions(options: Option[]) {
    try {
      // With the current implementation, the failedTransactions would be 0 or 1,
      // because the bundled simulation API skips the subsequent transactions if one fails.
      let failedTransactions = 0;

      console.log({ options });

      /**
       * Loops through each option.
       */
      for (let i = 0; i < options.length; i++) {
        const actionsPayload = options[i].actions.map(action => {
          const { from, to, data: input } = action;
          return { from, to, input };
        });

        const simulationResults = (
          await simulateActions(actionsPayload, chain?.id)
        )?.simulation_results;

        console.log({ simulationResults });

        debugger;

        let simulatedActionPointer = 0;

        /**
         * Loops through bundled simulation results and
         * adds to relevant direct decoded actions as well as the approval actions.
         */
        for (let j = 0; simulatedActionPointer < simulationResults.length; ) {
          // Double increment of j is needed when there is an approval action embedded
          let shouldDoubleIncrement = false;
          if (!!options[i].decodedActions[j]?.approval) {
            options[i].decodedActions[j].approval.simulationResult =
              simulationResults[simulatedActionPointer];

            if (!simulationResults[simulatedActionPointer].transaction.status) {
              failedTransactions++;
            }

            simulatedActionPointer++;
            shouldDoubleIncrement = true;
          }

          options[i].decodedActions[j].simulationResult =
            simulationResults[simulatedActionPointer];

          if (!simulationResults[simulatedActionPointer].transaction.status) {
            failedTransactions++;
          }

          simulatedActionPointer++;
          shouldDoubleIncrement ? (j += 2) : j++;
        }

        // const simulationUrls = simulationResults.simulation_results.map(result => result?.simulation?.id ? `https://dashboard.tenderly.co/public/${TENDERLY_USER}/${TENDERLY_PROJECT}/simulator/${result.simulation.id}` : null)
        // console.log(simulationUrls);
      }

      return { options, failedTransactions, error: null };
    } catch (error) {
      console.log(error);
      return { options, failedTransactions: 1, error };
    }
  }

  function getSimulationUrl(simulationId: number) {
    if (!simulationId) return null;

    return `https://dashboard.tenderly.co/public/${TENDERLY_USER}/${TENDERLY_PROJECT}/simulator/${simulationId}`;
  }

  return { simulateTransactions, getSimulationUrl };
};

const simulateActions = async (
  actions: {
    from: string;
    to: string;
    input: string;
  }[],
  chainId: number
) => {
  const simulationUrl = `${TENDERLY_BASE_URL}/simulate-bundle`;

  const headers = {
    'X-Access-Key': TENDERLY_ACCESS_KEY,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const payload = actions.map(action => ({
    network_id: chainId.toString(),
    from: action.from,
    to: action.to,
    input: action.input,
    gas: 800000,
    gas_price: '0',
    value: 0,
    save_if_fails: true,
    save: true,
  }));

  let simulationResult = await fetch(simulationUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify({ simulations: payload }),
  }).then(response => response.json());

  return simulationResult;
};
