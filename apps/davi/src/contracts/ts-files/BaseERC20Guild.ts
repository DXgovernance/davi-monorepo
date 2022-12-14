export const BaseERC20Guild = {
  _format: 'hh-sol-artifact-1',
  contractName: 'BaseERC20Guild',
  sourceName: 'dxdao-contracts/contracts/erc20guild/BaseERC20Guild.sol',
  abi: [
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'proposalId',
          type: 'bytes32',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'newState',
          type: 'uint256',
        },
      ],
      name: 'ProposalStateChanged',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'voter',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'value',
          type: 'uint256',
        },
      ],
      name: 'TokensLocked',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'voter',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'value',
          type: 'uint256',
        },
      ],
      name: 'TokensWithdrawn',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'proposalId',
          type: 'bytes32',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'option',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'voter',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'votingPower',
          type: 'uint256',
        },
      ],
      name: 'VoteAdded',
      type: 'event',
    },
    {
      stateMutability: 'payable',
      type: 'fallback',
    },
    {
      inputs: [],
      name: 'MAX_OPTIONS_PER_PROPOSAL',
      outputs: [
        {
          internalType: 'uint8',
          name: '',
          type: 'uint8',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'activeProposalsNow',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address[]',
          name: 'to',
          type: 'address[]',
        },
        {
          internalType: 'bytes[]',
          name: 'data',
          type: 'bytes[]',
        },
        {
          internalType: 'uint256[]',
          name: 'value',
          type: 'uint256[]',
        },
        {
          internalType: 'uint256',
          name: 'totalOptions',
          type: 'uint256',
        },
        {
          internalType: 'string',
          name: 'title',
          type: 'string',
        },
        {
          internalType: 'string',
          name: 'contentHash',
          type: 'string',
        },
      ],
      name: 'createProposal',
      outputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'proposalId',
          type: 'bytes32',
        },
      ],
      name: 'endProposal',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getActiveProposalsNow',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getLockTime',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getMaxActiveProposals',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getMaxGasPrice',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getMinimumMembersForProposalCreation',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getMinimumTokensLockedForProposalCreation',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getName',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getPermissionRegistry',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'proposalId',
          type: 'bytes32',
        },
      ],
      name: 'getProposal',
      outputs: [
        {
          components: [
            {
              internalType: 'address',
              name: 'creator',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'startTime',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'endTime',
              type: 'uint256',
            },
            {
              internalType: 'address[]',
              name: 'to',
              type: 'address[]',
            },
            {
              internalType: 'bytes[]',
              name: 'data',
              type: 'bytes[]',
            },
            {
              internalType: 'uint256[]',
              name: 'value',
              type: 'uint256[]',
            },
            {
              internalType: 'string',
              name: 'title',
              type: 'string',
            },
            {
              internalType: 'string',
              name: 'contentHash',
              type: 'string',
            },
            {
              internalType: 'enum BaseERC20Guild.ProposalState',
              name: 'state',
              type: 'uint8',
            },
            {
              internalType: 'uint256[]',
              name: 'totalVotes',
              type: 'uint256[]',
            },
          ],
          internalType: 'struct BaseERC20Guild.Proposal',
          name: '',
          type: 'tuple',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getProposalTime',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'proposalId',
          type: 'bytes32',
        },
        {
          internalType: 'address',
          name: 'voter',
          type: 'address',
        },
      ],
      name: 'getProposalVotesOfVoter',
      outputs: [
        {
          internalType: 'uint256',
          name: 'option',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'votingPower',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getProposalsIds',
      outputs: [
        {
          internalType: 'bytes32[]',
          name: '',
          type: 'bytes32[]',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getProposalsIdsLength',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'signedVoteHash',
          type: 'bytes32',
        },
      ],
      name: 'getSignedVote',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getTimeForExecution',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getToken',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getTokenVault',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getTotalLocked',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getTotalMembers',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getTotalProposals',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getVoteGas',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'voter',
          type: 'address',
        },
      ],
      name: 'getVoterLockTimestamp',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getVotingPowerForProposalCreation',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getVotingPowerForProposalExecution',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'voter',
          type: 'address',
        },
        {
          internalType: 'bytes32',
          name: 'proposalId',
          type: 'bytes32',
        },
        {
          internalType: 'uint256',
          name: 'option',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'votingPower',
          type: 'uint256',
        },
      ],
      name: 'hashVote',
      outputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32',
        },
      ],
      stateMutability: 'pure',
      type: 'function',
    },
    {
      inputs: [],
      name: 'lockTime',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenAmount',
          type: 'uint256',
        },
      ],
      name: 'lockTokens',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'maxActiveProposals',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'maxGasPrice',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'minimumMembersForProposalCreation',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'minimumTokensLockedForProposalCreation',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'name',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'proposalTime',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32',
        },
      ],
      name: 'proposalVotes',
      outputs: [
        {
          internalType: 'uint256',
          name: 'option',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'votingPower',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32',
        },
      ],
      name: 'proposals',
      outputs: [
        {
          internalType: 'address',
          name: 'creator',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'startTime',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'endTime',
          type: 'uint256',
        },
        {
          internalType: 'string',
          name: 'title',
          type: 'string',
        },
        {
          internalType: 'string',
          name: 'contentHash',
          type: 'string',
        },
        {
          internalType: 'enum BaseERC20Guild.ProposalState',
          name: 'state',
          type: 'uint8',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'proposalsIds',
      outputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_proposalTime',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_timeForExecution',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_votingPowerPercentageForProposalExecution',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_votingPowerPercentageForProposalCreation',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_voteGas',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_maxGasPrice',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_maxActiveProposals',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_lockTime',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_minimumMembersForProposalCreation',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_minimumTokensLockedForProposalCreation',
          type: 'uint256',
        },
      ],
      name: 'setConfig',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'proposalId',
          type: 'bytes32',
        },
        {
          internalType: 'uint256',
          name: 'option',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'votingPower',
          type: 'uint256',
        },
        {
          internalType: 'address',
          name: 'voter',
          type: 'address',
        },
        {
          internalType: 'bytes',
          name: 'signature',
          type: 'bytes',
        },
      ],
      name: 'setSignedVote',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'proposalId',
          type: 'bytes32',
        },
        {
          internalType: 'uint256',
          name: 'option',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'votingPower',
          type: 'uint256',
        },
      ],
      name: 'setVote',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32',
        },
      ],
      name: 'signedVotes',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'timeForExecution',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'token',
      outputs: [
        {
          internalType: 'contract IERC20Upgradeable',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'tokenVault',
      outputs: [
        {
          internalType: 'contract TokenVault',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      name: 'tokensLocked',
      outputs: [
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'timestamp',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'totalLocked',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'totalProposals',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'voteGas',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'votingPowerOf',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'votingPowerPercentageForProposalCreation',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'votingPowerPercentageForProposalExecution',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenAmount',
          type: 'uint256',
        },
      ],
      name: 'withdrawTokens',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ] as const,
  bytecode:
    '0x608060405234801561001057600080fd5b50613da7806100206000396000f3fe6080604052600436106103255760003560e01c80635bc789d9116101ae578063ae619234116100eb578063e04503531161008f578063f4732da61161006c578063f4732da614610954578063f98606a714610969578063fc0c546a1461097f578063fc4e703f1461099f57005b8063e0450353146108e9578063e158080a146108ff578063f09951981461091557005b8063b7c15f8d116100c8578063b7c15f8d1461088a578063bcc3f3bd1461089f578063c0a4d64d146108bf578063c93e01e3146108d457005b8063ae61923414610835578063b3929aaa1461084a578063b3b470611461086a57005b806389c98c0611610152578063a16fe3421161012f578063a16fe342146107d6578063a78d80fc146107f4578063a7aeb5571461080a578063ad6c1e341461082057005b806389c98c061461078c5780638f180305146107a157806392b71654146107b657005b80636c8b72f61161018b5780636c8b72f6146107125780636e27d8891461072757806377027ff4146107475780638029eff11461075c57005b80635bc789d9146106c75780635e508c2c146106e757806364fe6ed2146106fd57005b80632229a0e21161027c57806332ed5b12116102205780633f10cf15116101fd5780633f10cf1514610650578063430694cf1461066657806354f2f7af1461069357806356891412146106b157005b806332ed5b12146105f25780633bf353fb146106245780633de39c111461063a57005b80632d5b17de116102595780632d5b17de146105395780632d757c3e146105595780632fd99c0014610592578063315a095d146105d257005b80632229a0e2146104e85780632467ef94146104fd57806325c069fc1461051257005b8063130485fe116102e357806317d7de7c116102c057806317d7de7c14610476578063184a0ae91461048b5780631a5007dd146104a157806321df0da7146104b657005b8063130485fe1461041657806313108d741461043657806316bbecde1461045657005b80623a40d01461032757806301a598a61461035257806306fdde031461039b5780630a366a63146103bd5780630d668087146103e0578063123f6d67146103f6575b005b34801561033357600080fd5b5061033c6109b5565b6040516103499190613215565b60405180910390f35b34801561035e57600080fd5b5061038661036d366004613275565b6012602052600090815260409020805460019091015482565b60408051928352602083019190915201610349565b3480156103a757600080fd5b506103b0610a0d565b60405161034991906132dd565b3480156103c957600080fd5b506103d2610a9b565b604051908152602001610349565b3480156103ec57600080fd5b506103d2600d5481565b34801561040257600080fd5b506103256104113660046132f0565b610ac3565b34801561042257600080fd5b50610386610431366004613358565b610d44565b34801561044257600080fd5b506103d26104513660046135c8565b610d76565b34801561046257600080fd5b506103256104713660046136a2565b61132c565b34801561048257600080fd5b506103b0611462565b34801561049757600080fd5b506103d260035481565b3480156104ad57600080fd5b50600a546103d2565b3480156104c257600080fd5b506000546001600160a01b03165b6040516001600160a01b039091168152602001610349565b3480156104f457600080fd5b506016546103d2565b34801561050957600080fd5b50600c546103d2565b34801561051e57600080fd5b50610527600a81565b60405160ff9091168152602001610349565b34801561054557600080fd5b506103256105543660046136ce565b6114eb565b34801561056557600080fd5b506103d2610574366004613275565b6001600160a01b031660009081526012602052604090206001015490565b34801561059e57600080fd5b506105c26105ad366004613739565b60136020526000908152604090205460ff1681565b6040519015158152602001610349565b3480156105de57600080fd5b506103256105ed366004613739565b61179b565b3480156105fe57600080fd5b5061061261060d366004613739565b6119e3565b6040516103499695949392919061378a565b34801561063057600080fd5b506103d2600c5481565b34801561064657600080fd5b506103d260085481565b34801561065c57600080fd5b506103d260045481565b34801561067257600080fd5b50610686610681366004613739565b611b37565b60405161034991906138b0565b34801561069f57600080fd5b506011546001600160a01b03166104d0565b3480156106bd57600080fd5b506103d2600e5481565b3480156106d357600080fd5b506011546104d0906001600160a01b031681565b3480156106f357600080fd5b506103d260055481565b34801561070957600080fd5b506010546103d2565b34801561071e57600080fd5b506007546103d2565b34801561073357600080fd5b50610325610742366004613739565b611ec2565b34801561075357600080fd5b506009546103d2565b34801561076857600080fd5b506105c2610777366004613739565b60009081526013602052604090205460ff1690565b34801561079857600080fd5b506008546103d2565b3480156107ad57600080fd5b50600b546103d2565b3480156107c257600080fd5b506103d26107d13660046139ae565b612042565b3480156107e257600080fd5b506001546001600160a01b03166104d0565b34801561080057600080fd5b506103d2600a5481565b34801561081657600080fd5b506103d2600f5481565b34801561082c57600080fd5b50600f546103d2565b34801561084157600080fd5b506103d2612099565b34801561085657600080fd5b506103d2610865366004613739565b6120b0565b34801561087657600080fd5b50610325610885366004613739565b6120d1565b34801561089657600080fd5b506004546103d2565b3480156108ab57600080fd5b506103d26108ba366004613275565b6129a7565b3480156108cb57600080fd5b50600d546103d2565b3480156108e057600080fd5b506003546103d2565b3480156108f557600080fd5b506103d260095481565b34801561090b57600080fd5b506103d260105481565b34801561092157600080fd5b50610386610930366004613358565b60146020908152600092835260408084209091529082529020805460019091015482565b34801561096057600080fd5b50600e546103d2565b34801561097557600080fd5b506103d260065481565b34801561098b57600080fd5b506000546104d0906001600160a01b031681565b3480156109ab57600080fd5b506103d260075481565b60606016805480602002602001604051908101604052809291908181526020018280548015610a0357602002820191906000526020600020905b8154815260200190600101908083116109ef575b5050505050905090565b60028054610a1a906139e7565b80601f0160208091040260200160405190810160405280929190818152602001828054610a46906139e7565b8015610a935780601f10610a6857610100808354040283529160200191610a93565b820191906000526020600020905b815481529060010190602001808311610a7657829003601f168201915b505050505081565b6000610abe612710610ab8600654610ab2600e5490565b906129c2565b906129d5565b905090565b333014610b485760405162461bcd60e51b815260206004820152604260248201527f45524332304775696c643a204f6e6c792063616c6c61626c652062792045524360448201527f32306775696c6420697473656c66206f72207768656e20696e697469616c697a606482015261195960f21b608482015260a4015b60405180910390fd5b60008a11610bb05760405162461bcd60e51b815260206004820152602f60248201527f45524332304775696c643a2070726f706f73616c2074696d652068617320746f60448201526e0206265206d6f7265207468616e203608c1b6064820152608401610b3f565b89831015610c265760405162461bcd60e51b815260206004820152603e60248201527f45524332304775696c643a206c6f636b54696d652068617320746f206265206860448201527f6967686572206f7220657175616c20746f2070726f706f73616c54696d6500006064820152608401610b3f565b60008811610c9c5760405162461bcd60e51b815260206004820152603c60248201527f45524332304775696c643a20766f74696e6720706f77657220666f722065786560448201527f637574696f6e2068617320746f206265206d6f7265207468616e2030000000006064820152608401610b3f565b6201c908861115610d155760405162461bcd60e51b815260206004820152603960248201527f45524332304775696c643a20766f7465206761732068617320746f206265206560448201527f7175616c206f72206c6f776572207468616e20313137303030000000000000006064820152608401610b3f565b600399909955600497909755600595909555600693909355600791909155600855600955600d55600f55601055565b60008281526014602090815260408083206001600160a01b0385168452909152902080546001909101545b9250929050565b6000601054600e541015610df25760405162461bcd60e51b815260206004820152603960248201527f45524332304775696c643a204e6f7420656e6f75676820746f6b656e73206c6f60448201527f636b656420746f2063726561746520612070726f706f73616c000000000000006064820152608401610b3f565b600f54600b541015610e625760405162461bcd60e51b815260206004820152603360248201527f45524332304775696c643a204e6f7420656e6f756768206d656d6265727320746044820152721bc818dc99585d194818481c1c9bdc1bdcd85b606a1b6064820152608401610b3f565b600954600c5410610ed45760405162461bcd60e51b815260206004820152603660248201527f45524332304775696c643a204d6178696d756d20616d6f756e74206f662061636044820152751d1a5d99481c1c9bdc1bdcd85b1cc81c995858da195960521b6064820152608401610b3f565b610edc610a9b565b610ee5336129a7565b1015610f515760405162461bcd60e51b815260206004820152603560248201527f45524332304775696c643a204e6f7420656e6f75676820766f74696e67506f77604482015274195c881d1bc818dc99585d19481c1c9bdc1bdcd85b605a1b6064820152608401610b3f565b85518751148015610f63575084518751145b610fcc5760405162461bcd60e51b815260206004820152603460248201527f45524332304775696c643a2057726f6e67206c656e677468206f6620746f2c2060448201527364617461206f722076616c75652061727261797360601b6064820152608401610b3f565b60008751116110375760405162461bcd60e51b815260206004820152603160248201527f45524332304775696c643a20746f2c20646174612076616c7565206172726179604482015270732063616e6e6f7420626520656d70747960781b6064820152608401610b3f565b865184111580156110515750845161104f90856129e1565b155b6110c35760405162461bcd60e51b815260206004820152603760248201527f45524332304775696c643a20496e76616c696420746f74616c4f7074696f6e7360448201527f206f72206f7074696f6e2063616c6c73206c656e6774680000000000000000006064820152608401610b3f565b600a84111561113a5760405162461bcd60e51b815260206004820152603a60248201527f45524332304775696c643a204d6178696d756d20616d6f756e74206f66206f7060448201527f74696f6e73207065722070726f706f73616c20726561636865640000000000006064820152608401610b3f565b600a546040516bffffffffffffffffffffffff193360601b166020820152426034820152605481019190915260009060740160405160208183030381529060405280519060200120905061119a6001600a546129ed90919063ffffffff16565b600a55600081815260156020526040902080546001600160a01b0319163317815542600182018190556003546111d091906129ed565b600282015588516111ea90600383019060208c0190612fd0565b50875161120090600483019060208b0190613035565b50865161121690600583019060208a019061308e565b50845161122c90600683019060208801906130c9565b50835161124290600783019060208701906130c9565b5061124e8660016129ed565b67ffffffffffffffff81111561126657611266613384565b60405190808252806020026020018201604052801561128f578160200160208202803683370190505b5080516112a691600984019160209091019061308e565b5060088101805460ff19166001908117909155600c546112c5916129ed565b600c5581600080516020613d52833981519152600160405190815260200160405180910390a250601680546001810182556000919091527fd833147d7dc355ba459fc788f669e58cfaf9dc25ddcd0702e87d69c7b512428901819055979650505050505050565b600083815260156020526040902060020154421061135c5760405162461bcd60e51b8152600401610b3f90613a22565b80611366336129a7565b1015801561138f5750600083815260146020908152604080832033845290915290206001015481115b6113ab5760405162461bcd60e51b8152600401610b3f90613a6d565b60008381526014602090815260408083203384529091529020541580156113ec57506000838152601460209081526040808320338452909152902060010154155b8061143557506000838152601460209081526040808320338452909152902054821480156114355750600083815260146020908152604080832033845290915290206001015481115b6114515760405162461bcd60e51b8152600401610b3f90613ab3565b61145d338484846129f9565b505050565b606060028054611471906139e7565b80601f016020809104026020016040519081016040528092919081815260200182805461149d906139e7565b8015610a035780601f106114bf57610100808354040283529160200191610a03565b820191906000526020600020905b8154815290600101906020018083116114cd57509395945050505050565b600085815260156020526040902060020154421061151b5760405162461bcd60e51b8152600401610b3f90613a22565b600061152983878787612042565b60008181526013602052604090205490915060ff161561158b5760405162461bcd60e51b815260206004820152601960248201527f45524332304775696c643a20416c726561647920766f746564000000000000006044820152606401610b3f565b6115ec826115e6836040517f19457468657265756d205369676e6564204d6573736167653a0a3332000000006020820152603c8101829052600090605c01604051602081830303815290604052805190602001209050919050565b90612c43565b6001600160a01b0316836001600160a01b03161461164c5760405162461bcd60e51b815260206004820152601860248201527f45524332304775696c643a2057726f6e67207369676e657200000000000000006044820152606401610b3f565b6000818152601360205260409020805460ff191660011790558361166f846129a7565b101580156116a1575060008681526014602090815260408083206001600160a01b038716845290915290206001015484115b6116bd5760405162461bcd60e51b8152600401610b3f90613a6d565b60008681526014602090815260408083206001600160a01b0387168452909152902054158015611710575060008681526014602090815260408083206001600160a01b0387168452909152902060010154155b8061176b575060008681526014602090815260408083206001600160a01b03871684529091529020548514801561176b575060008681526014602090815260408083206001600160a01b038716845290915290206001015484115b6117875760405162461bcd60e51b8152600401610b3f90613ab3565b611793838787876129f9565b505050505050565b806117a5336129a7565b10156118125760405162461bcd60e51b815260206004820152603660248201527f45524332304775696c643a20556e61626c6520746f207769746864726177206d6044820152751bdc99481d1bdad95b9cc81d1a185b881b1bd8dad95960521b6064820152608401610b3f565b3360009081526012602052604090206001015442116118735760405162461bcd60e51b815260206004820152601f60248201527f45524332304775696c643a20546f6b656e73207374696c6c206c6f636b6564006044820152606401610b3f565b600081116118e95760405162461bcd60e51b815260206004820152603f60248201527f45524332304775696c643a20616d6f756e74206f6620746f6b656e7320746f2060448201527f7769746864726177206d7573742062652067726561746572207468616e2030006064820152608401610b3f565b336000908152601260205260409020546119039082612c67565b33600090815260126020526040902055600e546119209082612c67565b600e5560115460405163f3fef3a360e01b8152336004820152602481018390526001600160a01b039091169063f3fef3a390604401600060405180830381600087803b15801561196f57600080fd5b505af1158015611983573d6000803e3d6000fd5b50505050611990336129a7565b6119a657600b546119a2906001612c67565b600b555b60408051338152602081018390527f6352c5382c4a4578e712449ca65e83cdb392d045dfcf1cad9615189db2da244b91015b60405180910390a150565b60156020526000908152604090208054600182015460028301546006840180546001600160a01b03909416949293919291611a1d906139e7565b80601f0160208091040260200160405190810160405280929190818152602001828054611a49906139e7565b8015611a965780601f10611a6b57610100808354040283529160200191611a96565b820191906000526020600020905b815481529060010190602001808311611a7957829003601f168201915b505050505090806007018054611aab906139e7565b80601f0160208091040260200160405190810160405280929190818152602001828054611ad7906139e7565b8015611b245780601f10611af957610100808354040283529160200191611b24565b820191906000526020600020905b815481529060010190602001808311611b0757829003601f168201915b5050506008909301549192505060ff1686565b611b3f61313c565b60008281526015602090815260409182902082516101408101845281546001600160a01b031681526001820154818401526002820154818501526003820180548551818602810186019096528086529194929360608601939290830182828015611bd257602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311611bb4575b5050505050815260200160048201805480602002602001604051908101604052809291908181526020016000905b82821015611cac578382906000526020600020018054611c1f906139e7565b80601f0160208091040260200160405190810160405280929190818152602001828054611c4b906139e7565b8015611c985780601f10611c6d57610100808354040283529160200191611c98565b820191906000526020600020905b815481529060010190602001808311611c7b57829003601f168201915b505050505081526020019060010190611c00565b50505050815260200160058201805480602002602001604051908101604052809291908181526020018280548015611d0357602002820191906000526020600020905b815481526020019060010190808311611cef575b50505050508152602001600682018054611d1c906139e7565b80601f0160208091040260200160405190810160405280929190818152602001828054611d48906139e7565b8015611d955780601f10611d6a57610100808354040283529160200191611d95565b820191906000526020600020905b815481529060010190602001808311611d7857829003601f168201915b50505050508152602001600782018054611dae906139e7565b80601f0160208091040260200160405190810160405280929190818152602001828054611dda906139e7565b8015611e275780601f10611dfc57610100808354040283529160200191611e27565b820191906000526020600020905b815481529060010190602001808311611e0a57829003601f168201915b5050509183525050600882015460209091019060ff166004811115611e4e57611e4e613752565b6004811115611e5f57611e5f613752565b815260200160098201805480602002602001604051908101604052809291908181526020018280548015611eb257602002820191906000526020600020905b815481526020019060010190808311611e9e575b5050505050815250509050919050565b60008111611f2d5760405162461bcd60e51b815260206004820152603260248201527f45524332304775696c643a20546f6b656e7320746f206c6f636b2073686f756c60448201527106420626520686967686572207468616e20360741b6064820152608401610b3f565b611f36336129a7565b611f4c57600b54611f489060016129ed565b600b555b6011546040516311f9fbc960e21b8152336004820152602481018390526001600160a01b03909116906347e7ef2490604401600060405180830381600087803b158015611f9857600080fd5b505af1158015611fac573d6000803e3d6000fd5b505033600090815260126020526040902054611fcb92509050826129ed565b33600090815260126020526040902055600d54611fe99042906129ed565b33600090815260126020526040902060010155600e5461200990826129ed565b600e5560408051338152602081018390527fac87f20a77d28ee8bbb58ec87ea8fa968b3393efae1a368fd50b767c2847391c91016119d8565b6040516bffffffffffffffffffffffff19606086901b166020820152603481018490526054810183905260748101829052600090609401604051602081830303815290604052805190602001209050949350505050565b6000610abe612710610ab8600554610ab2600e5490565b601681815481106120c057600080fd5b600091825260209091200154905081565b60175460ff16156121305760405162461bcd60e51b8152602060048201526024808201527f45524332304775696c643a2050726f706f73616c20756e6465722065786563756044820152633a34b7b760e11b6064820152608401610b3f565b600160008281526015602052604090206008015460ff16600481111561215857612158613752565b146121b35760405162461bcd60e51b815260206004820152602560248201527f45524332304775696c643a2050726f706f73616c20616c72656164792065786560448201526418dd5d195960da1b6064820152608401610b3f565b60008181526015602052604090206002015442116122215760405162461bcd60e51b815260206004820152602560248201527f45524332304775696c643a2050726f706f73616c206861736e277420656e646560448201526419081e595d60da1b6064820152608401610b3f565b60008181526015602052604081206009018054829190829061224557612245613b1a565b600091825260209091200154905060015b60008481526015602052604090206009015481101561236f57612277612099565b600085815260156020526040902060090180548390811061229a5761229a613b1a565b9060005260206000200154101580156122e2575060008481526015602052604090206009018054839190839081106122d4576122d4613b1a565b906000526020600020015410155b1561235d57600084815260156020526040902060090180548391908390811061230d5761230d613b1a565b90600052602060002001541415612327576000925061235d565b6000848152601560205260409020600901805491935083918290811061234f5761234f613b1a565b906000526020600020015491505b8061236781613b46565b915050612256565b826123bc576000848152601560205260409020600801805460ff191660029081179091558490600080516020613d52833981519152905b60405190815260200160405180910390a2612990565b60045460008581526015602052604090206002015442916123dd91906129ed565b1015612419576000848152601560205260409020600801805460ff191660049081179091558490600080516020613d52833981519152906123a6565b600084815260156020526040812060088101805460ff191660031790556009015461246190612449906001612c67565b600087815260156020526040902060030154906129d5565b9050612478612471856001612c67565b82906129c2565b9150600061248683836129ed565b9050600160009054906101000a90046001600160a01b03166001600160a01b0316633e7a47b26040518163ffffffff1660e01b8152600401600060405180830381600087803b1580156124d857600080fd5b505af11580156124ec573d6000803e3d6000fd5b505050505b808310156128ec57600086815260156020526040812060030180548590811061251c5761251c613b1a565b6000918252602090912001546001600160a01b0316148015906125765750600086815260156020526040812060040180548590811061255d5761255d613b1a565b906000526020600020018054612572906139e7565b9050115b156128da57600086815260156020526040812060040180548590811061259e5761259e613b1a565b9060005260206000200180546125b3906139e7565b80601f01602080910402602001604051908101604052809291908181526020018280546125df906139e7565b801561262c5780601f106126015761010080835404028352916020019161262c565b820191906000526020600020905b81548152906001019060200180831161260f57829003601f168201915b50505060208084015160015460008d815260159093526040909220600301805495965090946001600160a01b03909216935063eed47033925030918990811061267757612677613b1a565b9060005260206000200160009054906101000a90046001600160a01b031684601560008e81526020019081526020016000206005018a815481106126bd576126bd613b1a565b60009182526020909120015460405160e086901b6001600160e01b031990811682526001600160a01b039586166004830152939094166024850152911660448301526064820152608401600060405180830381600087803b15801561272157600080fd5b505af1925050508015612732575060015b6127845761273e613b61565b806308c379a014156127785750612753613b7d565b8061275e575061277a565b8060405162461bcd60e51b8152600401610b3f91906132dd565b505b3d6000803e3d6000fd5b6017805460ff1916600117905560008881526015602052604081206003018054879081106127b4576127b4613b1a565b60009182526020808320909101548b83526015909152604090912060050180546001600160a01b0390921691889081106127f0576127f0613b1a565b9060005260206000200154601560008c8152602001908152602001600020600401888154811061282257612822613b1a565b906000526020600020016040516128399190613c07565b60006040518083038185875af1925050503d8060008114612876576040519150601f19603f3d011682016040523d82523d6000602084013e61287b565b606091505b50509050806128cc5760405162461bcd60e51b815260206004820181905260248201527f45524332304775696c643a2050726f706f73616c2063616c6c206661696c65646044820152606401610b3f565b50506017805460ff19169055505b826128e481613b46565b9350506124f1565b60015460405163fb0fde8560e01b81523060048201526001600160a01b039091169063fb0fde8590602401602060405180830381600087803b15801561293157600080fd5b505af1158015612945573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906129699190613ca3565b5085600080516020613d52833981519152600360405190815260200160405180910390a250505b600c5461299e906001612c67565b600c5550505050565b6001600160a01b031660009081526012602052604090205490565b60006129ce8284613cc5565b9392505050565b60006129ce8284613cfa565b60006129ce8284613d0e565b60006129ce8284613d22565b60008381526014602090815260408083206001600160a01b038816845282528083206001015486845260159092529091206009018054612a68928492612a629287908110612a4957612a49613b1a565b9060005260206000200154612c6790919063ffffffff16565b906129ed565b6000848152601560205260409020600901805484908110612a8b57612a8b613b1a565b60009182526020808320909101929092558481526014825260408082206001600160a01b0388168352835280822085815560010184905585825260159092522060020154612af1856001600160a01b031660009081526012602052604090206001015490565b1015612b25576000838152601560209081526040808320600201546001600160a01b03881684526012909252909120600101555b604080516001600160a01b038616815260208101839052839185917f583c62f152711bcb1ca6186c1065821ff17a7cbe226dcb559a1c889dcf0d769b910160405180910390a360075415612c3d576000612b96612b8d6008543a612c7390919063ffffffff16565b600754906129c2565b9050804710158015612ba75750333b155b15612c3b57604051600090339083908381818185875af1925050503d8060008114612bee576040519150601f19603f3d011682016040523d82523d6000602084013e612bf3565b606091505b50509050806117935760405162461bcd60e51b81526020600482015260146024820152734661696c656420746f20726566756e642067617360601b6044820152606401610b3f565b505b50505050565b6000806000612c528585612c89565b91509150612c5f81612cf6565b509392505050565b60006129ce8284613d3a565b6000818310612c8257816129ce565b5090919050565b600080825160411415612cc05760208301516040840151606085015160001a612cb487828585612eb4565b94509450505050610d6f565b825160401415612cea5760208301516040840151612cdf868383612fa1565b935093505050610d6f565b50600090506002610d6f565b6000816004811115612d0a57612d0a613752565b1415612d135750565b6001816004811115612d2757612d27613752565b1415612d755760405162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e617475726500000000000000006044820152606401610b3f565b6002816004811115612d8957612d89613752565b1415612dd75760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e677468006044820152606401610b3f565b6003816004811115612deb57612deb613752565b1415612e445760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b6064820152608401610b3f565b6004816004811115612e5857612e58613752565b1415612eb15760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202776272076616c604482015261756560f01b6064820152608401610b3f565b50565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0831115612eeb5750600090506003612f98565b8460ff16601b14158015612f0357508460ff16601c14155b15612f145750600090506004612f98565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015612f68573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116612f9157600060019250925050612f98565b9150600090505b94509492505050565b6000806001600160ff1b03831660ff84901c601b01612fc287828885612eb4565b935093505050935093915050565b828054828255906000526020600020908101928215613025579160200282015b8281111561302557825182546001600160a01b0319166001600160a01b03909116178255602090920191600190910190612ff0565b506130319291506131a9565b5090565b828054828255906000526020600020908101928215613082579160200282015b8281111561308257825180516130729184916020909101906130c9565b5091602001919060010190613055565b506130319291506131be565b828054828255906000526020600020908101928215613025579160200282015b828111156130255782518255916020019190600101906130ae565b8280546130d5906139e7565b90600052602060002090601f0160209004810192826130f75760008555613025565b82601f1061311057805160ff1916838001178555613025565b8280016001018555821561302557918201828111156130255782518255916020019190600101906130ae565b60405180610140016040528060006001600160a01b03168152602001600081526020016000815260200160608152602001606081526020016060815260200160608152602001606081526020016000600481111561319c5761319c613752565b8152602001606081525090565b5b8082111561303157600081556001016131aa565b808211156130315760006131d282826131db565b506001016131be565b5080546131e7906139e7565b6000825580601f106131f7575050565b601f016020900490600052602060002090810190612eb191906131a9565b6020808252825182820181905260009190848201906040850190845b8181101561324d57835183529284019291840191600101613231565b50909695505050505050565b80356001600160a01b038116811461327057600080fd5b919050565b60006020828403121561328757600080fd5b6129ce82613259565b6000815180845260005b818110156132b65760208185018101518683018201520161329a565b818111156132c8576000602083870101525b50601f01601f19169290920160200192915050565b6020815260006129ce6020830184613290565b6000806000806000806000806000806101408b8d03121561331057600080fd5b505088359a60208a01359a5060408a013599606081013599506080810135985060a0810135975060c0810135965060e081013595506101008101359450610120013592509050565b6000806040838503121561336b57600080fd5b8235915061337b60208401613259565b90509250929050565b634e487b7160e01b600052604160045260246000fd5b601f8201601f1916810167ffffffffffffffff811182821017156133c0576133c0613384565b6040525050565b600067ffffffffffffffff8211156133e1576133e1613384565b5060051b60200190565b600082601f8301126133fc57600080fd5b81356020613409826133c7565b604051613416828261339a565b83815260059390931b850182019282810191508684111561343657600080fd5b8286015b848110156134585761344b81613259565b835291830191830161343a565b509695505050505050565b600082601f83011261347457600080fd5b813567ffffffffffffffff81111561348e5761348e613384565b6040516134a5601f8301601f19166020018261339a565b8181528460208386010111156134ba57600080fd5b816020850160208301376000918101602001919091529392505050565b600082601f8301126134e857600080fd5b813560206134f5826133c7565b604051613502828261339a565b83815260059390931b850182019282810191508684111561352257600080fd5b8286015b8481101561345857803567ffffffffffffffff8111156135465760008081fd5b6135548986838b0101613463565b845250918301918301613526565b600082601f83011261357357600080fd5b81356020613580826133c7565b60405161358d828261339a565b83815260059390931b85018201928281019150868411156135ad57600080fd5b8286015b8481101561345857803583529183019183016135b1565b60008060008060008060c087890312156135e157600080fd5b863567ffffffffffffffff808211156135f957600080fd5b6136058a838b016133eb565b9750602089013591508082111561361b57600080fd5b6136278a838b016134d7565b9650604089013591508082111561363d57600080fd5b6136498a838b01613562565b955060608901359450608089013591508082111561366657600080fd5b6136728a838b01613463565b935060a089013591508082111561368857600080fd5b5061369589828a01613463565b9150509295509295509295565b6000806000606084860312156136b757600080fd5b505081359360208301359350604090920135919050565b600080600080600060a086880312156136e657600080fd5b85359450602086013593506040860135925061370460608701613259565b9150608086013567ffffffffffffffff81111561372057600080fd5b61372c88828901613463565b9150509295509295909350565b60006020828403121561374b57600080fd5b5035919050565b634e487b7160e01b600052602160045260246000fd5b6005811061378657634e487b7160e01b600052602160045260246000fd5b9052565b60018060a01b038716815285602082015284604082015260c0606082015260006137b760c0830186613290565b82810360808401526137c98186613290565b9150506137d960a0830184613768565b979650505050505050565b600081518084526020808501945080840160005b8381101561381d5781516001600160a01b0316875295820195908201906001016137f8565b509495945050505050565b600082825180855260208086019550808260051b84010181860160005b8481101561387357601f19868403018952613861838351613290565b98840198925090830190600101613845565b5090979650505050505050565b600081518084526020808501945080840160005b8381101561381d57815187529582019590820190600101613894565b602081526138ca6020820183516001600160a01b03169052565b6020820151604082015260408201516060820152600060608301516101408060808501526138fc6101608501836137e4565b91506080850151601f19808685030160a087015261391a8483613828565b935060a08701519150808685030160c08701526139378483613880565b935060c08701519150808685030160e08701526139548483613290565b935060e087015191506101008187860301818801526139738584613290565b94508088015192505061012061398b81880184613768565b8701518685039091018387015290506139a48382613880565b9695505050505050565b600080600080608085870312156139c457600080fd5b6139cd85613259565b966020860135965060408601359560600135945092505050565b600181811c908216806139fb57607f821691505b60208210811415613a1c57634e487b7160e01b600052602260045260246000fd5b50919050565b6020808252602b908201527f45524332304775696c643a2050726f706f73616c20656e6465642c2063616e6e60408201526a1bdd081899481d9bdd195960aa1b606082015260800190565b60208082526026908201527f45524332304775696c643a20496e76616c696420766f74696e67506f77657220604082015265185b5bdd5b9d60d21b606082015260800190565b60208082526041908201527f45524332304775696c643a2043616e6e6f74206368616e6765206f7074696f6e60408201527f20766f7465642c206f6e6c7920696e63726561736520766f74696e67506f77656060820152603960f91b608082015260a00190565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b6000600019821415613b5a57613b5a613b30565b5060010190565b600060033d1115613b7a5760046000803e5060005160e01c5b90565b600060443d1015613b8b5790565b6040516003193d81016004833e81513d67ffffffffffffffff8160248401118184111715613bbb57505050505090565b8285019150815181811115613bd35750505050505090565b843d8701016020828501011115613bed5750505050505090565b613bfc6020828601018761339a565b509095945050505050565b600080835481600182811c915080831680613c2357607f831692505b6020808410821415613c4357634e487b7160e01b86526022600452602486fd5b818015613c575760018114613c6857613c95565b60ff19861689528489019650613c95565b60008a81526020902060005b86811015613c8d5781548b820152908501908301613c74565b505084890196505b509498975050505050505050565b600060208284031215613cb557600080fd5b815180151581146129ce57600080fd5b6000816000190483118215151615613cdf57613cdf613b30565b500290565b634e487b7160e01b600052601260045260246000fd5b600082613d0957613d09613ce4565b500490565b600082613d1d57613d1d613ce4565b500690565b60008219821115613d3557613d35613b30565b500190565b600082821015613d4c57613d4c613b30565b50039056fefee62a9eec0be50eb061c711990ef0f1e17b40ea131d9347b0468acdaf8bf243a26469706673582212205c0a817d5a43458b18b08c1a73dd1e5bd746594bba80c83e109a6de1686a2e3664736f6c63430008080033',
  deployedBytecode:
    '0x6080604052600436106103255760003560e01c80635bc789d9116101ae578063ae619234116100eb578063e04503531161008f578063f4732da61161006c578063f4732da614610954578063f98606a714610969578063fc0c546a1461097f578063fc4e703f1461099f57005b8063e0450353146108e9578063e158080a146108ff578063f09951981461091557005b8063b7c15f8d116100c8578063b7c15f8d1461088a578063bcc3f3bd1461089f578063c0a4d64d146108bf578063c93e01e3146108d457005b8063ae61923414610835578063b3929aaa1461084a578063b3b470611461086a57005b806389c98c0611610152578063a16fe3421161012f578063a16fe342146107d6578063a78d80fc146107f4578063a7aeb5571461080a578063ad6c1e341461082057005b806389c98c061461078c5780638f180305146107a157806392b71654146107b657005b80636c8b72f61161018b5780636c8b72f6146107125780636e27d8891461072757806377027ff4146107475780638029eff11461075c57005b80635bc789d9146106c75780635e508c2c146106e757806364fe6ed2146106fd57005b80632229a0e21161027c57806332ed5b12116102205780633f10cf15116101fd5780633f10cf1514610650578063430694cf1461066657806354f2f7af1461069357806356891412146106b157005b806332ed5b12146105f25780633bf353fb146106245780633de39c111461063a57005b80632d5b17de116102595780632d5b17de146105395780632d757c3e146105595780632fd99c0014610592578063315a095d146105d257005b80632229a0e2146104e85780632467ef94146104fd57806325c069fc1461051257005b8063130485fe116102e357806317d7de7c116102c057806317d7de7c14610476578063184a0ae91461048b5780631a5007dd146104a157806321df0da7146104b657005b8063130485fe1461041657806313108d741461043657806316bbecde1461045657005b80623a40d01461032757806301a598a61461035257806306fdde031461039b5780630a366a63146103bd5780630d668087146103e0578063123f6d67146103f6575b005b34801561033357600080fd5b5061033c6109b5565b6040516103499190613215565b60405180910390f35b34801561035e57600080fd5b5061038661036d366004613275565b6012602052600090815260409020805460019091015482565b60408051928352602083019190915201610349565b3480156103a757600080fd5b506103b0610a0d565b60405161034991906132dd565b3480156103c957600080fd5b506103d2610a9b565b604051908152602001610349565b3480156103ec57600080fd5b506103d2600d5481565b34801561040257600080fd5b506103256104113660046132f0565b610ac3565b34801561042257600080fd5b50610386610431366004613358565b610d44565b34801561044257600080fd5b506103d26104513660046135c8565b610d76565b34801561046257600080fd5b506103256104713660046136a2565b61132c565b34801561048257600080fd5b506103b0611462565b34801561049757600080fd5b506103d260035481565b3480156104ad57600080fd5b50600a546103d2565b3480156104c257600080fd5b506000546001600160a01b03165b6040516001600160a01b039091168152602001610349565b3480156104f457600080fd5b506016546103d2565b34801561050957600080fd5b50600c546103d2565b34801561051e57600080fd5b50610527600a81565b60405160ff9091168152602001610349565b34801561054557600080fd5b506103256105543660046136ce565b6114eb565b34801561056557600080fd5b506103d2610574366004613275565b6001600160a01b031660009081526012602052604090206001015490565b34801561059e57600080fd5b506105c26105ad366004613739565b60136020526000908152604090205460ff1681565b6040519015158152602001610349565b3480156105de57600080fd5b506103256105ed366004613739565b61179b565b3480156105fe57600080fd5b5061061261060d366004613739565b6119e3565b6040516103499695949392919061378a565b34801561063057600080fd5b506103d2600c5481565b34801561064657600080fd5b506103d260085481565b34801561065c57600080fd5b506103d260045481565b34801561067257600080fd5b50610686610681366004613739565b611b37565b60405161034991906138b0565b34801561069f57600080fd5b506011546001600160a01b03166104d0565b3480156106bd57600080fd5b506103d2600e5481565b3480156106d357600080fd5b506011546104d0906001600160a01b031681565b3480156106f357600080fd5b506103d260055481565b34801561070957600080fd5b506010546103d2565b34801561071e57600080fd5b506007546103d2565b34801561073357600080fd5b50610325610742366004613739565b611ec2565b34801561075357600080fd5b506009546103d2565b34801561076857600080fd5b506105c2610777366004613739565b60009081526013602052604090205460ff1690565b34801561079857600080fd5b506008546103d2565b3480156107ad57600080fd5b50600b546103d2565b3480156107c257600080fd5b506103d26107d13660046139ae565b612042565b3480156107e257600080fd5b506001546001600160a01b03166104d0565b34801561080057600080fd5b506103d2600a5481565b34801561081657600080fd5b506103d2600f5481565b34801561082c57600080fd5b50600f546103d2565b34801561084157600080fd5b506103d2612099565b34801561085657600080fd5b506103d2610865366004613739565b6120b0565b34801561087657600080fd5b50610325610885366004613739565b6120d1565b34801561089657600080fd5b506004546103d2565b3480156108ab57600080fd5b506103d26108ba366004613275565b6129a7565b3480156108cb57600080fd5b50600d546103d2565b3480156108e057600080fd5b506003546103d2565b3480156108f557600080fd5b506103d260095481565b34801561090b57600080fd5b506103d260105481565b34801561092157600080fd5b50610386610930366004613358565b60146020908152600092835260408084209091529082529020805460019091015482565b34801561096057600080fd5b50600e546103d2565b34801561097557600080fd5b506103d260065481565b34801561098b57600080fd5b506000546104d0906001600160a01b031681565b3480156109ab57600080fd5b506103d260075481565b60606016805480602002602001604051908101604052809291908181526020018280548015610a0357602002820191906000526020600020905b8154815260200190600101908083116109ef575b5050505050905090565b60028054610a1a906139e7565b80601f0160208091040260200160405190810160405280929190818152602001828054610a46906139e7565b8015610a935780601f10610a6857610100808354040283529160200191610a93565b820191906000526020600020905b815481529060010190602001808311610a7657829003601f168201915b505050505081565b6000610abe612710610ab8600654610ab2600e5490565b906129c2565b906129d5565b905090565b333014610b485760405162461bcd60e51b815260206004820152604260248201527f45524332304775696c643a204f6e6c792063616c6c61626c652062792045524360448201527f32306775696c6420697473656c66206f72207768656e20696e697469616c697a606482015261195960f21b608482015260a4015b60405180910390fd5b60008a11610bb05760405162461bcd60e51b815260206004820152602f60248201527f45524332304775696c643a2070726f706f73616c2074696d652068617320746f60448201526e0206265206d6f7265207468616e203608c1b6064820152608401610b3f565b89831015610c265760405162461bcd60e51b815260206004820152603e60248201527f45524332304775696c643a206c6f636b54696d652068617320746f206265206860448201527f6967686572206f7220657175616c20746f2070726f706f73616c54696d6500006064820152608401610b3f565b60008811610c9c5760405162461bcd60e51b815260206004820152603c60248201527f45524332304775696c643a20766f74696e6720706f77657220666f722065786560448201527f637574696f6e2068617320746f206265206d6f7265207468616e2030000000006064820152608401610b3f565b6201c908861115610d155760405162461bcd60e51b815260206004820152603960248201527f45524332304775696c643a20766f7465206761732068617320746f206265206560448201527f7175616c206f72206c6f776572207468616e20313137303030000000000000006064820152608401610b3f565b600399909955600497909755600595909555600693909355600791909155600855600955600d55600f55601055565b60008281526014602090815260408083206001600160a01b0385168452909152902080546001909101545b9250929050565b6000601054600e541015610df25760405162461bcd60e51b815260206004820152603960248201527f45524332304775696c643a204e6f7420656e6f75676820746f6b656e73206c6f60448201527f636b656420746f2063726561746520612070726f706f73616c000000000000006064820152608401610b3f565b600f54600b541015610e625760405162461bcd60e51b815260206004820152603360248201527f45524332304775696c643a204e6f7420656e6f756768206d656d6265727320746044820152721bc818dc99585d194818481c1c9bdc1bdcd85b606a1b6064820152608401610b3f565b600954600c5410610ed45760405162461bcd60e51b815260206004820152603660248201527f45524332304775696c643a204d6178696d756d20616d6f756e74206f662061636044820152751d1a5d99481c1c9bdc1bdcd85b1cc81c995858da195960521b6064820152608401610b3f565b610edc610a9b565b610ee5336129a7565b1015610f515760405162461bcd60e51b815260206004820152603560248201527f45524332304775696c643a204e6f7420656e6f75676820766f74696e67506f77604482015274195c881d1bc818dc99585d19481c1c9bdc1bdcd85b605a1b6064820152608401610b3f565b85518751148015610f63575084518751145b610fcc5760405162461bcd60e51b815260206004820152603460248201527f45524332304775696c643a2057726f6e67206c656e677468206f6620746f2c2060448201527364617461206f722076616c75652061727261797360601b6064820152608401610b3f565b60008751116110375760405162461bcd60e51b815260206004820152603160248201527f45524332304775696c643a20746f2c20646174612076616c7565206172726179604482015270732063616e6e6f7420626520656d70747960781b6064820152608401610b3f565b865184111580156110515750845161104f90856129e1565b155b6110c35760405162461bcd60e51b815260206004820152603760248201527f45524332304775696c643a20496e76616c696420746f74616c4f7074696f6e7360448201527f206f72206f7074696f6e2063616c6c73206c656e6774680000000000000000006064820152608401610b3f565b600a84111561113a5760405162461bcd60e51b815260206004820152603a60248201527f45524332304775696c643a204d6178696d756d20616d6f756e74206f66206f7060448201527f74696f6e73207065722070726f706f73616c20726561636865640000000000006064820152608401610b3f565b600a546040516bffffffffffffffffffffffff193360601b166020820152426034820152605481019190915260009060740160405160208183030381529060405280519060200120905061119a6001600a546129ed90919063ffffffff16565b600a55600081815260156020526040902080546001600160a01b0319163317815542600182018190556003546111d091906129ed565b600282015588516111ea90600383019060208c0190612fd0565b50875161120090600483019060208b0190613035565b50865161121690600583019060208a019061308e565b50845161122c90600683019060208801906130c9565b50835161124290600783019060208701906130c9565b5061124e8660016129ed565b67ffffffffffffffff81111561126657611266613384565b60405190808252806020026020018201604052801561128f578160200160208202803683370190505b5080516112a691600984019160209091019061308e565b5060088101805460ff19166001908117909155600c546112c5916129ed565b600c5581600080516020613d52833981519152600160405190815260200160405180910390a250601680546001810182556000919091527fd833147d7dc355ba459fc788f669e58cfaf9dc25ddcd0702e87d69c7b512428901819055979650505050505050565b600083815260156020526040902060020154421061135c5760405162461bcd60e51b8152600401610b3f90613a22565b80611366336129a7565b1015801561138f5750600083815260146020908152604080832033845290915290206001015481115b6113ab5760405162461bcd60e51b8152600401610b3f90613a6d565b60008381526014602090815260408083203384529091529020541580156113ec57506000838152601460209081526040808320338452909152902060010154155b8061143557506000838152601460209081526040808320338452909152902054821480156114355750600083815260146020908152604080832033845290915290206001015481115b6114515760405162461bcd60e51b8152600401610b3f90613ab3565b61145d338484846129f9565b505050565b606060028054611471906139e7565b80601f016020809104026020016040519081016040528092919081815260200182805461149d906139e7565b8015610a035780601f106114bf57610100808354040283529160200191610a03565b820191906000526020600020905b8154815290600101906020018083116114cd57509395945050505050565b600085815260156020526040902060020154421061151b5760405162461bcd60e51b8152600401610b3f90613a22565b600061152983878787612042565b60008181526013602052604090205490915060ff161561158b5760405162461bcd60e51b815260206004820152601960248201527f45524332304775696c643a20416c726561647920766f746564000000000000006044820152606401610b3f565b6115ec826115e6836040517f19457468657265756d205369676e6564204d6573736167653a0a3332000000006020820152603c8101829052600090605c01604051602081830303815290604052805190602001209050919050565b90612c43565b6001600160a01b0316836001600160a01b03161461164c5760405162461bcd60e51b815260206004820152601860248201527f45524332304775696c643a2057726f6e67207369676e657200000000000000006044820152606401610b3f565b6000818152601360205260409020805460ff191660011790558361166f846129a7565b101580156116a1575060008681526014602090815260408083206001600160a01b038716845290915290206001015484115b6116bd5760405162461bcd60e51b8152600401610b3f90613a6d565b60008681526014602090815260408083206001600160a01b0387168452909152902054158015611710575060008681526014602090815260408083206001600160a01b0387168452909152902060010154155b8061176b575060008681526014602090815260408083206001600160a01b03871684529091529020548514801561176b575060008681526014602090815260408083206001600160a01b038716845290915290206001015484115b6117875760405162461bcd60e51b8152600401610b3f90613ab3565b611793838787876129f9565b505050505050565b806117a5336129a7565b10156118125760405162461bcd60e51b815260206004820152603660248201527f45524332304775696c643a20556e61626c6520746f207769746864726177206d6044820152751bdc99481d1bdad95b9cc81d1a185b881b1bd8dad95960521b6064820152608401610b3f565b3360009081526012602052604090206001015442116118735760405162461bcd60e51b815260206004820152601f60248201527f45524332304775696c643a20546f6b656e73207374696c6c206c6f636b6564006044820152606401610b3f565b600081116118e95760405162461bcd60e51b815260206004820152603f60248201527f45524332304775696c643a20616d6f756e74206f6620746f6b656e7320746f2060448201527f7769746864726177206d7573742062652067726561746572207468616e2030006064820152608401610b3f565b336000908152601260205260409020546119039082612c67565b33600090815260126020526040902055600e546119209082612c67565b600e5560115460405163f3fef3a360e01b8152336004820152602481018390526001600160a01b039091169063f3fef3a390604401600060405180830381600087803b15801561196f57600080fd5b505af1158015611983573d6000803e3d6000fd5b50505050611990336129a7565b6119a657600b546119a2906001612c67565b600b555b60408051338152602081018390527f6352c5382c4a4578e712449ca65e83cdb392d045dfcf1cad9615189db2da244b91015b60405180910390a150565b60156020526000908152604090208054600182015460028301546006840180546001600160a01b03909416949293919291611a1d906139e7565b80601f0160208091040260200160405190810160405280929190818152602001828054611a49906139e7565b8015611a965780601f10611a6b57610100808354040283529160200191611a96565b820191906000526020600020905b815481529060010190602001808311611a7957829003601f168201915b505050505090806007018054611aab906139e7565b80601f0160208091040260200160405190810160405280929190818152602001828054611ad7906139e7565b8015611b245780601f10611af957610100808354040283529160200191611b24565b820191906000526020600020905b815481529060010190602001808311611b0757829003601f168201915b5050506008909301549192505060ff1686565b611b3f61313c565b60008281526015602090815260409182902082516101408101845281546001600160a01b031681526001820154818401526002820154818501526003820180548551818602810186019096528086529194929360608601939290830182828015611bd257602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311611bb4575b5050505050815260200160048201805480602002602001604051908101604052809291908181526020016000905b82821015611cac578382906000526020600020018054611c1f906139e7565b80601f0160208091040260200160405190810160405280929190818152602001828054611c4b906139e7565b8015611c985780601f10611c6d57610100808354040283529160200191611c98565b820191906000526020600020905b815481529060010190602001808311611c7b57829003601f168201915b505050505081526020019060010190611c00565b50505050815260200160058201805480602002602001604051908101604052809291908181526020018280548015611d0357602002820191906000526020600020905b815481526020019060010190808311611cef575b50505050508152602001600682018054611d1c906139e7565b80601f0160208091040260200160405190810160405280929190818152602001828054611d48906139e7565b8015611d955780601f10611d6a57610100808354040283529160200191611d95565b820191906000526020600020905b815481529060010190602001808311611d7857829003601f168201915b50505050508152602001600782018054611dae906139e7565b80601f0160208091040260200160405190810160405280929190818152602001828054611dda906139e7565b8015611e275780601f10611dfc57610100808354040283529160200191611e27565b820191906000526020600020905b815481529060010190602001808311611e0a57829003601f168201915b5050509183525050600882015460209091019060ff166004811115611e4e57611e4e613752565b6004811115611e5f57611e5f613752565b815260200160098201805480602002602001604051908101604052809291908181526020018280548015611eb257602002820191906000526020600020905b815481526020019060010190808311611e9e575b5050505050815250509050919050565b60008111611f2d5760405162461bcd60e51b815260206004820152603260248201527f45524332304775696c643a20546f6b656e7320746f206c6f636b2073686f756c60448201527106420626520686967686572207468616e20360741b6064820152608401610b3f565b611f36336129a7565b611f4c57600b54611f489060016129ed565b600b555b6011546040516311f9fbc960e21b8152336004820152602481018390526001600160a01b03909116906347e7ef2490604401600060405180830381600087803b158015611f9857600080fd5b505af1158015611fac573d6000803e3d6000fd5b505033600090815260126020526040902054611fcb92509050826129ed565b33600090815260126020526040902055600d54611fe99042906129ed565b33600090815260126020526040902060010155600e5461200990826129ed565b600e5560408051338152602081018390527fac87f20a77d28ee8bbb58ec87ea8fa968b3393efae1a368fd50b767c2847391c91016119d8565b6040516bffffffffffffffffffffffff19606086901b166020820152603481018490526054810183905260748101829052600090609401604051602081830303815290604052805190602001209050949350505050565b6000610abe612710610ab8600554610ab2600e5490565b601681815481106120c057600080fd5b600091825260209091200154905081565b60175460ff16156121305760405162461bcd60e51b8152602060048201526024808201527f45524332304775696c643a2050726f706f73616c20756e6465722065786563756044820152633a34b7b760e11b6064820152608401610b3f565b600160008281526015602052604090206008015460ff16600481111561215857612158613752565b146121b35760405162461bcd60e51b815260206004820152602560248201527f45524332304775696c643a2050726f706f73616c20616c72656164792065786560448201526418dd5d195960da1b6064820152608401610b3f565b60008181526015602052604090206002015442116122215760405162461bcd60e51b815260206004820152602560248201527f45524332304775696c643a2050726f706f73616c206861736e277420656e646560448201526419081e595d60da1b6064820152608401610b3f565b60008181526015602052604081206009018054829190829061224557612245613b1a565b600091825260209091200154905060015b60008481526015602052604090206009015481101561236f57612277612099565b600085815260156020526040902060090180548390811061229a5761229a613b1a565b9060005260206000200154101580156122e2575060008481526015602052604090206009018054839190839081106122d4576122d4613b1a565b906000526020600020015410155b1561235d57600084815260156020526040902060090180548391908390811061230d5761230d613b1a565b90600052602060002001541415612327576000925061235d565b6000848152601560205260409020600901805491935083918290811061234f5761234f613b1a565b906000526020600020015491505b8061236781613b46565b915050612256565b826123bc576000848152601560205260409020600801805460ff191660029081179091558490600080516020613d52833981519152905b60405190815260200160405180910390a2612990565b60045460008581526015602052604090206002015442916123dd91906129ed565b1015612419576000848152601560205260409020600801805460ff191660049081179091558490600080516020613d52833981519152906123a6565b600084815260156020526040812060088101805460ff191660031790556009015461246190612449906001612c67565b600087815260156020526040902060030154906129d5565b9050612478612471856001612c67565b82906129c2565b9150600061248683836129ed565b9050600160009054906101000a90046001600160a01b03166001600160a01b0316633e7a47b26040518163ffffffff1660e01b8152600401600060405180830381600087803b1580156124d857600080fd5b505af11580156124ec573d6000803e3d6000fd5b505050505b808310156128ec57600086815260156020526040812060030180548590811061251c5761251c613b1a565b6000918252602090912001546001600160a01b0316148015906125765750600086815260156020526040812060040180548590811061255d5761255d613b1a565b906000526020600020018054612572906139e7565b9050115b156128da57600086815260156020526040812060040180548590811061259e5761259e613b1a565b9060005260206000200180546125b3906139e7565b80601f01602080910402602001604051908101604052809291908181526020018280546125df906139e7565b801561262c5780601f106126015761010080835404028352916020019161262c565b820191906000526020600020905b81548152906001019060200180831161260f57829003601f168201915b50505060208084015160015460008d815260159093526040909220600301805495965090946001600160a01b03909216935063eed47033925030918990811061267757612677613b1a565b9060005260206000200160009054906101000a90046001600160a01b031684601560008e81526020019081526020016000206005018a815481106126bd576126bd613b1a565b60009182526020909120015460405160e086901b6001600160e01b031990811682526001600160a01b039586166004830152939094166024850152911660448301526064820152608401600060405180830381600087803b15801561272157600080fd5b505af1925050508015612732575060015b6127845761273e613b61565b806308c379a014156127785750612753613b7d565b8061275e575061277a565b8060405162461bcd60e51b8152600401610b3f91906132dd565b505b3d6000803e3d6000fd5b6017805460ff1916600117905560008881526015602052604081206003018054879081106127b4576127b4613b1a565b60009182526020808320909101548b83526015909152604090912060050180546001600160a01b0390921691889081106127f0576127f0613b1a565b9060005260206000200154601560008c8152602001908152602001600020600401888154811061282257612822613b1a565b906000526020600020016040516128399190613c07565b60006040518083038185875af1925050503d8060008114612876576040519150601f19603f3d011682016040523d82523d6000602084013e61287b565b606091505b50509050806128cc5760405162461bcd60e51b815260206004820181905260248201527f45524332304775696c643a2050726f706f73616c2063616c6c206661696c65646044820152606401610b3f565b50506017805460ff19169055505b826128e481613b46565b9350506124f1565b60015460405163fb0fde8560e01b81523060048201526001600160a01b039091169063fb0fde8590602401602060405180830381600087803b15801561293157600080fd5b505af1158015612945573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906129699190613ca3565b5085600080516020613d52833981519152600360405190815260200160405180910390a250505b600c5461299e906001612c67565b600c5550505050565b6001600160a01b031660009081526012602052604090205490565b60006129ce8284613cc5565b9392505050565b60006129ce8284613cfa565b60006129ce8284613d0e565b60006129ce8284613d22565b60008381526014602090815260408083206001600160a01b038816845282528083206001015486845260159092529091206009018054612a68928492612a629287908110612a4957612a49613b1a565b9060005260206000200154612c6790919063ffffffff16565b906129ed565b6000848152601560205260409020600901805484908110612a8b57612a8b613b1a565b60009182526020808320909101929092558481526014825260408082206001600160a01b0388168352835280822085815560010184905585825260159092522060020154612af1856001600160a01b031660009081526012602052604090206001015490565b1015612b25576000838152601560209081526040808320600201546001600160a01b03881684526012909252909120600101555b604080516001600160a01b038616815260208101839052839185917f583c62f152711bcb1ca6186c1065821ff17a7cbe226dcb559a1c889dcf0d769b910160405180910390a360075415612c3d576000612b96612b8d6008543a612c7390919063ffffffff16565b600754906129c2565b9050804710158015612ba75750333b155b15612c3b57604051600090339083908381818185875af1925050503d8060008114612bee576040519150601f19603f3d011682016040523d82523d6000602084013e612bf3565b606091505b50509050806117935760405162461bcd60e51b81526020600482015260146024820152734661696c656420746f20726566756e642067617360601b6044820152606401610b3f565b505b50505050565b6000806000612c528585612c89565b91509150612c5f81612cf6565b509392505050565b60006129ce8284613d3a565b6000818310612c8257816129ce565b5090919050565b600080825160411415612cc05760208301516040840151606085015160001a612cb487828585612eb4565b94509450505050610d6f565b825160401415612cea5760208301516040840151612cdf868383612fa1565b935093505050610d6f565b50600090506002610d6f565b6000816004811115612d0a57612d0a613752565b1415612d135750565b6001816004811115612d2757612d27613752565b1415612d755760405162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e617475726500000000000000006044820152606401610b3f565b6002816004811115612d8957612d89613752565b1415612dd75760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e677468006044820152606401610b3f565b6003816004811115612deb57612deb613752565b1415612e445760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b6064820152608401610b3f565b6004816004811115612e5857612e58613752565b1415612eb15760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202776272076616c604482015261756560f01b6064820152608401610b3f565b50565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0831115612eeb5750600090506003612f98565b8460ff16601b14158015612f0357508460ff16601c14155b15612f145750600090506004612f98565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015612f68573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116612f9157600060019250925050612f98565b9150600090505b94509492505050565b6000806001600160ff1b03831660ff84901c601b01612fc287828885612eb4565b935093505050935093915050565b828054828255906000526020600020908101928215613025579160200282015b8281111561302557825182546001600160a01b0319166001600160a01b03909116178255602090920191600190910190612ff0565b506130319291506131a9565b5090565b828054828255906000526020600020908101928215613082579160200282015b8281111561308257825180516130729184916020909101906130c9565b5091602001919060010190613055565b506130319291506131be565b828054828255906000526020600020908101928215613025579160200282015b828111156130255782518255916020019190600101906130ae565b8280546130d5906139e7565b90600052602060002090601f0160209004810192826130f75760008555613025565b82601f1061311057805160ff1916838001178555613025565b8280016001018555821561302557918201828111156130255782518255916020019190600101906130ae565b60405180610140016040528060006001600160a01b03168152602001600081526020016000815260200160608152602001606081526020016060815260200160608152602001606081526020016000600481111561319c5761319c613752565b8152602001606081525090565b5b8082111561303157600081556001016131aa565b808211156130315760006131d282826131db565b506001016131be565b5080546131e7906139e7565b6000825580601f106131f7575050565b601f016020900490600052602060002090810190612eb191906131a9565b6020808252825182820181905260009190848201906040850190845b8181101561324d57835183529284019291840191600101613231565b50909695505050505050565b80356001600160a01b038116811461327057600080fd5b919050565b60006020828403121561328757600080fd5b6129ce82613259565b6000815180845260005b818110156132b65760208185018101518683018201520161329a565b818111156132c8576000602083870101525b50601f01601f19169290920160200192915050565b6020815260006129ce6020830184613290565b6000806000806000806000806000806101408b8d03121561331057600080fd5b505088359a60208a01359a5060408a013599606081013599506080810135985060a0810135975060c0810135965060e081013595506101008101359450610120013592509050565b6000806040838503121561336b57600080fd5b8235915061337b60208401613259565b90509250929050565b634e487b7160e01b600052604160045260246000fd5b601f8201601f1916810167ffffffffffffffff811182821017156133c0576133c0613384565b6040525050565b600067ffffffffffffffff8211156133e1576133e1613384565b5060051b60200190565b600082601f8301126133fc57600080fd5b81356020613409826133c7565b604051613416828261339a565b83815260059390931b850182019282810191508684111561343657600080fd5b8286015b848110156134585761344b81613259565b835291830191830161343a565b509695505050505050565b600082601f83011261347457600080fd5b813567ffffffffffffffff81111561348e5761348e613384565b6040516134a5601f8301601f19166020018261339a565b8181528460208386010111156134ba57600080fd5b816020850160208301376000918101602001919091529392505050565b600082601f8301126134e857600080fd5b813560206134f5826133c7565b604051613502828261339a565b83815260059390931b850182019282810191508684111561352257600080fd5b8286015b8481101561345857803567ffffffffffffffff8111156135465760008081fd5b6135548986838b0101613463565b845250918301918301613526565b600082601f83011261357357600080fd5b81356020613580826133c7565b60405161358d828261339a565b83815260059390931b85018201928281019150868411156135ad57600080fd5b8286015b8481101561345857803583529183019183016135b1565b60008060008060008060c087890312156135e157600080fd5b863567ffffffffffffffff808211156135f957600080fd5b6136058a838b016133eb565b9750602089013591508082111561361b57600080fd5b6136278a838b016134d7565b9650604089013591508082111561363d57600080fd5b6136498a838b01613562565b955060608901359450608089013591508082111561366657600080fd5b6136728a838b01613463565b935060a089013591508082111561368857600080fd5b5061369589828a01613463565b9150509295509295509295565b6000806000606084860312156136b757600080fd5b505081359360208301359350604090920135919050565b600080600080600060a086880312156136e657600080fd5b85359450602086013593506040860135925061370460608701613259565b9150608086013567ffffffffffffffff81111561372057600080fd5b61372c88828901613463565b9150509295509295909350565b60006020828403121561374b57600080fd5b5035919050565b634e487b7160e01b600052602160045260246000fd5b6005811061378657634e487b7160e01b600052602160045260246000fd5b9052565b60018060a01b038716815285602082015284604082015260c0606082015260006137b760c0830186613290565b82810360808401526137c98186613290565b9150506137d960a0830184613768565b979650505050505050565b600081518084526020808501945080840160005b8381101561381d5781516001600160a01b0316875295820195908201906001016137f8565b509495945050505050565b600082825180855260208086019550808260051b84010181860160005b8481101561387357601f19868403018952613861838351613290565b98840198925090830190600101613845565b5090979650505050505050565b600081518084526020808501945080840160005b8381101561381d57815187529582019590820190600101613894565b602081526138ca6020820183516001600160a01b03169052565b6020820151604082015260408201516060820152600060608301516101408060808501526138fc6101608501836137e4565b91506080850151601f19808685030160a087015261391a8483613828565b935060a08701519150808685030160c08701526139378483613880565b935060c08701519150808685030160e08701526139548483613290565b935060e087015191506101008187860301818801526139738584613290565b94508088015192505061012061398b81880184613768565b8701518685039091018387015290506139a48382613880565b9695505050505050565b600080600080608085870312156139c457600080fd5b6139cd85613259565b966020860135965060408601359560600135945092505050565b600181811c908216806139fb57607f821691505b60208210811415613a1c57634e487b7160e01b600052602260045260246000fd5b50919050565b6020808252602b908201527f45524332304775696c643a2050726f706f73616c20656e6465642c2063616e6e60408201526a1bdd081899481d9bdd195960aa1b606082015260800190565b60208082526026908201527f45524332304775696c643a20496e76616c696420766f74696e67506f77657220604082015265185b5bdd5b9d60d21b606082015260800190565b60208082526041908201527f45524332304775696c643a2043616e6e6f74206368616e6765206f7074696f6e60408201527f20766f7465642c206f6e6c7920696e63726561736520766f74696e67506f77656060820152603960f91b608082015260a00190565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b6000600019821415613b5a57613b5a613b30565b5060010190565b600060033d1115613b7a5760046000803e5060005160e01c5b90565b600060443d1015613b8b5790565b6040516003193d81016004833e81513d67ffffffffffffffff8160248401118184111715613bbb57505050505090565b8285019150815181811115613bd35750505050505090565b843d8701016020828501011115613bed5750505050505090565b613bfc6020828601018761339a565b509095945050505050565b600080835481600182811c915080831680613c2357607f831692505b6020808410821415613c4357634e487b7160e01b86526022600452602486fd5b818015613c575760018114613c6857613c95565b60ff19861689528489019650613c95565b60008a81526020902060005b86811015613c8d5781548b820152908501908301613c74565b505084890196505b509498975050505050505050565b600060208284031215613cb557600080fd5b815180151581146129ce57600080fd5b6000816000190483118215151615613cdf57613cdf613b30565b500290565b634e487b7160e01b600052601260045260246000fd5b600082613d0957613d09613ce4565b500490565b600082613d1d57613d1d613ce4565b500690565b60008219821115613d3557613d35613b30565b500190565b600082821015613d4c57613d4c613b30565b50039056fefee62a9eec0be50eb061c711990ef0f1e17b40ea131d9347b0468acdaf8bf243a26469706673582212205c0a817d5a43458b18b08c1a73dd1e5bd746594bba80c83e109a6de1686a2e3664736f6c63430008080033',
  linkReferences: {},
  deployedLinkReferences: {},
};
