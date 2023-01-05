import { AddGuild, RemoveGuild } from '../../types/GuildRegistry/GuildRegistry';
import { Guild } from '../../types/schema';

export function handleAddGuild(event: AddGuild): void {
  let address = event.params.guildAddress;

  let guild = Guild.load(address.toHexString());
  if (guild == null) {
    guild = new Guild(address.toHex());
  }

  guild.isActive = true;

  guild.save();
}

export function handleRemoveGuild(event: RemoveGuild): void {
  let id = event.params.guildAddress.toHex();
  let guild = Guild.load(id);

  // This should never happen!
  if (guild == null) return;

  guild.isActive = false;
  guild.save();
}

