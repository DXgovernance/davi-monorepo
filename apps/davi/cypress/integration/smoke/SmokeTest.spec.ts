//
// Filename: SmokeTest.spec.ts
//

/// <reference types="cypress" />

import configDevelopmentJSON from '../../config/development.json';
import LandingPage from '../../support/pageObjects/LandingPage';
import AnyGuildPage from '../../support/pageObjects/AnyGuildPage';
import CreateProposalPage from '../../support/pageObjects/CreateProposalPage';
import { clickAnywhereToClose, ethereumNetworkGuilds, gnosisNetworkGuilds } from '../../utils';


describe('Check Project-DAVI', () => {

    before(() => {
        cy.visit(configDevelopmentJSON.baseUrl);
        LandingPage.goToGnosisNetwork();
    });

    it('Check Wallet options modal', () => {  
        LandingPage.openWalletModal();   
        LandingPage.checkWalletOptions();
        clickAnywhereToClose();
    });

    it('Check Network options modal', () => {  
        LandingPage.openNetworkModal();   
        LandingPage.checkNetworkOptions()
        clickAnywhereToClose();
    });

    it('Check Footer links'), () => {
        LandingPage.checkFooterLinks();
    }

     // Asserting every guild depending on the selected network.
    const prodguilds = [ethereumNetworkGuilds, gnosisNetworkGuilds] 

    prodguilds.forEach((network) => {
        network.forEach((guildName, i) => {
            it(`Visit ${guildName}`, () => {
                LandingPage.goToGuildPage(guildName, i);
                AnyGuildPage.checkIfYouAreOnSelectedGuildPage(guildName)
            });
    
            it('Check Governance page', () => {
                AnyGuildPage.checkIfYouAreOnGovernancePage();
                AnyGuildPage.checkProposalsOnGovernancePage();
            });
    
            it('Check All Proposals page', () => {
                AnyGuildPage.goToAllProposalsPageFromSidebar();
                AnyGuildPage.checkIfYouAreOnAllProposalsPage();
                AnyGuildPage.checkStateFilterOptions();
                AnyGuildPage.checkActionFilterOptions();
                AnyGuildPage.checkCurrencyFilterOptions();
                AnyGuildPage.checkSearchbarOnAllProposalPage();
            });
    
            it('Check first Proposal page', () => {
                AnyGuildPage.goToFirstProposalPage();
                AnyGuildPage.checkIfYouAreOnProposalPage();
                AnyGuildPage.returnToGuildPageFromProposalPage;
            });
    
            it('Check All Discussions page', () => {
                AnyGuildPage.goToAllDiscussionPage();
                AnyGuildPage.checkIfYouAreOnAllDiscussionPage();
            });
    
            it('Check first Discussion page', () => {
                AnyGuildPage.goToFirstDiscussionPage();
                AnyGuildPage.checkIfYouAreOnDiscussionPage();
                AnyGuildPage.returnToGuildPageFromDiscussionPage;
            });
    
            it('Check Create Proposal page', () => {
                AnyGuildPage.goToFirstDiscussionPage();
                AnyGuildPage.goToCreateProposalPage();
                CreateProposalPage.checkIfYouAreOnProposalCreationPage();
                CreateProposalPage.returnToGuildPageFromCreateProposalPage();
            });
    
            it('Return to DAVI Landing Page', () => {
                LandingPage.goToLandingPage()
            });
        });
    })
});
