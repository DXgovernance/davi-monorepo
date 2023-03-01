import { useBlockNumber } from 'wagmi';

export const useBackoff = (refetch: () => any) => {
  const { data: block } = useBlockNumber({
    watch: true,
  });
  let currentBlock = 0;

  // Backoff and retry logic
  const backoff = (fun, successFun, failureFun, exponent) => {
    setTimeout(async () => {
      const { data } = await fun();
      if (currentBlock < 1) {
        console.log('Still fetching current block');
      } else if (data?._meta.block.number > currentBlock) {
        successFun();
      } else if (exponent <= 20) {
        backoff(fun, successFun, failureFun, exponent + 1);
      } else {
        failureFun();
      }
    }, Math.pow(2, exponent) + Math.random() * 10000);
  };

  return async () => {
    currentBlock = block;
    backoff(
      refetch,
      () => (currentBlock = 0),
      () => console.log('Failed to fetch new data'),
      0
    );
  };
};
