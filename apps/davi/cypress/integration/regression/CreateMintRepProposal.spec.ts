//
// Filename: CreateMintRepProposal.spec.ts
//

/// <reference types="cypress" />

import Guilds from '../../support/pageObjects/Guilds';
import AnyGuildPage from '../../support/pageObjects/AnyGuildPage';
import LandingPage from '../../support/pageObjects/LandingPage';
import CreateDiscussionPage from '../../support/pageObjects/CreateDiscussionPage';
import CreateProposalPage from '../../support/pageObjects/CreateProposalPage';
import { ACCOUNTS, data } from '../../utils/constants';
import { localhostGuilds } from '../../utils';
const url = Cypress.config().baseUrl;

describe('Create mint rep proposal', () => {
    before(() => {
        cy.resetMetamaskAccount()
        cy.visit(url);
    });

    it('Click connect wallet and choose metamask', () => {
        Guilds.clickOpenWalletModalBtn();
        LandingPage.chooseMetamaskWallet()
    });

    it('Accept metamask access', () => {
        cy.acceptMetamaskAccess(false).should("be.true");
        cy.closeModal()
    });

    it(`Visit Localhost Guild on Local network`, () => {
        LandingPage.goToGuildPage(localhostGuilds[5])
    });

    it('Check All Discussions page', () => {
        AnyGuildPage.goToAllDiscussionPage();
        AnyGuildPage.checkIfYouAreOnAllDiscussionPage();
    });

    it('Go to Automation Discussion page', () => {
        CreateDiscussionPage.clickOnDiscussionWithTitle(data.automationDiscussionTitle)
        AnyGuildPage.checkDiscussionName(data.automationDiscussionTitle)
        AnyGuildPage.checkDiscussionDescription(data.automationDiscussionDescription)
    });

    it('Click on create proposal on Discussion page', () => {
        CreateProposalPage.clickOnCreateProposalButton()
        cy.confirmMetamaskSignatureRequest()
    });

    it('Check title of newly proposal', () => {
        CreateProposalPage.checkProposalTitle(data.automationDiscussionTitle)
    });

    it('Edit proposal title and description', () => {
        CreateProposalPage.enterProposalTitle(data.proposalTitle)
        CreateProposalPage.enterProposalDescription(data.proposalDescription)
    });

    it('Click on add action', () => {
        CreateProposalPage.clickAddActionButton()
    });

    it('Click on mint rep action', () => {
        CreateProposalPage.clickMintRepActionButton()
    });

    it('Enter Ethereum address', () => {
        CreateProposalPage.enterTransferEthereumAddress(ACCOUNTS[0].address)
    });

    it('Enter Mint reputation in percentage', () => {
        CreateProposalPage.enterMintReputationInPercentage(data.mintRepPercentage)
    });

    it('Click on save mint rep action', () => {
        CreateProposalPage.clickSaveMintRepAction()
    });

    it('Click on create proposal on Proposal page', () => {
        CreateProposalPage.clickOnCreateProposal()
    });

    it('Go to All Proposals page', () => {
        AnyGuildPage.goToFirstProposalPage();
        AnyGuildPage.checkIfYouAreOnProposalPage();
    });

    it('Check if newly created proposal is showing', () => {
        CreateProposalPage.clickNewProposal(data.proposalTitle)
        AnyGuildPage.checkProposalName(data.proposalTitle)
        AnyGuildPage.checkProposalDescription(data.proposalDescription)
    });

});
