//
// Filename: CreateProposalPage.ts
//

class CreateProposalPage {
    backToOverviewButton() { return cy.findAllByTestId('back-to-overview-btn') }
    proposalTitle_Field() { return cy.findAllByTestId('proposal-title-input') }
    proposalDescription_Field() { return cy.findAllByTestId('proposal-description-input') }
    addOption_Butotn() { return cy.findAllByTestId('add-option-btn') }
    addAction_Button() { return cy.findAllByTestId('add-action-btn') }
    editActionButton() { return cy.findAllByTestId('edit-action-btn') }
    modalTitle() { return cy.findAllByTestId('modal-title') }
    actionList() { return cy.findAllByTestId('actions-modal-contract-list') }
    transferAction_Button() { return cy.findAllByTestId('erc20transfer-action') }
    setPermissionActionButton() { return cy.findAllByTestId('set-permission-action') }
    mintREPActionButton() { return cy.findAllByTestId('rep-mint-action') }
    updateENSContentActionButton() { return cy.findAllByTestId('ens-update-content-action') }
    setGuildConfigActionButton() { return cy.findAllByTestId('set-guild-config-action') }
    externalContractActionButton() { return cy.findAllByTestId('external-contracts-action') }
    expandAdvancedOptionsArrowButton() { return cy.findAllByTestId('advanced-option-arrow-btn') }
    rawTransactionActionButton() { return cy.findAllByTestId('raw-transaction-action') }
    createProposalAction_Button() { return cy.findAllByTestId('create-proposal-action-button') }
    proposalEditorToggleButton() { return cy.findAllByTestId('create-proposal-editor-toggle-button') }
    createProposal_Button() { return cy.findAllByTestId('create-proposal-button') }
    transferEthereumAddress_Field() { return cy.findByTestId('address input') }
    transferAmount_Field() { return cy.get('[name="amount"]') }
    transferToken_Dropdown() { return cy.get('[placeholder="Token"]') }
    saveTransferAction_Button() { return cy.findByTestId('submit-erc20transfer') }

    //Metods
    clickOnCreateProposalButton() {
        this.createProposal_Button().click()
    }

    checkProposalTitle(title) {
        this.proposalTitle_Field().should('include.value', title)
    }

    enterProposalTitle(proposalTitle) {
        this.proposalTitle_Field().clear().type(proposalTitle)
    }

    enterProposalDescription(description) {
        this.proposalDescription_Field().clear().type(description)
    }

    clickAddActionButton() {
        this.addAction_Button().click()
    }

    clickTransferActionButton() {
        this.transferAction_Button().click()
    }

    enterTransferEthereumAddress(address) {
        this.transferEthereumAddress_Field().type(address)
    }

    enterTransferEthereumAmount(amount) {
        this.transferAmount_Field().type(amount)
    }

    clickTokenDropdown() {
        this.transferToken_Dropdown().click()
    }

    chooseETHToken() {
        cy.contains('ETH').click()
    }

    clickSaveTransferAction() {
        this.saveTransferAction_Button().click()
    }

    clickOnCreateProposal() {
        this.createProposalAction_Button().click()
    }

    checkIfYouAreOnProposalCreationPage() {
        this.proposalTitle_Field().should('be.visible');
        this.proposalDescription_Field().should('be.visible');
        this.createProposalAction_Button().should('be.disabled');
        this.checkAddActionModal();
        this.checkAddOptionModal();
    };

    checkAddActionModal() {
        this.addAction_Button().should('be.visible').click();
        this.modalTitle().should('be.visible').contains('Add Action');
        this.actionList().should('be.visible');
        cy.closeModal()
    };

    checkAddOptionModal() {
        this.addOption_Butotn().should('be.visible').click();
        this.modalTitle().should('be.visible').contains('Add Option');
        cy.closeModal()
    };

    returnToGuildPageFromCreateProposalPage() {
        this.backToOverviewButton().should('be.visible').click();
    };

    clickNewProposal(proposalName) {
        cy.contains(proposalName).click()
    }
};

const createProposalPage: CreateProposalPage = new CreateProposalPage();

export default createProposalPage;
