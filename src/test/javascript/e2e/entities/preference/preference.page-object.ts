import { element, by, ElementFinder } from 'protractor';

export class PreferenceComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-preference div table .btn-danger'));
  title = element.all(by.css('jhi-preference div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class PreferenceUpdatePage {
  pageTitle = element(by.id('jhi-preference-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  weeklyGoalInput = element(by.id('field_weeklyGoal'));
  weightUnitsSelect = element(by.id('field_weightUnits'));

  userSelect = element(by.id('field_user'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setWeeklyGoalInput(weeklyGoal: string): Promise<void> {
    await this.weeklyGoalInput.sendKeys(weeklyGoal);
  }

  async getWeeklyGoalInput(): Promise<string> {
    return await this.weeklyGoalInput.getAttribute('value');
  }

  async setWeightUnitsSelect(weightUnits: string): Promise<void> {
    await this.weightUnitsSelect.sendKeys(weightUnits);
  }

  async getWeightUnitsSelect(): Promise<string> {
    return await this.weightUnitsSelect.element(by.css('option:checked')).getText();
  }

  async weightUnitsSelectLastOption(): Promise<void> {
    await this.weightUnitsSelect.all(by.tagName('option')).last().click();
  }

  async userSelectLastOption(): Promise<void> {
    await this.userSelect.all(by.tagName('option')).last().click();
  }

  async userSelectOption(option: string): Promise<void> {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect(): ElementFinder {
    return this.userSelect;
  }

  async getUserSelectedOption(): Promise<string> {
    return await this.userSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class PreferenceDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-preference-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-preference'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
