//
// Filename: LandingPage.ts
//

import { prodNetworkOptions, walletOptions } from '../../utils';

class LandingPage {
  public projectNameText: string;
  public networkModalBtn: string;
  public networkModalTitle: string;
  public networkModalOptionId: string;
  public walletModalBtn: string;
  public walletModalTitle: string;
  public walletModalOptionId: string;
  public guildName: string;
  public reportABugButton: string;
  public suggestFeatureButton: string;
  public DXgovernanceGitHub: string;

  constructor() {
    this.projectNameText = 'project-name';
    this.networkModalBtn = 'change-network-btn';
    this.networkModalTitle = 'modal-title';
    this.networkModalOptionId = '';
    this.walletModalBtn = 'connect-wallet-btn';
    this.walletModalTitle = 'modal-title';
    this.walletModalOptionId = '';
    this.guildName = 'guild-name';
    this.reportABugButton = 'footer-bug-report';
    this.suggestFeatureButton = 'footer-suggest-feature';
    this.DXgovernanceGitHub = 'footer-davi-repo';
  }

  projectName() {
    cy.findByTestId(this.projectNameText).should('be.visible');
  };

  goToLandingPage() {
    cy.findByTestId(this.projectNameText).click();
  };

  goToGnosisNetwork() {
    cy.findByTestId(this.networkModalBtn).click();
    cy.contains('Gnosis').click();
  };

  openNetworkModal() {
    cy.findByTestId(this.networkModalBtn).should('be.visible').click();
    cy.findByTestId(this.networkModalTitle).contains('Switch Network');
  };

  openWalletModal() {
    cy.findByTestId(this.walletModalBtn).should('be.visible').click();
    cy.findByTestId(this.walletModalTitle).contains('Connect to a wallet');
  };

  goToGuildPage(guildName, i) {
    cy.contains(guildName).click();
  };

  checkWalletOptions() {
    walletOptions.forEach((walletName, i) => {
      cy.findAllByTestId(this.walletModalOptionId)
        .eq(i)
        .contains(walletName)
    });
  };

  checkNetworkOptions() {
    prodNetworkOptions.forEach((networkName, i) => {
      cy.findAllByTestId(this.networkModalOptionId)
        .eq(i)
        .contains(networkName)
    });
  };

  checkFooterLinks() {
    cy.findByTestId(this.reportABugButton).should('be.visible').contains('Report a bug');
    cy.findByTestId(this.suggestFeatureButton).should('be.visible').contains('Suggest a feature');
    cy.findByTestId(this.DXgovernanceGitHub).should('be.visible');
  }

};

const landingPage = new LandingPage();

export default landingPage;
