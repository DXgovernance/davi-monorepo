import {
  DAOController,
  RegisterScheme,
  UnregisterScheme,
} from '../../types/DAOController/DAOController';

import { Scheme, VotingMachine } from '../../types/schema';
import { Scheme as SchemeContract } from '../../types/DAOController/Scheme';
import { VotingMachine as VotingMachineContract } from '../../types/DAOController/VotingMachine';

import { Scheme as SchemeTemplate } from '../../types/templates';

export function handleRegisterScheme(event: RegisterScheme): void {
  const controllerAddress = event.address;
  const controllerContract = DAOController.bind(controllerAddress);

  const schemeAddress = event.params._scheme;
  const schemeContract = SchemeContract.bind(schemeAddress);

  // Scheme

  const name = schemeContract.schemeName();
  const type = schemeContract.getSchemeType();
  const avatar = schemeContract.avatar();
  const votingMachineAddress = schemeContract.votingMachine();
  const controller = controllerAddress;
  const permissionRegistry = schemeContract.permissionRegistry();
  const maxRepPercentageChange = schemeContract.maxRepPercentageChange();

  const paramsHash = controllerContract.getSchemeParameters(schemeAddress);
  const canManageSchemes =
    controllerContract.getSchemeCanManageSchemes(schemeAddress);
  const canMakeAvatarCalls =
    controllerContract.getSchemeCanMakeAvatarCalls(schemeAddress);
  const canChangeReputation =
    controllerContract.getSchemeCanChangeReputation(schemeAddress);

  const schemeId = schemeAddress.toHexString();
  const scheme = new Scheme(schemeId);

  scheme.name = name;
  scheme.type = type;
  scheme.avatar = avatar.toHexString();
  scheme.votingMachine = votingMachineAddress.toHexString();
  scheme.controller = controller.toHexString();
  scheme.permissionRegistry = permissionRegistry.toHexString();
  scheme.maxRepPercentageChange = maxRepPercentageChange;
  scheme.isRegistered = true;
  scheme.paramsHash = paramsHash;
  scheme.canManageSchemes = canManageSchemes;
  scheme.canMakeAvatarCalls = canMakeAvatarCalls;
  scheme.canChangeReputation = canChangeReputation;

  scheme.save();

  // Voting Machine

  // const votingMachineContract =
  //   VotingMachineContract.bind(votingMachineAddress);

  // const votingParams = votingMachineContract.parameters(paramsHash);

  // let votingMachine = VotingMachine.load(votingMachineAddress.toHexString());

  // if (!votingMachine) {
  //   votingMachine = new VotingMachine(votingMachineAddress.toHexString());
  // }

  // votingMachine.queuedVoteRequiredPercentage =
  //   votingParams.getQueuedVoteRequiredPercentage();
  // votingMachine.queuedVotePeriodLimit = votingParams.getQueuedVotePeriodLimit();
  // votingMachine.boostedVotePeriodLimit =
  //   votingParams.getBoostedVotePeriodLimit();
  // votingMachine.preBoostedVotePeriodLimit =
  //   votingParams.getPreBoostedVotePeriodLimit();
  // votingMachine.thresholdConst = votingParams.getThresholdConst();
  // votingMachine.quietEndingPeriod = votingParams.getQuietEndingPeriod();
  // votingMachine.proposingRepReward = votingParams.getProposingRepReward();
  // votingMachine.minimumDaoBounty = votingParams.getMinimumDaoBounty();
  // votingMachine.daoBountyConst = votingParams.getDaoBountyConst();
  // votingMachine.boostedVoteRequiredPercentage =
  //   votingParams.getBoostedVoteRequiredPercentage();

  // votingMachine.save();

  // SchemeTemplate.create(schemeAddress);
}

export function handleUnregisterScheme(event: UnregisterScheme): void {
  const schemeAddress = event.params._scheme.toHexString();
  const scheme = Scheme.load(schemeAddress);
  if (!scheme) return;
  scheme.isRegistered = false;
  scheme.save();
}

