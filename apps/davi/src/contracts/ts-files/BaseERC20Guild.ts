export const BaseERC20Guild = {
  _format: 'hh-sol-artifact-1',
  contractName: 'BaseERC20Guild',
  sourceName: 'contracts/erc20guild/BaseERC20Guild.sol',
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
        {
          internalType: 'address',
          name: '',
          type: 'address',
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
    '0x608060405234801561001057600080fd5b50613d85806100206000396000f3fe6080604052600436106103255760003560e01c80635bc789d9116101ae578063ae619234116100eb578063e04503531161008f578063f4732da61161006c578063f4732da614610954578063f98606a714610969578063fc0c546a1461097f578063fc4e703f1461099f57005b8063e0450353146108e9578063e158080a146108ff578063f09951981461091557005b8063b7c15f8d116100c8578063b7c15f8d1461088a578063bcc3f3bd1461089f578063c0a4d64d146108bf578063c93e01e3146108d457005b8063ae61923414610835578063b3929aaa1461084a578063b3b470611461086a57005b806389c98c0611610152578063a16fe3421161012f578063a16fe342146107d6578063a78d80fc146107f4578063a7aeb5571461080a578063ad6c1e341461082057005b806389c98c061461078c5780638f180305146107a157806392b71654146107b657005b80636c8b72f61161018b5780636c8b72f6146107125780636e27d8891461072757806377027ff4146107475780638029eff11461075c57005b80635bc789d9146106c75780635e508c2c146106e757806364fe6ed2146106fd57005b80632229a0e21161027c57806332ed5b12116102205780633f10cf15116101fd5780633f10cf1514610650578063430694cf1461066657806354f2f7af1461069357806356891412146106b157005b806332ed5b12146105f25780633bf353fb146106245780633de39c111461063a57005b80632d5b17de116102595780632d5b17de146105395780632d757c3e146105595780632fd99c0014610592578063315a095d146105d257005b80632229a0e2146104e85780632467ef94146104fd57806325c069fc1461051257005b8063130485fe116102e357806317d7de7c116102c057806317d7de7c14610476578063184a0ae91461048b5780631a5007dd146104a157806321df0da7146104b657005b8063130485fe1461041657806313108d741461043657806316bbecde1461045657005b80623a40d01461032757806301a598a61461035257806306fdde031461039b5780630a366a63146103bd5780630d668087146103e0578063123f6d67146103f6575b005b34801561033357600080fd5b5061033c6109b5565b6040516103499190613131565b60405180910390f35b34801561035e57600080fd5b5061038661036d366004613191565b6012602052600090815260409020805460019091015482565b60408051928352602083019190915201610349565b3480156103a757600080fd5b506103b0610a0d565b60405161034991906131f2565b3480156103c957600080fd5b506103d2610a9b565b604051908152602001610349565b3480156103ec57600080fd5b506103d2600d5481565b34801561040257600080fd5b50610325610411366004613205565b610ac5565b34801561042257600080fd5b5061038661043136600461326d565b610d46565b34801561044257600080fd5b506103d26104513660046134dd565b610d78565b34801561046257600080fd5b506103256104713660046135b7565b611319565b34801561048257600080fd5b506103b061144f565b34801561049757600080fd5b506103d260035481565b3480156104ad57600080fd5b50600a546103d2565b3480156104c257600080fd5b506000546001600160a01b03165b6040516001600160a01b039091168152602001610349565b3480156104f457600080fd5b506016546103d2565b34801561050957600080fd5b50600c546103d2565b34801561051e57600080fd5b50610527600a81565b60405160ff9091168152602001610349565b34801561054557600080fd5b506103256105543660046135e3565b6114d8565b34801561056557600080fd5b506103d2610574366004613191565b6001600160a01b031660009081526012602052604090206001015490565b34801561059e57600080fd5b506105c26105ad36600461364e565b60136020526000908152604090205460ff1681565b6040519015158152602001610349565b3480156105de57600080fd5b506103256105ed36600461364e565b611788565b3480156105fe57600080fd5b5061061261060d36600461364e565b6119d6565b6040516103499695949392919061369f565b34801561063057600080fd5b506103d2600c5481565b34801561064657600080fd5b506103d260085481565b34801561065c57600080fd5b506103d260045481565b34801561067257600080fd5b5061068661068136600461364e565b611b2a565b60405161034991906137c2565b34801561069f57600080fd5b506011546001600160a01b03166104d0565b3480156106bd57600080fd5b506103d2600e5481565b3480156106d357600080fd5b506011546104d0906001600160a01b031681565b3480156106f357600080fd5b506103d260055481565b34801561070957600080fd5b506010546103d2565b34801561071e57600080fd5b506007546103d2565b34801561073357600080fd5b5061032561074236600461364e565b611eb5565b34801561075357600080fd5b506009546103d2565b34801561076857600080fd5b506105c261077736600461364e565b60009081526013602052604090205460ff1690565b34801561079857600080fd5b506008546103d2565b3480156107ad57600080fd5b50600b546103d2565b3480156107c257600080fd5b506103d26107d13660046138c0565b612038565b3480156107e257600080fd5b506001546001600160a01b03166104d0565b34801561080057600080fd5b506103d2600a5481565b34801561081657600080fd5b506103d2600f5481565b34801561082c57600080fd5b50600f546103d2565b34801561084157600080fd5b506103d261208f565b34801561085657600080fd5b506103d261086536600461364e565b6120a0565b34801561087657600080fd5b5061032561088536600461364e565b6120c1565b34801561089657600080fd5b506004546103d2565b3480156108ab57600080fd5b506103d26108ba366004613191565b612988565b3480156108cb57600080fd5b50600d546103d2565b3480156108e057600080fd5b506003546103d2565b3480156108f557600080fd5b506103d260095481565b34801561090b57600080fd5b506103d260105481565b34801561092157600080fd5b5061038661093036600461326d565b60146020908152600092835260408084209091529082529020805460019091015482565b34801561096057600080fd5b50600e546103d2565b34801561097557600080fd5b506103d260065481565b34801561098b57600080fd5b506000546104d0906001600160a01b031681565b3480156109ab57600080fd5b506103d260075481565b60606016805480602002602001604051908101604052809291908181526020018280548015610a0357602002820191906000526020600020905b8154815260200190600101908083116109ef575b5050505050905090565b60028054610a1a906138f9565b80601f0160208091040260200160405190810160405280929190818152602001828054610a46906138f9565b8015610a935780601f10610a6857610100808354040283529160200191610a93565b820191906000526020600020905b815481529060010190602001808311610a7657829003601f168201915b505050505081565b6000612710600654610aac600e5490565b610ab69190613949565b610ac09190613976565b905090565b333014610b4a5760405162461bcd60e51b815260206004820152604260248201527f45524332304775696c643a204f6e6c792063616c6c61626c652062792045524360448201527f32306775696c6420697473656c66206f72207768656e20696e697469616c697a606482015261195960f21b608482015260a4015b60405180910390fd5b60008a11610bb25760405162461bcd60e51b815260206004820152602f60248201527f45524332304775696c643a2070726f706f73616c2074696d652068617320746f60448201526e0206265206d6f7265207468616e203608c1b6064820152608401610b41565b89831015610c285760405162461bcd60e51b815260206004820152603e60248201527f45524332304775696c643a206c6f636b54696d652068617320746f206265206860448201527f6967686572206f7220657175616c20746f2070726f706f73616c54696d6500006064820152608401610b41565b60008811610c9e5760405162461bcd60e51b815260206004820152603c60248201527f45524332304775696c643a20766f74696e6720706f77657220666f722065786560448201527f637574696f6e2068617320746f206265206d6f7265207468616e2030000000006064820152608401610b41565b6201c908861115610d175760405162461bcd60e51b815260206004820152603960248201527f45524332304775696c643a20766f7465206761732068617320746f206265206560448201527f7175616c206f72206c6f776572207468616e20313137303030000000000000006064820152608401610b41565b600399909955600497909755600595909555600693909355600791909155600855600955600d55600f55601055565b60008281526014602090815260408083206001600160a01b0385168452909152902080546001909101545b9250929050565b6000601054600e541015610df45760405162461bcd60e51b815260206004820152603960248201527f45524332304775696c643a204e6f7420656e6f75676820746f6b656e73206c6f60448201527f636b656420746f2063726561746520612070726f706f73616c000000000000006064820152608401610b41565b600f54600b541015610e645760405162461bcd60e51b815260206004820152603360248201527f45524332304775696c643a204e6f7420656e6f756768206d656d6265727320746044820152721bc818dc99585d194818481c1c9bdc1bdcd85b606a1b6064820152608401610b41565b600954600c5410610ed65760405162461bcd60e51b815260206004820152603660248201527f45524332304775696c643a204d6178696d756d20616d6f756e74206f662061636044820152751d1a5d99481c1c9bdc1bdcd85b1cc81c995858da195960521b6064820152608401610b41565b610ede610a9b565b610ee733612988565b1015610f535760405162461bcd60e51b815260206004820152603560248201527f45524332304775696c643a204e6f7420656e6f75676820766f74696e67506f77604482015274195c881d1bc818dc99585d19481c1c9bdc1bdcd85b605a1b6064820152608401610b41565b85518751148015610f65575084518751145b610fce5760405162461bcd60e51b815260206004820152603460248201527f45524332304775696c643a2057726f6e67206c656e677468206f6620746f2c2060448201527364617461206f722076616c75652061727261797360601b6064820152608401610b41565b60008751116110395760405162461bcd60e51b815260206004820152603160248201527f45524332304775696c643a20746f2c20646174612076616c7565206172726179604482015270732063616e6e6f7420626520656d70747960781b6064820152608401610b41565b865184111580156110545750838551611052919061398a565b155b6110c65760405162461bcd60e51b815260206004820152603760248201527f45524332304775696c643a20496e76616c696420746f74616c4f7074696f6e7360448201527f206f72206f7074696f6e2063616c6c73206c656e6774680000000000000000006064820152608401610b41565b600a84111561113d5760405162461bcd60e51b815260206004820152603a60248201527f45524332304775696c643a204d6178696d756d20616d6f756e74206f66206f7060448201527f74696f6e73207065722070726f706f73616c20726561636865640000000000006064820152608401610b41565b600a546040516bffffffffffffffffffffffff193360601b1660208201524260348201526054810191909152600090607401604051602081830303815290604052805190602001209050600a546001611196919061399e565b600a55600081815260156020526040902080546001600160a01b0319163317815542600182018190556003546111cb9161399e565b600282015588516111e590600383019060208c0190612f66565b5087516111fb90600483019060208b0190612fcb565b50865161121190600583019060208a019061301d565b506006810161122086826139f7565b506007810161122f85826139f7565b5061123b86600161399e565b67ffffffffffffffff81111561125357611253613299565b60405190808252806020026020018201604052801561127c578160200160208202803683370190505b50805161129391600984019160209091019061301d565b5060088101805460ff19166001908117909155600c546112b29161399e565b600c5581600080516020613d30833981519152600160405190815260200160405180910390a250601680546001810182556000919091527fd833147d7dc355ba459fc788f669e58cfaf9dc25ddcd0702e87d69c7b512428901819055979650505050505050565b60008381526015602052604090206002015442106113495760405162461bcd60e51b8152600401610b4190613ab7565b8061135333612988565b1015801561137c5750600083815260146020908152604080832033845290915290206001015481115b6113985760405162461bcd60e51b8152600401610b4190613b02565b60008381526014602090815260408083203384529091529020541580156113d957506000838152601460209081526040808320338452909152902060010154155b8061142257506000838152601460209081526040808320338452909152902054821480156114225750600083815260146020908152604080832033845290915290206001015481115b61143e5760405162461bcd60e51b8152600401610b4190613b48565b61144a338484846129a3565b505050565b60606002805461145e906138f9565b80601f016020809104026020016040519081016040528092919081815260200182805461148a906138f9565b8015610a035780601f106114ac57610100808354040283529160200191610a03565b820191906000526020600020905b8154815290600101906020018083116114ba57509395945050505050565b60008581526015602052604090206002015442106115085760405162461bcd60e51b8152600401610b4190613ab7565b600061151683878787612038565b60008181526013602052604090205490915060ff16156115785760405162461bcd60e51b815260206004820152601960248201527f45524332304775696c643a20416c726561647920766f746564000000000000006044820152606401610b41565b6115d9826115d3836040517f19457468657265756d205369676e6564204d6573736167653a0a3332000000006020820152603c8101829052600090605c01604051602081830303815290604052805190602001209050919050565b90612be8565b6001600160a01b0316836001600160a01b0316146116395760405162461bcd60e51b815260206004820152601860248201527f45524332304775696c643a2057726f6e67207369676e657200000000000000006044820152606401610b41565b6000818152601360205260409020805460ff191660011790558361165c84612988565b1015801561168e575060008681526014602090815260408083206001600160a01b038716845290915290206001015484115b6116aa5760405162461bcd60e51b8152600401610b4190613b02565b60008681526014602090815260408083206001600160a01b03871684529091529020541580156116fd575060008681526014602090815260408083206001600160a01b0387168452909152902060010154155b80611758575060008681526014602090815260408083206001600160a01b038716845290915290205485148015611758575060008681526014602090815260408083206001600160a01b038716845290915290206001015484115b6117745760405162461bcd60e51b8152600401610b4190613b48565b611780838787876129a3565b505050505050565b8061179233612988565b10156117ff5760405162461bcd60e51b815260206004820152603660248201527f45524332304775696c643a20556e61626c6520746f207769746864726177206d6044820152751bdc99481d1bdad95b9cc81d1a185b881b1bd8dad95960521b6064820152608401610b41565b3360009081526012602052604090206001015442116118605760405162461bcd60e51b815260206004820152601f60248201527f45524332304775696c643a20546f6b656e73207374696c6c206c6f636b6564006044820152606401610b41565b600081116118d65760405162461bcd60e51b815260206004820152603f60248201527f45524332304775696c643a20616d6f756e74206f6620746f6b656e7320746f2060448201527f7769746864726177206d7573742062652067726561746572207468616e2030006064820152608401610b41565b336000908152601260205260409020546118f1908290613baf565b33600090815260126020526040902055600e5461190f908290613baf565b600e5560115460405163f3fef3a360e01b8152336004820152602481018390526001600160a01b039091169063f3fef3a390604401600060405180830381600087803b15801561195e57600080fd5b505af1158015611972573d6000803e3d6000fd5b5050505061197f33612988565b600003611999576001600b546119959190613baf565b600b555b60408051338152602081018390527f6352c5382c4a4578e712449ca65e83cdb392d045dfcf1cad9615189db2da244b91015b60405180910390a150565b60156020526000908152604090208054600182015460028301546006840180546001600160a01b03909416949293919291611a10906138f9565b80601f0160208091040260200160405190810160405280929190818152602001828054611a3c906138f9565b8015611a895780601f10611a5e57610100808354040283529160200191611a89565b820191906000526020600020905b815481529060010190602001808311611a6c57829003601f168201915b505050505090806007018054611a9e906138f9565b80601f0160208091040260200160405190810160405280929190818152602001828054611aca906138f9565b8015611b175780601f10611aec57610100808354040283529160200191611b17565b820191906000526020600020905b815481529060010190602001808311611afa57829003601f168201915b5050506008909301549192505060ff1686565b611b32613058565b60008281526015602090815260409182902082516101408101845281546001600160a01b031681526001820154818401526002820154818501526003820180548551818602810186019096528086529194929360608601939290830182828015611bc557602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311611ba7575b5050505050815260200160048201805480602002602001604051908101604052809291908181526020016000905b82821015611c9f578382906000526020600020018054611c12906138f9565b80601f0160208091040260200160405190810160405280929190818152602001828054611c3e906138f9565b8015611c8b5780601f10611c6057610100808354040283529160200191611c8b565b820191906000526020600020905b815481529060010190602001808311611c6e57829003601f168201915b505050505081526020019060010190611bf3565b50505050815260200160058201805480602002602001604051908101604052809291908181526020018280548015611cf657602002820191906000526020600020905b815481526020019060010190808311611ce2575b50505050508152602001600682018054611d0f906138f9565b80601f0160208091040260200160405190810160405280929190818152602001828054611d3b906138f9565b8015611d885780601f10611d5d57610100808354040283529160200191611d88565b820191906000526020600020905b815481529060010190602001808311611d6b57829003601f168201915b50505050508152602001600782018054611da1906138f9565b80601f0160208091040260200160405190810160405280929190818152602001828054611dcd906138f9565b8015611e1a5780601f10611def57610100808354040283529160200191611e1a565b820191906000526020600020905b815481529060010190602001808311611dfd57829003601f168201915b5050509183525050600882015460209091019060ff166004811115611e4157611e41613667565b6004811115611e5257611e52613667565b815260200160098201805480602002602001604051908101604052809291908181526020018280548015611ea557602002820191906000526020600020905b815481526020019060010190808311611e91575b5050505050815250509050919050565b60008111611f205760405162461bcd60e51b815260206004820152603260248201527f45524332304775696c643a20546f6b656e7320746f206c6f636b2073686f756c60448201527106420626520686967686572207468616e20360741b6064820152608401610b41565b611f2933612988565b600003611f4257600b54611f3e90600161399e565b600b555b6011546040516311f9fbc960e21b8152336004820152602481018390526001600160a01b03909116906347e7ef2490604401600060405180830381600087803b158015611f8e57600080fd5b505af1158015611fa2573d6000803e3d6000fd5b505033600090815260126020526040902054611fc1925083915061399e565b33600090815260126020526040902055600d54611fde904261399e565b33600090815260126020526040902060010155600e54611fff90829061399e565b600e5560408051338152602081018390527fac87f20a77d28ee8bbb58ec87ea8fa968b3393efae1a368fd50b767c2847391c91016119cb565b6040516bffffffffffffffffffffffff19606086901b166020820152603481018490526054810183905260748101829052600090609401604051602081830303815290604052805190602001209050949350505050565b6000612710600554610aac600e5490565b601681815481106120b057600080fd5b600091825260209091200154905081565b60175460ff16156121205760405162461bcd60e51b8152602060048201526024808201527f45524332304775696c643a2050726f706f73616c20756e6465722065786563756044820152633a34b7b760e11b6064820152608401610b41565b600160008281526015602052604090206008015460ff16600481111561214857612148613667565b146121a35760405162461bcd60e51b815260206004820152602560248201527f45524332304775696c643a2050726f706f73616c20616c72656164792065786560448201526418dd5d195960da1b6064820152608401610b41565b60008181526015602052604090206002015442116122115760405162461bcd60e51b815260206004820152602560248201527f45524332304775696c643a2050726f706f73616c206861736e277420656e646560448201526419081e595d60da1b6064820152608401610b41565b60008181526015602052604081206009018054829190829061223557612235613bc2565b600091825260209091200154905060015b60008481526015602052604090206009015481101561235e5761226761208f565b600085815260156020526040902060090180548390811061228a5761228a613bc2565b9060005260206000200154101580156122d2575060008481526015602052604090206009018054839190839081106122c4576122c4613bc2565b906000526020600020015410155b1561234c5760008481526015602052604090206009018054839190839081106122fd576122fd613bc2565b906000526020600020015403612316576000925061234c565b6000848152601560205260409020600901805491935083918290811061233e5761233e613bc2565b906000526020600020015491505b8061235681613bd8565b915050612246565b826000036123ae576000848152601560205260409020600801805460ff191660029081179091558490600080516020613d30833981519152905b60405190815260200160405180910390a2612970565b60045460008581526015602052604090206002015442916123ce9161399e565b101561240a576000848152601560205260409020600801805460ff191660049081179091558490600080516020613d3083398151915290612398565b600084815260156020526040812060088101805460ff191660031790556009015461243790600190613baf565b6000868152601560205260409020600301546124539190613976565b9050612460600185613baf565b61246a9082613949565b91506000612478828461399e565b9050600160009054906101000a90046001600160a01b03166001600160a01b0316633e7a47b26040518163ffffffff1660e01b8152600401600060405180830381600087803b1580156124ca57600080fd5b505af11580156124de573d6000803e3d6000fd5b505050505b808310156128dd57600086815260156020526040812060030180548590811061250e5761250e613bc2565b6000918252602090912001546001600160a01b0316148015906125685750600086815260156020526040812060040180548590811061254f5761254f613bc2565b906000526020600020018054612564906138f9565b9050115b156128cb57600086815260156020526040812060040180548590811061259057612590613bc2565b9060005260206000200180546125a5906138f9565b80601f01602080910402602001604051908101604052809291908181526020018280546125d1906138f9565b801561261e5780601f106125f35761010080835404028352916020019161261e565b820191906000526020600020905b81548152906001019060200180831161260157829003601f168201915b50505060208084015160015460008d815260159093526040909220600301805495965090946001600160a01b03909216935063eed47033925030918990811061266957612669613bc2565b9060005260206000200160009054906101000a90046001600160a01b031684601560008e81526020019081526020016000206005018a815481106126af576126af613bc2565b60009182526020909120015460405160e086901b6001600160e01b031990811682526001600160a01b039586166004830152939094166024850152911660448301526064820152608401600060405180830381600087803b15801561271357600080fd5b505af1925050508015612724575060015b61277557612730613bf1565b806308c379a0036127695750612744613c0d565b8061274f575061276b565b8060405162461bcd60e51b8152600401610b4191906131f2565b505b3d6000803e3d6000fd5b6017805460ff1916600117905560008881526015602052604081206003018054879081106127a5576127a5613bc2565b60009182526020808320909101548b83526015909152604090912060050180546001600160a01b0390921691889081106127e1576127e1613bc2565b9060005260206000200154601560008c8152602001908152602001600020600401888154811061281357612813613bc2565b9060005260206000200160405161282a9190613c97565b60006040518083038185875af1925050503d8060008114612867576040519150601f19603f3d011682016040523d82523d6000602084013e61286c565b606091505b50509050806128bd5760405162461bcd60e51b815260206004820181905260248201527f45524332304775696c643a2050726f706f73616c2063616c6c206661696c65646044820152606401610b41565b50506017805460ff19169055505b826128d581613bd8565b9350506124e3565b60015460405163fb0fde8560e01b81523060048201526001600160a01b039091169063fb0fde8590602401602060405180830381865afa158015612925573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906129499190613d0d565b5085600080516020613d30833981519152600360405190815260200160405180910390a250505b6001600c5461297f9190613baf565b600c5550505050565b6001600160a01b031660009081526012602052604090205490565b60008381526014602090815260408083206001600160a01b03881684528252808320600101548684526015909252909120600901805483929190859081106129ed576129ed613bc2565b9060005260206000200154612a029190613baf565b612a0c919061399e565b6000848152601560205260409020600901805484908110612a2f57612a2f613bc2565b60009182526020808320909101929092558481526014825260408082206001600160a01b0388168352835280822085815560010184905585825260159092522060020154612a95856001600160a01b031660009081526012602052604090206001015490565b1015612ac9576000838152601560209081526040808320600201546001600160a01b03881684526012909252909120600101555b604080516001600160a01b038616815260208101839052839185917f583c62f152711bcb1ca6186c1065821ff17a7cbe226dcb559a1c889dcf0d769b910160405180910390a360075415612be2576000612b2e6008543a612c0e90919063ffffffff16565b600754612b3b9190613949565b9050804710158015612b4c5750333b155b15612be057604051600090339083908381818185875af1925050503d8060008114612b93576040519150601f19603f3d011682016040523d82523d6000602084013e612b98565b606091505b50509050806117805760405162461bcd60e51b81526020600482015260146024820152734661696c656420746f20726566756e642067617360601b6044820152606401610b41565b505b50505050565b6000806000612bf78585612c26565b91509150612c0481612c91565b5090505b92915050565b6000818310612c1d5781612c1f565b825b9392505050565b6000808251604103612c5c5760208301516040840151606085015160001a612c5087828585612e4a565b94509450505050610d71565b8251604003612c855760208301516040840151612c7a868383612f37565b935093505050610d71565b50600090506002610d71565b6000816004811115612ca557612ca5613667565b03612cad5750565b6001816004811115612cc157612cc1613667565b03612d0e5760405162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e617475726500000000000000006044820152606401610b41565b6002816004811115612d2257612d22613667565b03612d6f5760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e677468006044820152606401610b41565b6003816004811115612d8357612d83613667565b03612ddb5760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b6064820152608401610b41565b6004816004811115612def57612def613667565b03612e475760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202776272076616c604482015261756560f01b6064820152608401610b41565b50565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0831115612e815750600090506003612f2e565b8460ff16601b14158015612e9957508460ff16601c14155b15612eaa5750600090506004612f2e565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015612efe573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116612f2757600060019250925050612f2e565b9150600090505b94509492505050565b6000806001600160ff1b03831660ff84901c601b01612f5887828885612e4a565b935093505050935093915050565b828054828255906000526020600020908101928215612fbb579160200282015b82811115612fbb57825182546001600160a01b0319166001600160a01b03909116178255602090920191600190910190612f86565b50612fc79291506130c5565b5090565b828054828255906000526020600020908101928215613011579160200282015b82811115613011578251829061300190826139f7565b5091602001919060010190612feb565b50612fc79291506130da565b828054828255906000526020600020908101928215612fbb579160200282015b82811115612fbb57825182559160200191906001019061303d565b60405180610140016040528060006001600160a01b0316815260200160008152602001600081526020016060815260200160608152602001606081526020016060815260200160608152602001600060048111156130b8576130b8613667565b8152602001606081525090565b5b80821115612fc757600081556001016130c6565b80821115612fc75760006130ee82826130f7565b506001016130da565b508054613103906138f9565b6000825580601f10613113575050565b601f016020900490600052602060002090810190612e4791906130c5565b6020808252825182820181905260009190848201906040850190845b818110156131695783518352928401929184019160010161314d565b50909695505050505050565b80356001600160a01b038116811461318c57600080fd5b919050565b6000602082840312156131a357600080fd5b612c1f82613175565b6000815180845260005b818110156131d2576020818501810151868301820152016131b6565b506000602082860101526020601f19601f83011685010191505092915050565b602081526000612c1f60208301846131ac565b6000806000806000806000806000806101408b8d03121561322557600080fd5b505088359a60208a01359a5060408a013599606081013599506080810135985060a0810135975060c0810135965060e081013595506101008101359450610120013592509050565b6000806040838503121561328057600080fd5b8235915061329060208401613175565b90509250929050565b634e487b7160e01b600052604160045260246000fd5b601f8201601f1916810167ffffffffffffffff811182821017156132d5576132d5613299565b6040525050565b600067ffffffffffffffff8211156132f6576132f6613299565b5060051b60200190565b600082601f83011261331157600080fd5b8135602061331e826132dc565b60405161332b82826132af565b83815260059390931b850182019282810191508684111561334b57600080fd5b8286015b8481101561336d5761336081613175565b835291830191830161334f565b509695505050505050565b600082601f83011261338957600080fd5b813567ffffffffffffffff8111156133a3576133a3613299565b6040516133ba601f8301601f1916602001826132af565b8181528460208386010111156133cf57600080fd5b816020850160208301376000918101602001919091529392505050565b600082601f8301126133fd57600080fd5b8135602061340a826132dc565b60405161341782826132af565b83815260059390931b850182019282810191508684111561343757600080fd5b8286015b8481101561336d57803567ffffffffffffffff81111561345b5760008081fd5b6134698986838b0101613378565b84525091830191830161343b565b600082601f83011261348857600080fd5b81356020613495826132dc565b6040516134a282826132af565b83815260059390931b85018201928281019150868411156134c257600080fd5b8286015b8481101561336d57803583529183019183016134c6565b60008060008060008060c087890312156134f657600080fd5b863567ffffffffffffffff8082111561350e57600080fd5b61351a8a838b01613300565b9750602089013591508082111561353057600080fd5b61353c8a838b016133ec565b9650604089013591508082111561355257600080fd5b61355e8a838b01613477565b955060608901359450608089013591508082111561357b57600080fd5b6135878a838b01613378565b935060a089013591508082111561359d57600080fd5b506135aa89828a01613378565b9150509295509295509295565b6000806000606084860312156135cc57600080fd5b505081359360208301359350604090920135919050565b600080600080600060a086880312156135fb57600080fd5b85359450602086013593506040860135925061361960608701613175565b9150608086013567ffffffffffffffff81111561363557600080fd5b61364188828901613378565b9150509295509295909350565b60006020828403121561366057600080fd5b5035919050565b634e487b7160e01b600052602160045260246000fd5b6005811061369b57634e487b7160e01b600052602160045260246000fd5b9052565b60018060a01b038716815285602082015284604082015260c0606082015260006136cc60c08301866131ac565b82810360808401526136de81866131ac565b9150506136ee60a083018461367d565b979650505050505050565b600081518084526020808501945080840160005b838110156137325781516001600160a01b03168752958201959082019060010161370d565b509495945050505050565b600081518084526020808501808196508360051b8101915082860160005b858110156137855782840389526137738483516131ac565b9885019893509084019060010161375b565b5091979650505050505050565b600081518084526020808501945080840160005b83811015613732578151875295820195908201906001016137a6565b602081526137dc6020820183516001600160a01b03169052565b60208201516040820152604082015160608201526000606083015161014080608085015261380e6101608501836136f9565b91506080850151601f19808685030160a087015261382c848361373d565b935060a08701519150808685030160c08701526138498483613792565b935060c08701519150808685030160e087015261386684836131ac565b935060e0870151915061010081878603018188015261388585846131ac565b94508088015192505061012061389d8188018461367d565b8701518685039091018387015290506138b68382613792565b9695505050505050565b600080600080608085870312156138d657600080fd5b6138df85613175565b966020860135965060408601359560600135945092505050565b600181811c9082168061390d57607f821691505b60208210810361392d57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b8082028115828204841417612c0857612c08613933565b634e487b7160e01b600052601260045260246000fd5b60008261398557613985613960565b500490565b60008261399957613999613960565b500690565b80820180821115612c0857612c08613933565b601f82111561144a57600081815260208120601f850160051c810160208610156139d85750805b601f850160051c820191505b81811015611780578281556001016139e4565b815167ffffffffffffffff811115613a1157613a11613299565b613a2581613a1f84546138f9565b846139b1565b602080601f831160018114613a5a5760008415613a425750858301515b600019600386901b1c1916600185901b178555611780565b600085815260208120601f198616915b82811015613a8957888601518255948401946001909101908401613a6a565b5085821015613aa75787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b6020808252602b908201527f45524332304775696c643a2050726f706f73616c20656e6465642c2063616e6e60408201526a1bdd081899481d9bdd195960aa1b606082015260800190565b60208082526026908201527f45524332304775696c643a20496e76616c696420766f74696e67506f77657220604082015265185b5bdd5b9d60d21b606082015260800190565b60208082526041908201527f45524332304775696c643a2043616e6e6f74206368616e6765206f7074696f6e60408201527f20766f7465642c206f6e6c7920696e63726561736520766f74696e67506f77656060820152603960f91b608082015260a00190565b81810381811115612c0857612c08613933565b634e487b7160e01b600052603260045260246000fd5b600060018201613bea57613bea613933565b5060010190565b600060033d1115613c0a5760046000803e5060005160e01c5b90565b600060443d1015613c1b5790565b6040516003193d81016004833e81513d67ffffffffffffffff8160248401118184111715613c4b57505050505090565b8285019150815181811115613c635750505050505090565b843d8701016020828501011115613c7d5750505050505090565b613c8c602082860101876132af565b509095945050505050565b6000808354613ca5816138f9565b60018281168015613cbd5760018114613cd257613d01565b60ff1984168752821515830287019450613d01565b8760005260208060002060005b85811015613cf85781548a820152908401908201613cdf565b50505082870194505b50929695505050505050565b600060208284031215613d1f57600080fd5b81518015158114612c1f57600080fdfefee62a9eec0be50eb061c711990ef0f1e17b40ea131d9347b0468acdaf8bf243a2646970667358221220b53312752310bfe13ce7483cf9586da475c428ceb018bfe2692bfadb26abe24664736f6c63430008110033',
  deployedBytecode:
    '0x6080604052600436106103255760003560e01c80635bc789d9116101ae578063ae619234116100eb578063e04503531161008f578063f4732da61161006c578063f4732da614610954578063f98606a714610969578063fc0c546a1461097f578063fc4e703f1461099f57005b8063e0450353146108e9578063e158080a146108ff578063f09951981461091557005b8063b7c15f8d116100c8578063b7c15f8d1461088a578063bcc3f3bd1461089f578063c0a4d64d146108bf578063c93e01e3146108d457005b8063ae61923414610835578063b3929aaa1461084a578063b3b470611461086a57005b806389c98c0611610152578063a16fe3421161012f578063a16fe342146107d6578063a78d80fc146107f4578063a7aeb5571461080a578063ad6c1e341461082057005b806389c98c061461078c5780638f180305146107a157806392b71654146107b657005b80636c8b72f61161018b5780636c8b72f6146107125780636e27d8891461072757806377027ff4146107475780638029eff11461075c57005b80635bc789d9146106c75780635e508c2c146106e757806364fe6ed2146106fd57005b80632229a0e21161027c57806332ed5b12116102205780633f10cf15116101fd5780633f10cf1514610650578063430694cf1461066657806354f2f7af1461069357806356891412146106b157005b806332ed5b12146105f25780633bf353fb146106245780633de39c111461063a57005b80632d5b17de116102595780632d5b17de146105395780632d757c3e146105595780632fd99c0014610592578063315a095d146105d257005b80632229a0e2146104e85780632467ef94146104fd57806325c069fc1461051257005b8063130485fe116102e357806317d7de7c116102c057806317d7de7c14610476578063184a0ae91461048b5780631a5007dd146104a157806321df0da7146104b657005b8063130485fe1461041657806313108d741461043657806316bbecde1461045657005b80623a40d01461032757806301a598a61461035257806306fdde031461039b5780630a366a63146103bd5780630d668087146103e0578063123f6d67146103f6575b005b34801561033357600080fd5b5061033c6109b5565b6040516103499190613131565b60405180910390f35b34801561035e57600080fd5b5061038661036d366004613191565b6012602052600090815260409020805460019091015482565b60408051928352602083019190915201610349565b3480156103a757600080fd5b506103b0610a0d565b60405161034991906131f2565b3480156103c957600080fd5b506103d2610a9b565b604051908152602001610349565b3480156103ec57600080fd5b506103d2600d5481565b34801561040257600080fd5b50610325610411366004613205565b610ac5565b34801561042257600080fd5b5061038661043136600461326d565b610d46565b34801561044257600080fd5b506103d26104513660046134dd565b610d78565b34801561046257600080fd5b506103256104713660046135b7565b611319565b34801561048257600080fd5b506103b061144f565b34801561049757600080fd5b506103d260035481565b3480156104ad57600080fd5b50600a546103d2565b3480156104c257600080fd5b506000546001600160a01b03165b6040516001600160a01b039091168152602001610349565b3480156104f457600080fd5b506016546103d2565b34801561050957600080fd5b50600c546103d2565b34801561051e57600080fd5b50610527600a81565b60405160ff9091168152602001610349565b34801561054557600080fd5b506103256105543660046135e3565b6114d8565b34801561056557600080fd5b506103d2610574366004613191565b6001600160a01b031660009081526012602052604090206001015490565b34801561059e57600080fd5b506105c26105ad36600461364e565b60136020526000908152604090205460ff1681565b6040519015158152602001610349565b3480156105de57600080fd5b506103256105ed36600461364e565b611788565b3480156105fe57600080fd5b5061061261060d36600461364e565b6119d6565b6040516103499695949392919061369f565b34801561063057600080fd5b506103d2600c5481565b34801561064657600080fd5b506103d260085481565b34801561065c57600080fd5b506103d260045481565b34801561067257600080fd5b5061068661068136600461364e565b611b2a565b60405161034991906137c2565b34801561069f57600080fd5b506011546001600160a01b03166104d0565b3480156106bd57600080fd5b506103d2600e5481565b3480156106d357600080fd5b506011546104d0906001600160a01b031681565b3480156106f357600080fd5b506103d260055481565b34801561070957600080fd5b506010546103d2565b34801561071e57600080fd5b506007546103d2565b34801561073357600080fd5b5061032561074236600461364e565b611eb5565b34801561075357600080fd5b506009546103d2565b34801561076857600080fd5b506105c261077736600461364e565b60009081526013602052604090205460ff1690565b34801561079857600080fd5b506008546103d2565b3480156107ad57600080fd5b50600b546103d2565b3480156107c257600080fd5b506103d26107d13660046138c0565b612038565b3480156107e257600080fd5b506001546001600160a01b03166104d0565b34801561080057600080fd5b506103d2600a5481565b34801561081657600080fd5b506103d2600f5481565b34801561082c57600080fd5b50600f546103d2565b34801561084157600080fd5b506103d261208f565b34801561085657600080fd5b506103d261086536600461364e565b6120a0565b34801561087657600080fd5b5061032561088536600461364e565b6120c1565b34801561089657600080fd5b506004546103d2565b3480156108ab57600080fd5b506103d26108ba366004613191565b612988565b3480156108cb57600080fd5b50600d546103d2565b3480156108e057600080fd5b506003546103d2565b3480156108f557600080fd5b506103d260095481565b34801561090b57600080fd5b506103d260105481565b34801561092157600080fd5b5061038661093036600461326d565b60146020908152600092835260408084209091529082529020805460019091015482565b34801561096057600080fd5b50600e546103d2565b34801561097557600080fd5b506103d260065481565b34801561098b57600080fd5b506000546104d0906001600160a01b031681565b3480156109ab57600080fd5b506103d260075481565b60606016805480602002602001604051908101604052809291908181526020018280548015610a0357602002820191906000526020600020905b8154815260200190600101908083116109ef575b5050505050905090565b60028054610a1a906138f9565b80601f0160208091040260200160405190810160405280929190818152602001828054610a46906138f9565b8015610a935780601f10610a6857610100808354040283529160200191610a93565b820191906000526020600020905b815481529060010190602001808311610a7657829003601f168201915b505050505081565b6000612710600654610aac600e5490565b610ab69190613949565b610ac09190613976565b905090565b333014610b4a5760405162461bcd60e51b815260206004820152604260248201527f45524332304775696c643a204f6e6c792063616c6c61626c652062792045524360448201527f32306775696c6420697473656c66206f72207768656e20696e697469616c697a606482015261195960f21b608482015260a4015b60405180910390fd5b60008a11610bb25760405162461bcd60e51b815260206004820152602f60248201527f45524332304775696c643a2070726f706f73616c2074696d652068617320746f60448201526e0206265206d6f7265207468616e203608c1b6064820152608401610b41565b89831015610c285760405162461bcd60e51b815260206004820152603e60248201527f45524332304775696c643a206c6f636b54696d652068617320746f206265206860448201527f6967686572206f7220657175616c20746f2070726f706f73616c54696d6500006064820152608401610b41565b60008811610c9e5760405162461bcd60e51b815260206004820152603c60248201527f45524332304775696c643a20766f74696e6720706f77657220666f722065786560448201527f637574696f6e2068617320746f206265206d6f7265207468616e2030000000006064820152608401610b41565b6201c908861115610d175760405162461bcd60e51b815260206004820152603960248201527f45524332304775696c643a20766f7465206761732068617320746f206265206560448201527f7175616c206f72206c6f776572207468616e20313137303030000000000000006064820152608401610b41565b600399909955600497909755600595909555600693909355600791909155600855600955600d55600f55601055565b60008281526014602090815260408083206001600160a01b0385168452909152902080546001909101545b9250929050565b6000601054600e541015610df45760405162461bcd60e51b815260206004820152603960248201527f45524332304775696c643a204e6f7420656e6f75676820746f6b656e73206c6f60448201527f636b656420746f2063726561746520612070726f706f73616c000000000000006064820152608401610b41565b600f54600b541015610e645760405162461bcd60e51b815260206004820152603360248201527f45524332304775696c643a204e6f7420656e6f756768206d656d6265727320746044820152721bc818dc99585d194818481c1c9bdc1bdcd85b606a1b6064820152608401610b41565b600954600c5410610ed65760405162461bcd60e51b815260206004820152603660248201527f45524332304775696c643a204d6178696d756d20616d6f756e74206f662061636044820152751d1a5d99481c1c9bdc1bdcd85b1cc81c995858da195960521b6064820152608401610b41565b610ede610a9b565b610ee733612988565b1015610f535760405162461bcd60e51b815260206004820152603560248201527f45524332304775696c643a204e6f7420656e6f75676820766f74696e67506f77604482015274195c881d1bc818dc99585d19481c1c9bdc1bdcd85b605a1b6064820152608401610b41565b85518751148015610f65575084518751145b610fce5760405162461bcd60e51b815260206004820152603460248201527f45524332304775696c643a2057726f6e67206c656e677468206f6620746f2c2060448201527364617461206f722076616c75652061727261797360601b6064820152608401610b41565b60008751116110395760405162461bcd60e51b815260206004820152603160248201527f45524332304775696c643a20746f2c20646174612076616c7565206172726179604482015270732063616e6e6f7420626520656d70747960781b6064820152608401610b41565b865184111580156110545750838551611052919061398a565b155b6110c65760405162461bcd60e51b815260206004820152603760248201527f45524332304775696c643a20496e76616c696420746f74616c4f7074696f6e7360448201527f206f72206f7074696f6e2063616c6c73206c656e6774680000000000000000006064820152608401610b41565b600a84111561113d5760405162461bcd60e51b815260206004820152603a60248201527f45524332304775696c643a204d6178696d756d20616d6f756e74206f66206f7060448201527f74696f6e73207065722070726f706f73616c20726561636865640000000000006064820152608401610b41565b600a546040516bffffffffffffffffffffffff193360601b1660208201524260348201526054810191909152600090607401604051602081830303815290604052805190602001209050600a546001611196919061399e565b600a55600081815260156020526040902080546001600160a01b0319163317815542600182018190556003546111cb9161399e565b600282015588516111e590600383019060208c0190612f66565b5087516111fb90600483019060208b0190612fcb565b50865161121190600583019060208a019061301d565b506006810161122086826139f7565b506007810161122f85826139f7565b5061123b86600161399e565b67ffffffffffffffff81111561125357611253613299565b60405190808252806020026020018201604052801561127c578160200160208202803683370190505b50805161129391600984019160209091019061301d565b5060088101805460ff19166001908117909155600c546112b29161399e565b600c5581600080516020613d30833981519152600160405190815260200160405180910390a250601680546001810182556000919091527fd833147d7dc355ba459fc788f669e58cfaf9dc25ddcd0702e87d69c7b512428901819055979650505050505050565b60008381526015602052604090206002015442106113495760405162461bcd60e51b8152600401610b4190613ab7565b8061135333612988565b1015801561137c5750600083815260146020908152604080832033845290915290206001015481115b6113985760405162461bcd60e51b8152600401610b4190613b02565b60008381526014602090815260408083203384529091529020541580156113d957506000838152601460209081526040808320338452909152902060010154155b8061142257506000838152601460209081526040808320338452909152902054821480156114225750600083815260146020908152604080832033845290915290206001015481115b61143e5760405162461bcd60e51b8152600401610b4190613b48565b61144a338484846129a3565b505050565b60606002805461145e906138f9565b80601f016020809104026020016040519081016040528092919081815260200182805461148a906138f9565b8015610a035780601f106114ac57610100808354040283529160200191610a03565b820191906000526020600020905b8154815290600101906020018083116114ba57509395945050505050565b60008581526015602052604090206002015442106115085760405162461bcd60e51b8152600401610b4190613ab7565b600061151683878787612038565b60008181526013602052604090205490915060ff16156115785760405162461bcd60e51b815260206004820152601960248201527f45524332304775696c643a20416c726561647920766f746564000000000000006044820152606401610b41565b6115d9826115d3836040517f19457468657265756d205369676e6564204d6573736167653a0a3332000000006020820152603c8101829052600090605c01604051602081830303815290604052805190602001209050919050565b90612be8565b6001600160a01b0316836001600160a01b0316146116395760405162461bcd60e51b815260206004820152601860248201527f45524332304775696c643a2057726f6e67207369676e657200000000000000006044820152606401610b41565b6000818152601360205260409020805460ff191660011790558361165c84612988565b1015801561168e575060008681526014602090815260408083206001600160a01b038716845290915290206001015484115b6116aa5760405162461bcd60e51b8152600401610b4190613b02565b60008681526014602090815260408083206001600160a01b03871684529091529020541580156116fd575060008681526014602090815260408083206001600160a01b0387168452909152902060010154155b80611758575060008681526014602090815260408083206001600160a01b038716845290915290205485148015611758575060008681526014602090815260408083206001600160a01b038716845290915290206001015484115b6117745760405162461bcd60e51b8152600401610b4190613b48565b611780838787876129a3565b505050505050565b8061179233612988565b10156117ff5760405162461bcd60e51b815260206004820152603660248201527f45524332304775696c643a20556e61626c6520746f207769746864726177206d6044820152751bdc99481d1bdad95b9cc81d1a185b881b1bd8dad95960521b6064820152608401610b41565b3360009081526012602052604090206001015442116118605760405162461bcd60e51b815260206004820152601f60248201527f45524332304775696c643a20546f6b656e73207374696c6c206c6f636b6564006044820152606401610b41565b600081116118d65760405162461bcd60e51b815260206004820152603f60248201527f45524332304775696c643a20616d6f756e74206f6620746f6b656e7320746f2060448201527f7769746864726177206d7573742062652067726561746572207468616e2030006064820152608401610b41565b336000908152601260205260409020546118f1908290613baf565b33600090815260126020526040902055600e5461190f908290613baf565b600e5560115460405163f3fef3a360e01b8152336004820152602481018390526001600160a01b039091169063f3fef3a390604401600060405180830381600087803b15801561195e57600080fd5b505af1158015611972573d6000803e3d6000fd5b5050505061197f33612988565b600003611999576001600b546119959190613baf565b600b555b60408051338152602081018390527f6352c5382c4a4578e712449ca65e83cdb392d045dfcf1cad9615189db2da244b91015b60405180910390a150565b60156020526000908152604090208054600182015460028301546006840180546001600160a01b03909416949293919291611a10906138f9565b80601f0160208091040260200160405190810160405280929190818152602001828054611a3c906138f9565b8015611a895780601f10611a5e57610100808354040283529160200191611a89565b820191906000526020600020905b815481529060010190602001808311611a6c57829003601f168201915b505050505090806007018054611a9e906138f9565b80601f0160208091040260200160405190810160405280929190818152602001828054611aca906138f9565b8015611b175780601f10611aec57610100808354040283529160200191611b17565b820191906000526020600020905b815481529060010190602001808311611afa57829003601f168201915b5050506008909301549192505060ff1686565b611b32613058565b60008281526015602090815260409182902082516101408101845281546001600160a01b031681526001820154818401526002820154818501526003820180548551818602810186019096528086529194929360608601939290830182828015611bc557602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311611ba7575b5050505050815260200160048201805480602002602001604051908101604052809291908181526020016000905b82821015611c9f578382906000526020600020018054611c12906138f9565b80601f0160208091040260200160405190810160405280929190818152602001828054611c3e906138f9565b8015611c8b5780601f10611c6057610100808354040283529160200191611c8b565b820191906000526020600020905b815481529060010190602001808311611c6e57829003601f168201915b505050505081526020019060010190611bf3565b50505050815260200160058201805480602002602001604051908101604052809291908181526020018280548015611cf657602002820191906000526020600020905b815481526020019060010190808311611ce2575b50505050508152602001600682018054611d0f906138f9565b80601f0160208091040260200160405190810160405280929190818152602001828054611d3b906138f9565b8015611d885780601f10611d5d57610100808354040283529160200191611d88565b820191906000526020600020905b815481529060010190602001808311611d6b57829003601f168201915b50505050508152602001600782018054611da1906138f9565b80601f0160208091040260200160405190810160405280929190818152602001828054611dcd906138f9565b8015611e1a5780601f10611def57610100808354040283529160200191611e1a565b820191906000526020600020905b815481529060010190602001808311611dfd57829003601f168201915b5050509183525050600882015460209091019060ff166004811115611e4157611e41613667565b6004811115611e5257611e52613667565b815260200160098201805480602002602001604051908101604052809291908181526020018280548015611ea557602002820191906000526020600020905b815481526020019060010190808311611e91575b5050505050815250509050919050565b60008111611f205760405162461bcd60e51b815260206004820152603260248201527f45524332304775696c643a20546f6b656e7320746f206c6f636b2073686f756c60448201527106420626520686967686572207468616e20360741b6064820152608401610b41565b611f2933612988565b600003611f4257600b54611f3e90600161399e565b600b555b6011546040516311f9fbc960e21b8152336004820152602481018390526001600160a01b03909116906347e7ef2490604401600060405180830381600087803b158015611f8e57600080fd5b505af1158015611fa2573d6000803e3d6000fd5b505033600090815260126020526040902054611fc1925083915061399e565b33600090815260126020526040902055600d54611fde904261399e565b33600090815260126020526040902060010155600e54611fff90829061399e565b600e5560408051338152602081018390527fac87f20a77d28ee8bbb58ec87ea8fa968b3393efae1a368fd50b767c2847391c91016119cb565b6040516bffffffffffffffffffffffff19606086901b166020820152603481018490526054810183905260748101829052600090609401604051602081830303815290604052805190602001209050949350505050565b6000612710600554610aac600e5490565b601681815481106120b057600080fd5b600091825260209091200154905081565b60175460ff16156121205760405162461bcd60e51b8152602060048201526024808201527f45524332304775696c643a2050726f706f73616c20756e6465722065786563756044820152633a34b7b760e11b6064820152608401610b41565b600160008281526015602052604090206008015460ff16600481111561214857612148613667565b146121a35760405162461bcd60e51b815260206004820152602560248201527f45524332304775696c643a2050726f706f73616c20616c72656164792065786560448201526418dd5d195960da1b6064820152608401610b41565b60008181526015602052604090206002015442116122115760405162461bcd60e51b815260206004820152602560248201527f45524332304775696c643a2050726f706f73616c206861736e277420656e646560448201526419081e595d60da1b6064820152608401610b41565b60008181526015602052604081206009018054829190829061223557612235613bc2565b600091825260209091200154905060015b60008481526015602052604090206009015481101561235e5761226761208f565b600085815260156020526040902060090180548390811061228a5761228a613bc2565b9060005260206000200154101580156122d2575060008481526015602052604090206009018054839190839081106122c4576122c4613bc2565b906000526020600020015410155b1561234c5760008481526015602052604090206009018054839190839081106122fd576122fd613bc2565b906000526020600020015403612316576000925061234c565b6000848152601560205260409020600901805491935083918290811061233e5761233e613bc2565b906000526020600020015491505b8061235681613bd8565b915050612246565b826000036123ae576000848152601560205260409020600801805460ff191660029081179091558490600080516020613d30833981519152905b60405190815260200160405180910390a2612970565b60045460008581526015602052604090206002015442916123ce9161399e565b101561240a576000848152601560205260409020600801805460ff191660049081179091558490600080516020613d3083398151915290612398565b600084815260156020526040812060088101805460ff191660031790556009015461243790600190613baf565b6000868152601560205260409020600301546124539190613976565b9050612460600185613baf565b61246a9082613949565b91506000612478828461399e565b9050600160009054906101000a90046001600160a01b03166001600160a01b0316633e7a47b26040518163ffffffff1660e01b8152600401600060405180830381600087803b1580156124ca57600080fd5b505af11580156124de573d6000803e3d6000fd5b505050505b808310156128dd57600086815260156020526040812060030180548590811061250e5761250e613bc2565b6000918252602090912001546001600160a01b0316148015906125685750600086815260156020526040812060040180548590811061254f5761254f613bc2565b906000526020600020018054612564906138f9565b9050115b156128cb57600086815260156020526040812060040180548590811061259057612590613bc2565b9060005260206000200180546125a5906138f9565b80601f01602080910402602001604051908101604052809291908181526020018280546125d1906138f9565b801561261e5780601f106125f35761010080835404028352916020019161261e565b820191906000526020600020905b81548152906001019060200180831161260157829003601f168201915b50505060208084015160015460008d815260159093526040909220600301805495965090946001600160a01b03909216935063eed47033925030918990811061266957612669613bc2565b9060005260206000200160009054906101000a90046001600160a01b031684601560008e81526020019081526020016000206005018a815481106126af576126af613bc2565b60009182526020909120015460405160e086901b6001600160e01b031990811682526001600160a01b039586166004830152939094166024850152911660448301526064820152608401600060405180830381600087803b15801561271357600080fd5b505af1925050508015612724575060015b61277557612730613bf1565b806308c379a0036127695750612744613c0d565b8061274f575061276b565b8060405162461bcd60e51b8152600401610b4191906131f2565b505b3d6000803e3d6000fd5b6017805460ff1916600117905560008881526015602052604081206003018054879081106127a5576127a5613bc2565b60009182526020808320909101548b83526015909152604090912060050180546001600160a01b0390921691889081106127e1576127e1613bc2565b9060005260206000200154601560008c8152602001908152602001600020600401888154811061281357612813613bc2565b9060005260206000200160405161282a9190613c97565b60006040518083038185875af1925050503d8060008114612867576040519150601f19603f3d011682016040523d82523d6000602084013e61286c565b606091505b50509050806128bd5760405162461bcd60e51b815260206004820181905260248201527f45524332304775696c643a2050726f706f73616c2063616c6c206661696c65646044820152606401610b41565b50506017805460ff19169055505b826128d581613bd8565b9350506124e3565b60015460405163fb0fde8560e01b81523060048201526001600160a01b039091169063fb0fde8590602401602060405180830381865afa158015612925573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906129499190613d0d565b5085600080516020613d30833981519152600360405190815260200160405180910390a250505b6001600c5461297f9190613baf565b600c5550505050565b6001600160a01b031660009081526012602052604090205490565b60008381526014602090815260408083206001600160a01b03881684528252808320600101548684526015909252909120600901805483929190859081106129ed576129ed613bc2565b9060005260206000200154612a029190613baf565b612a0c919061399e565b6000848152601560205260409020600901805484908110612a2f57612a2f613bc2565b60009182526020808320909101929092558481526014825260408082206001600160a01b0388168352835280822085815560010184905585825260159092522060020154612a95856001600160a01b031660009081526012602052604090206001015490565b1015612ac9576000838152601560209081526040808320600201546001600160a01b03881684526012909252909120600101555b604080516001600160a01b038616815260208101839052839185917f583c62f152711bcb1ca6186c1065821ff17a7cbe226dcb559a1c889dcf0d769b910160405180910390a360075415612be2576000612b2e6008543a612c0e90919063ffffffff16565b600754612b3b9190613949565b9050804710158015612b4c5750333b155b15612be057604051600090339083908381818185875af1925050503d8060008114612b93576040519150601f19603f3d011682016040523d82523d6000602084013e612b98565b606091505b50509050806117805760405162461bcd60e51b81526020600482015260146024820152734661696c656420746f20726566756e642067617360601b6044820152606401610b41565b505b50505050565b6000806000612bf78585612c26565b91509150612c0481612c91565b5090505b92915050565b6000818310612c1d5781612c1f565b825b9392505050565b6000808251604103612c5c5760208301516040840151606085015160001a612c5087828585612e4a565b94509450505050610d71565b8251604003612c855760208301516040840151612c7a868383612f37565b935093505050610d71565b50600090506002610d71565b6000816004811115612ca557612ca5613667565b03612cad5750565b6001816004811115612cc157612cc1613667565b03612d0e5760405162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e617475726500000000000000006044820152606401610b41565b6002816004811115612d2257612d22613667565b03612d6f5760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e677468006044820152606401610b41565b6003816004811115612d8357612d83613667565b03612ddb5760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b6064820152608401610b41565b6004816004811115612def57612def613667565b03612e475760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202776272076616c604482015261756560f01b6064820152608401610b41565b50565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0831115612e815750600090506003612f2e565b8460ff16601b14158015612e9957508460ff16601c14155b15612eaa5750600090506004612f2e565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015612efe573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116612f2757600060019250925050612f2e565b9150600090505b94509492505050565b6000806001600160ff1b03831660ff84901c601b01612f5887828885612e4a565b935093505050935093915050565b828054828255906000526020600020908101928215612fbb579160200282015b82811115612fbb57825182546001600160a01b0319166001600160a01b03909116178255602090920191600190910190612f86565b50612fc79291506130c5565b5090565b828054828255906000526020600020908101928215613011579160200282015b82811115613011578251829061300190826139f7565b5091602001919060010190612feb565b50612fc79291506130da565b828054828255906000526020600020908101928215612fbb579160200282015b82811115612fbb57825182559160200191906001019061303d565b60405180610140016040528060006001600160a01b0316815260200160008152602001600081526020016060815260200160608152602001606081526020016060815260200160608152602001600060048111156130b8576130b8613667565b8152602001606081525090565b5b80821115612fc757600081556001016130c6565b80821115612fc75760006130ee82826130f7565b506001016130da565b508054613103906138f9565b6000825580601f10613113575050565b601f016020900490600052602060002090810190612e4791906130c5565b6020808252825182820181905260009190848201906040850190845b818110156131695783518352928401929184019160010161314d565b50909695505050505050565b80356001600160a01b038116811461318c57600080fd5b919050565b6000602082840312156131a357600080fd5b612c1f82613175565b6000815180845260005b818110156131d2576020818501810151868301820152016131b6565b506000602082860101526020601f19601f83011685010191505092915050565b602081526000612c1f60208301846131ac565b6000806000806000806000806000806101408b8d03121561322557600080fd5b505088359a60208a01359a5060408a013599606081013599506080810135985060a0810135975060c0810135965060e081013595506101008101359450610120013592509050565b6000806040838503121561328057600080fd5b8235915061329060208401613175565b90509250929050565b634e487b7160e01b600052604160045260246000fd5b601f8201601f1916810167ffffffffffffffff811182821017156132d5576132d5613299565b6040525050565b600067ffffffffffffffff8211156132f6576132f6613299565b5060051b60200190565b600082601f83011261331157600080fd5b8135602061331e826132dc565b60405161332b82826132af565b83815260059390931b850182019282810191508684111561334b57600080fd5b8286015b8481101561336d5761336081613175565b835291830191830161334f565b509695505050505050565b600082601f83011261338957600080fd5b813567ffffffffffffffff8111156133a3576133a3613299565b6040516133ba601f8301601f1916602001826132af565b8181528460208386010111156133cf57600080fd5b816020850160208301376000918101602001919091529392505050565b600082601f8301126133fd57600080fd5b8135602061340a826132dc565b60405161341782826132af565b83815260059390931b850182019282810191508684111561343757600080fd5b8286015b8481101561336d57803567ffffffffffffffff81111561345b5760008081fd5b6134698986838b0101613378565b84525091830191830161343b565b600082601f83011261348857600080fd5b81356020613495826132dc565b6040516134a282826132af565b83815260059390931b85018201928281019150868411156134c257600080fd5b8286015b8481101561336d57803583529183019183016134c6565b60008060008060008060c087890312156134f657600080fd5b863567ffffffffffffffff8082111561350e57600080fd5b61351a8a838b01613300565b9750602089013591508082111561353057600080fd5b61353c8a838b016133ec565b9650604089013591508082111561355257600080fd5b61355e8a838b01613477565b955060608901359450608089013591508082111561357b57600080fd5b6135878a838b01613378565b935060a089013591508082111561359d57600080fd5b506135aa89828a01613378565b9150509295509295509295565b6000806000606084860312156135cc57600080fd5b505081359360208301359350604090920135919050565b600080600080600060a086880312156135fb57600080fd5b85359450602086013593506040860135925061361960608701613175565b9150608086013567ffffffffffffffff81111561363557600080fd5b61364188828901613378565b9150509295509295909350565b60006020828403121561366057600080fd5b5035919050565b634e487b7160e01b600052602160045260246000fd5b6005811061369b57634e487b7160e01b600052602160045260246000fd5b9052565b60018060a01b038716815285602082015284604082015260c0606082015260006136cc60c08301866131ac565b82810360808401526136de81866131ac565b9150506136ee60a083018461367d565b979650505050505050565b600081518084526020808501945080840160005b838110156137325781516001600160a01b03168752958201959082019060010161370d565b509495945050505050565b600081518084526020808501808196508360051b8101915082860160005b858110156137855782840389526137738483516131ac565b9885019893509084019060010161375b565b5091979650505050505050565b600081518084526020808501945080840160005b83811015613732578151875295820195908201906001016137a6565b602081526137dc6020820183516001600160a01b03169052565b60208201516040820152604082015160608201526000606083015161014080608085015261380e6101608501836136f9565b91506080850151601f19808685030160a087015261382c848361373d565b935060a08701519150808685030160c08701526138498483613792565b935060c08701519150808685030160e087015261386684836131ac565b935060e0870151915061010081878603018188015261388585846131ac565b94508088015192505061012061389d8188018461367d565b8701518685039091018387015290506138b68382613792565b9695505050505050565b600080600080608085870312156138d657600080fd5b6138df85613175565b966020860135965060408601359560600135945092505050565b600181811c9082168061390d57607f821691505b60208210810361392d57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b8082028115828204841417612c0857612c08613933565b634e487b7160e01b600052601260045260246000fd5b60008261398557613985613960565b500490565b60008261399957613999613960565b500690565b80820180821115612c0857612c08613933565b601f82111561144a57600081815260208120601f850160051c810160208610156139d85750805b601f850160051c820191505b81811015611780578281556001016139e4565b815167ffffffffffffffff811115613a1157613a11613299565b613a2581613a1f84546138f9565b846139b1565b602080601f831160018114613a5a5760008415613a425750858301515b600019600386901b1c1916600185901b178555611780565b600085815260208120601f198616915b82811015613a8957888601518255948401946001909101908401613a6a565b5085821015613aa75787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b6020808252602b908201527f45524332304775696c643a2050726f706f73616c20656e6465642c2063616e6e60408201526a1bdd081899481d9bdd195960aa1b606082015260800190565b60208082526026908201527f45524332304775696c643a20496e76616c696420766f74696e67506f77657220604082015265185b5bdd5b9d60d21b606082015260800190565b60208082526041908201527f45524332304775696c643a2043616e6e6f74206368616e6765206f7074696f6e60408201527f20766f7465642c206f6e6c7920696e63726561736520766f74696e67506f77656060820152603960f91b608082015260a00190565b81810381811115612c0857612c08613933565b634e487b7160e01b600052603260045260246000fd5b600060018201613bea57613bea613933565b5060010190565b600060033d1115613c0a5760046000803e5060005160e01c5b90565b600060443d1015613c1b5790565b6040516003193d81016004833e81513d67ffffffffffffffff8160248401118184111715613c4b57505050505090565b8285019150815181811115613c635750505050505090565b843d8701016020828501011115613c7d5750505050505090565b613c8c602082860101876132af565b509095945050505050565b6000808354613ca5816138f9565b60018281168015613cbd5760018114613cd257613d01565b60ff1984168752821515830287019450613d01565b8760005260208060002060005b85811015613cf85781548a820152908401908201613cdf565b50505082870194505b50929695505050505050565b600060208284031215613d1f57600080fd5b81518015158114612c1f57600080fdfefee62a9eec0be50eb061c711990ef0f1e17b40ea131d9347b0468acdaf8bf243a2646970667358221220b53312752310bfe13ce7483cf9586da475c428ceb018bfe2692bfadb26abe24664736f6c63430008110033',
  linkReferences: {},
  deployedLinkReferences: {},
};
