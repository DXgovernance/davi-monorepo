//
// Filename: CreateProposalPage.ts
//

class CreateProposalPage {
    closeModal_Button() {return cy.findByTestId('close-modal')}
    public backToOverviewButton: string;
    public proposalTitleInput: string;
    public proposalDescriptionInput: string;
    public addOptionButotn: string;
    public addActionButton: string;
    public editActionButton: string;
    public modalTitle: string;
    public actionList: string;
    public transferActionButton: string;
    public setPermissionActionButton: string;
    public mintREPActionButton: string;
    public updateENSContentActionButton: string;
    public setGuildConfigActionButton: string;
    public externalContractActionButton: string;
    public expandAdvancedOptionsArrowButton: string;
    public rawTransactionActionButton: string;
    public createProposalActionButton: string;
    public proposalEditorToggleButton: string;


    constructor() {
        this.backToOverviewButton = 'back-to-overview-btn';
        this.proposalTitleInput = 'proposal-title-input';
        this.proposalDescriptionInput = 'proposal-description-input';
        this.addOptionButotn = 'add-option-btn';
        this.addActionButton = 'add-action-btn';
        this.editActionButton = 'edit-action-btn';
        this.modalTitle = 'modal-title';
        this.actionList = 'actions-modal-contract-list';
        this.transferActionButton = 'erc20transfer-action';
        this.setPermissionActionButton = 'set-permission-action';
        this.mintREPActionButton = 'rep-mint-action';
        this.updateENSContentActionButton = 'ens-update-content-action';
        this.setGuildConfigActionButton = 'set-guild-config-action';
        this.externalContractActionButton = 'external-contracts-action';
        this.expandAdvancedOptionsArrowButton = 'advanced-option-arrow-btn';
        this.rawTransactionActionButton = 'raw-transaction-action';
        this.createProposalActionButton = 'create-proposal-action-button';
        this.proposalEditorToggleButton = 'create-proposal-editor-toggle-button';
    }

    checkIfYouAreOnProposalCreationPage() {
        cy.findByTestId(this.proposalTitleInput).should('be.visible');
        cy.findByTestId(this.proposalDescriptionInput).should('be.visible');
        cy.findByTestId(this.createProposalActionButton).should('be.disabled');
        this.checkAddActionModal();
        this.checkAddOptionModal();
    };

    checkAddActionModal() {
        cy.findByTestId(this.addActionButton).should('be.visible').click();
        cy.findByTestId(this.modalTitle).should('be.visible').contains('Add Action');
        cy.findByTestId(this.actionList).should('be.visible');
        this.closeModal()
    };

    checkAddOptionModal() {
        cy.findByTestId(this.addOptionButotn).should('be.visible').click();
        cy.findByTestId(this.modalTitle).should('be.visible').contains('Add Option');
        this.closeModal()
    };

    closeModal() {
        this.closeModal_Button().click()
    }

    returnToGuildPageFromCreateProposalPage() {
        cy.findByTestId(this.backToOverviewButton).should('be.visible').click();
    };
};

const createProposalPage: CreateProposalPage = new CreateProposalPage();

export default createProposalPage;
