import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { Web3Storage } from 'web3.storage';

const web3storageClient = new Web3Storage({
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGE3OTM0NTcwNzg5NTc1Mzk5NmI5ODBmMTZjZEI1NjZFZDIwNkMzYTAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzQ0ODM0ODY4NDIsIm5hbWUiOiJEQVZJIn0.EQKT2O60mJfRZGlxt3ZS3Cpjw05NrVvFO2TeIv-DO6Y',
});

const useWeb3Storage = () => {
  const { chainName, guildId } = useTypedParams();

  const pinToStorage = async (jsonData?: any) => {
    const web3storagePin = web3storageClient?.put(
      [
        new File(
          [
            new Blob([JSON.stringify(jsonData)], {
              type: 'application/json',
            }),
          ],
          'content.json'
        ),
      ],
      {
        name: `DAVI ${chainName} Guild ${guildId}`,
        maxRetries: 3,
        wrapWithDirectory: false,
      }
    );
    return web3storagePin;
  };

  return { pinToStorage };
};

export default useWeb3Storage;
