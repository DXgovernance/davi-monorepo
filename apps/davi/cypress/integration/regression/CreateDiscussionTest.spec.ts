//
// Filename: CreateDiscussionTest.spec.ts
//

/// <reference types="cypress" />

import LandingPage from '../../support/pageObjects/LandingPage';
import Guilds from '../../support/pageObjects/Guilds';
import AnyGuildPage from '../../support/pageObjects/AnyGuildPage';
import CreateDiscussionPage from '../../support/pageObjects/CreateDiscussionPage';
import { clickAnywhereToClose, gnosisNetworkGuilds } from '../../utils';
import { data } from '../../utils/constants'
const url = Cypress.config().baseUrl;

describe('Check create discussion', () => {
    before(() => {
        cy.visit(url);
    });

    it('Click connect wallet and choose metamask', () => {
        Guilds.clickOpenWalletModalBtn();
        cy.contains('MetaMask').eq(0).click();
    });

    it('Accept metamask access', () => {
        cy.acceptMetamaskAccess().should("be.true");
        clickAnywhereToClose();
    });

    it('Go to gnosis network', () => {
        LandingPage.goToGnosisNetwork();
    });

    it('Allow gnosis network', () => {
        cy.allowMetamaskToAddNetwork()
    });

    it('Allow to switch to gnosis', () => {
        cy.allowMetamaskToSwitchNetwork()
    });

    it(`Visit first Guild on Gnosis network`, () => {
        LandingPage.goToGuildPage(gnosisNetworkGuilds[0], 0);
        AnyGuildPage.checkIfYouAreOnSelectedGuildPage(gnosisNetworkGuilds[0])
    });

    it('Create Discussion on Gnosis network', () => {
        AnyGuildPage.createDiscussion_Button().click()
        cy.confirmMetamaskSignatureRequest()
        CreateDiscussionPage.enterTitle(data.discussionTitle)
        CreateDiscussionPage.enterDiscussionDescription(data.discussionDescription)
        CreateDiscussionPage.clickCreateDiscussion()
    });

    it('Check if newly created discussion is showing', () => {
        CreateDiscussionPage.clickNewDiscussion(data.discussionTitle)
        AnyGuildPage.checkDiscussionName(data.discussionTitle)
        AnyGuildPage.checkDiscussionDescription(data.discussionDescription)
    });

});
