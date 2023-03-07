import { json } from '@graphprotocol/graph-ts';
import { Deployed } from '../../types/Create2Deployer/Create2Deployer';
import { prod } from './prod';
import { local } from './local';
import {
  BaseERC20Guild as BaseERC20GuildTemplate,
  SnapshotRepERC20Guild as SnapshotRepERC20GuildTemplate,
  SnapshotERC20Guild as SnapshotERC20GuildTemplate,
  ERC20SnapshotRep as ERC20SnapshotRepTemplate,
} from '../../types/templates';
import { Guild } from '../../types/schema';

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
  const type = getImplementationType(event.params.bytecodeHash.toHexString());
  // If no type found, contract deployed was not a guild and will not be trated here.
  if (!!type) {
    const guildAddress = contractAddress;
    // Create Guild instance
    let guild = Guild.load(guildAddress.toHexString());
    if (guild == null) {
      guild = new Guild(guildAddress.toHexString());
    }

    // At this point Guild wasn't initialized so we only create guild with default params
    guild.isActive = false;
    guild.proposals = [];
    guild.members = [];
    guild.bytecodeHash = event.params.bytecodeHash.toHexString();
    guild.type = type;

    guild.save();

    if (type == 'SnapshotRepERC20Guild') {
      SnapshotRepERC20GuildTemplate.create(guildAddress);
    } else if (type == 'SnapshotERC20Guild') {
      SnapshotERC20GuildTemplate.create(guildAddress);
    } else if (type == 'ERC20Guild' || type == 'DXDGuild') {
      BaseERC20GuildTemplate.create(guildAddress);
    }
  }
}

