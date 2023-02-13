//
// Filename: AnyGuildPage.ts
//

import { actionFilterOptions, currencyFilterOptions, stateFilterOptions } from '../../utils';

class AnyGuildPage {
  public guildName: string;
  public membersCount: string;
  public governancePage: string;
  public allProposalsPage: string;
  public noActiveProposalsMessage: string;
  public allProposalsPageHyperlink: string;
  public proposalList: string;
  public proposalCard: string;
  public firstProposalTitle: string;
  public proposalState: string;
  public stateFilterBtn: string;
  public actionFilterBtn: string;
  public currencyFilterBtn: string;
  public stateFilterOption: string;
  public actionFilterOption: string;
  public currencyFilterOption: string;
  public searchbarBtn: string;
  public searchbarInputField: string;
  public proposalPageTitle: string;
  public proposalPageBackButton: string;
  public allDiscussionPage: string;
  public firstDiscussionCard: string;
  public firstDiscussionCreator: string;
  public firstDiscussionTitle: string;
  public createDiscussionButton: string;
  public discussionPageCreator: string;
  public discussionPageTitle: string;
  public discussionPageDescription: string;
  public discussionPageBackButton: string;
  public creatorName: string;
  public createProposalButton: string;

  constructor() {
    this.guildName = 'guild-name-sidebar';
    this.membersCount = 'members-count'
    this.governancePage = 'governance-page';
    this.allProposalsPage = 'all-proposals-page';
    this.noActiveProposalsMessage = 'no-active-proposals-message';
    this.allProposalsPageHyperlink = 'all-proposals-hyperlink';
    this.proposalList = 'proposals-list';
    this.proposalCard = 'proposal-card';
    this.firstProposalTitle = 'proposal-title';
    this.proposalState = 'proposal-state';
    this.stateFilterBtn = 'state-filter-btn';
    this.actionFilterBtn = 'action-filter-btn';
    this.currencyFilterBtn = 'currency-filter-btn';
    this.stateFilterOption = 'state-dropdown-option';
    this.actionFilterOption = 'action-dropdown-option';
    this.currencyFilterOption = 'currency-dropdown-option';
    this.searchbarBtn = 'search-btn-all-proposals';
    this.searchbarInputField = 'search-bar-all-proposals';
    this.proposalPageTitle = 'proposal-page-title';
    this.proposalPageBackButton = 'proposal-back-btn';
    this.creatorName = 'creator-address-name';
    this.createProposalButton = 'create-proposal-btn';
    // Discussions
    this.allDiscussionPage = 'all-discussions-page';
    this.firstDiscussionCard = 'discussion-card';
    this.firstDiscussionCreator = 'discussion-creator';
    this.firstDiscussionTitle = 'discussion-title';
    this.discussionPageTitle = 'discussion-page-title';
    this.discussionPageDescription = 'discussion-page-description';
    this.createDiscussionButton = 'create-discussion-btn';
    this.discussionPageBackButton = 'discussion-back-btn';
  }


  checkIfYouAreOnSelectedGuildPage(guildName) {
    cy.findAllByTestId(this.guildName).contains(guildName);
  };

  // Governance page
  checkIfYouAreOnGovernancePage() {
    cy.findByTestId(this.governancePage)
      .contains('Governance')
      .should('have.css', 'color', 'rgb(222, 255, 78)');
    cy.findByTestId(this.createDiscussionButton).should('be.visible');
  };

  // If there are no Active or Executable proposals there should be message with hyperlink
  checkProposalsOnGovernancePage() {
    cy.get('[data-testid="proposals-list"]').then($el => {
      if ($el.text().includes('There are no active proposals.')) {
        cy.findByTestId(this.noActiveProposalsMessage)
          .should('be.visible')
          .contains('There are no active proposals. Go to all proposals page.');
        this.goToAllProposalsPageViaHyperlink();
        this.checkIfYouAreOnAllProposalsPage();
      } else {
        cy.findAllByTestId(this.proposalCard).first().should('be.visible');
        cy.findAllByTestId(this.proposalState)
          .first()
          .contains(/Active|Executable/);
      };
    });
  };

  // All Proposals page
  goToAllProposalsPageFromSidebar() {
    cy.findByTestId(this.allProposalsPage).contains('All proposals').click();
  };

  goToAllProposalsPageViaHyperlink() {
    cy.findByTestId(this.allProposalsPageHyperlink)
      .contains('Go to all proposals page.')
      .click();
  };

  checkIfYouAreOnAllProposalsPage() {
    cy.findByTestId(this.allProposalsPage)
      .contains('All Proposals')
      .should('have.css', 'color','rgb(222, 255, 78)'
    );
  };

  checkStateFilterOptions() {
    cy.findByTestId(this.stateFilterBtn).contains('State').click();

    stateFilterOptions.forEach((option, i) => {
      cy.findAllByTestId(this.stateFilterOption)
      .eq(i)
      .contains(option)
    });
  };

  checkActionFilterOptions() {
    cy.findByTestId(this.actionFilterBtn).contains('Action').click();

    actionFilterOptions.forEach((option, i) => {
      cy.findAllByTestId(this.actionFilterBtn)
      .eq(i)
      .contains(option)
    });
  };

  checkCurrencyFilterOptions() {
    cy.findByTestId(this.currencyFilterBtn).contains('Currency').click();
    
    currencyFilterOptions.forEach((option, i) => {
      cy.findAllByTestId(this.currencyFilterBtn)
      .eq(i)
      .contains(option)
    });
  };

  checkSearchbarOnAllProposalPage() {
    cy.findByTestId(this.searchbarBtn).should('be.visible').click();
    cy.findByTestId(this.searchbarInputField)
      .should('be.visible')
      .get('input[placeholder="Search proposal"]');
  };

   // TODO: improve with assertion of proposal creator
  goToFirstProposalPage() {
    cy.findAllByTestId(this.firstProposalTitle).first().click();
  };

  returnToGuildPageFromProposalPage() {
    cy.findByTestId(this.proposalPageBackButton).should('be.visible').click();
  };

  // All Discussions page
  goToAllDiscussionPage() {
    cy.findByTestId(this.allDiscussionPage).should('be.visible').click();
  };

  checkIfYouAreOnAllDiscussionPage() {
    cy.findByTestId(this.allDiscussionPage)
      .contains('All Discussions')
      .should('have.css', 'color','rgb(222, 255, 78)'
    );
    cy.findByTestId(this.createDiscussionButton).should('be.visible');
  };

  // TODO: improve with assertion of discussion creator
  goToFirstDiscussionPage() {
    cy.findAllByTestId(this.firstDiscussionTitle).should('be.visible').click();
  };

  returnToGuildPageFromDiscussionPage() {
    cy.findByTestId(this.discussionPageBackButton).should('be.visible').click();
  };

  // Proposal page
  checkIfYouAreOnProposalPage() {
    cy.findByTestId(this.proposalPageTitle).should('be.visible');
    cy.findByTestId(this.creatorName).should('be.visible');
  };

  goToCreateProposalPage() {
    cy.findByTestId(this.createProposalButton).should('be.visible').click();
  };

  // Discussion page
  checkIfYouAreOnDiscussionPage() {
    cy.findByTestId(this.discussionPageTitle).should('be.visible');
    cy.findByTestId(this.creatorName).should('be.visible');
    cy.findByTestId(this.createProposalButton).should('be.visible');
  };
};

const anyGuildPage: AnyGuildPage = new AnyGuildPage();

export default anyGuildPage;
