import { json, log } from '@graphprotocol/graph-ts';
import { Deployed } from '../../types/Create2Deployer/Create2Deployer';
import { prod } from './prod';
import { local } from './local';
import {
  BaseERC20Guild as BaseERC20GuildTemplate,
  SnapshotRepERC20Guild as SnapshotRepERC20GuildTemplate,
  SnapshotERC20Guild as SnapshotERC20GuildTemplate,
  ERC20SnapshotRep as ERC20SnapshotRepTemplate,
} from '../../types/templates';
import { Guild, Token } from '../../types/schema';
import { ERC20 } from '../../types/GuildRegistry/ERC20';

const bytecodeHashForRepToken =
  '0x6983ad0806d33dc274aff571cced86d383671ad93924d2384ec9d56f77584a37';

// TODO: pull correct bytecodes at build time
const deployedHashedBytecodesJSON = prod;

const parsedJson = json.fromString(deployedHashedBytecodesJSON);
const deployedHashedBytecodes = parsedJson.toArray();

function getImplementationType(bytecodeHash: string): string | null {
  for (let i = 0; i < deployedHashedBytecodes.length; i++) {
    const parsedObject = deployedHashedBytecodes[i].toObject();
    const jsonDeployedBytecode = parsedObject.get('bytecodeHash');
    if (!jsonDeployedBytecode) continue;
    if (!!parsedObject && jsonDeployedBytecode.toString() == bytecodeHash) {
      const type = parsedObject.get('type');
      if (!!type) return type.toString();
      return null;
    }
  }
  return null;
}

// Handler to initialize guilds once they are deployed.
export function handleDeployedEvent(event: Deployed): void {
  const contractAddress = event.params.addr;
  const bytecodeHash = event.params.bytecodeHash.toHexString();
  log.info('Create2Deployer: Indexing contractAddress, bytecodeHash, {}, {}', [
    contractAddress.toHexString(),
    bytecodeHash,
  ]);

  // If no type found, contract deployed was not a guild and will not be created here.
  const guildType = getImplementationType(bytecodeHash);
  if (guildType) {
    log.info('Create2Deployer: Matched contractAddress as, {}, {}', [
      contractAddress.toHexString(),
      guildType,
    ]);

    const guildAddress = contractAddress;
    // Create Guild instance
    let guild = Guild.load(guildAddress.toHexString());
    if (guild == null) {
      guild = new Guild(guildAddress.toHexString());
    }

    // At this point Guild wasn't initialized so we only create guild with default params
    guild.isActive = false;
    guild.proposals = [];
    guild.bytecodeHash = bytecodeHash;
    guild.type = guildType;

    guild.save();

    if (guildType == 'SnapshotRepERC20Guild') {
      SnapshotRepERC20GuildTemplate.create(guildAddress);
    } else if (guildType == 'SnapshotERC20Guild') {
      SnapshotERC20GuildTemplate.create(guildAddress);
    } else if (guildType == 'ERC20Guild' || guildType == 'DXDGuild') {
      BaseERC20GuildTemplate.create(guildAddress);
    }

    return;
  }

  // Matching Rep token creation
  if (bytecodeHash == bytecodeHashForRepToken) {
    let tokenContract = ERC20.bind(contractAddress);
    let token = new Token(contractAddress.toHexString());
    token.name = tokenContract.name();
    token.type = 'ERC20';
    token.symbol = tokenContract.symbol();
    token.decimals = tokenContract.decimals();
    token.save();
    ERC20SnapshotRepTemplate.create(contractAddress);
  }

  log.warning('Create2Deployer: ContractAddress type not matched, {}', [
    contractAddress.toHexString(),
  ]);
}

