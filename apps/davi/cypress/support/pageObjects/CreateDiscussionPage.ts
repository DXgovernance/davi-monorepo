//
// Filename: CreateDiscussionPage.ts
//

class CreateDiscussionPage {
    discussionTitle_Field() { return cy.findAllByTestId("create-discussion-title"); }
    discussionContent_Field() { return cy.findAllByTestId("proposal-description-input"); }
    createDiscussion_Button() { return cy.findAllByTestId("create-proposal-action-button"); }

    enterTitle(title) {
        this.discussionTitle_Field().type(title)
    }

    enterDiscussionDescription(description) {
        this.discussionContent_Field().type(description)
    }

    clickCreateDiscussion() {
        this.createDiscussion_Button().click()
    }

    clickNewDiscussion(discussionName) {
        cy.contains(discussionName).click()
    }

};

const createDiscussionPage: CreateDiscussionPage = new CreateDiscussionPage();

export default createDiscussionPage;
