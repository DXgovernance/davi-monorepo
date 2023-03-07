//
// Filename: CreateDiscussionTest.spec.ts
//

/// <reference types="cypress" />

import Guilds from '../../support/pageObjects/Guilds';
import AnyGuildPage from '../../support/pageObjects/AnyGuildPage';
import LandingPage from '../../support/pageObjects/LandingPage';
import CreateDiscussionPage from '../../support/pageObjects/CreateDiscussionPage';
import CreateProposalPage from '../../support/pageObjects/CreateProposalPage';
import { ACCOUNTS } from '../../utils/constants';
import { data } from '../../utils/constants'
const url = Cypress.config().baseUrl;

describe('Check create discussion', () => {
    before(() => {
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

    it(`Visit first Guild on Local network`, () => {
        LandingPage.goToFirstGuild()
    });

    it('Check All Discussions page', () => {
        AnyGuildPage.goToAllDiscussionPage();
        AnyGuildPage.checkIfYouAreOnAllDiscussionPage();
    });

    it('Create Discussion on Local network', () => {
        AnyGuildPage.createDiscussion_Button().click()
        cy.confirmMetamaskSignatureRequest()
        CreateDiscussionPage.enterTitle(data.discussionTitle)
        CreateDiscussionPage.enterDiscussionDescription(data.discussionDescription)
        CreateDiscussionPage.clickCreateDiscussion()
    });

    it('Check All Discussions page', () => {
        AnyGuildPage.goToAllDiscussionPage();
        AnyGuildPage.checkIfYouAreOnAllDiscussionPage();
    });

    it('Check if newly created discussion is showing', () => {
        CreateDiscussionPage.clickNewDiscussion(data.discussionTitle)
        AnyGuildPage.checkDiscussionName(data.discussionTitle)
        AnyGuildPage.checkDiscussionDescription(data.discussionDescription)
    });

    it('Click on create proposal', () => {
        CreateProposalPage.clickOnCreateProposalButton()
        cy.confirmMetamaskSignatureRequest()
    });

    it('Check proposal title proposal', () => {
        CreateProposalPage.checkProposalTitle(data.discussionTitle)
    });

    it('Edit proposal title and description', () => {
        CreateProposalPage.enterProposalTitle(data.proposalTitle)
        CreateProposalPage.enterProposalDescription(data.proposalDescription)
    });

    it('Click on add action', () => {
        CreateProposalPage.clickAddActionButton()
    });

    it('Click on transfer action', () => {
        CreateProposalPage.clickTransferActionButton()
    });

    it('Enter Etherum address', () => {
        CreateProposalPage.enterTransferEthereumAddress(ACCOUNTS[0].address)
    });

    it('Click on create proposal', () => {
        CreateProposalPage.enterTransferEthereumAmount(data.ethereumAmount)
    });

    it('Click on token dropdown', () => {
        CreateProposalPage.clickTokenDropdown()
    });

    it('Choose ETH Token', () => {
        CreateProposalPage.chooseETHToken()
    });

    it('Click on save transfer action', () => {
        CreateProposalPage.clickSaveTransferAction()
    });

    it('Click on create proposal', () => {
        CreateProposalPage.clickOnCreateProposal()
    });

    it('Go to all proposals', () => {
        AnyGuildPage.goToFirstProposalPage();
        AnyGuildPage.checkIfYouAreOnProposalPage();
    });

    it('Check if newly created propposal is showing', () => {
        CreateProposalPage.clickNewProposal(data.proposalTitle)
        AnyGuildPage.checkProposalName(data.proposalTitle)
        AnyGuildPage.checkProposalDescription(data.proposalDescription)
    });

});
