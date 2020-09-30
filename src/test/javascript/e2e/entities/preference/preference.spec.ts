import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PreferenceComponentsPage, PreferenceDeleteDialog, PreferenceUpdatePage } from './preference.page-object';

const expect = chai.expect;

describe('Preference e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let preferenceComponentsPage: PreferenceComponentsPage;
  let preferenceUpdatePage: PreferenceUpdatePage;
  let preferenceDeleteDialog: PreferenceDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Preferences', async () => {
    await navBarPage.goToEntity('preference');
    preferenceComponentsPage = new PreferenceComponentsPage();
    await browser.wait(ec.visibilityOf(preferenceComponentsPage.title), 5000);
    expect(await preferenceComponentsPage.getTitle()).to.eq('twentyOnePointsApp.preference.home.title');
    await browser.wait(ec.or(ec.visibilityOf(preferenceComponentsPage.entities), ec.visibilityOf(preferenceComponentsPage.noResult)), 1000);
  });

  it('should load create Preference page', async () => {
    await preferenceComponentsPage.clickOnCreateButton();
    preferenceUpdatePage = new PreferenceUpdatePage();
    expect(await preferenceUpdatePage.getPageTitle()).to.eq('twentyOnePointsApp.preference.home.createOrEditLabel');
    await preferenceUpdatePage.cancel();
  });

  it('should create and save Preferences', async () => {
    const nbButtonsBeforeCreate = await preferenceComponentsPage.countDeleteButtons();

    await preferenceComponentsPage.clickOnCreateButton();

    await promise.all([
      preferenceUpdatePage.setWeeklyGoalInput('5'),
      preferenceUpdatePage.weightUnitsSelectLastOption(),
      preferenceUpdatePage.userSelectLastOption(),
    ]);

    expect(await preferenceUpdatePage.getWeeklyGoalInput()).to.eq('5', 'Expected weeklyGoal value to be equals to 5');

    await preferenceUpdatePage.save();
    expect(await preferenceUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await preferenceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Preference', async () => {
    const nbButtonsBeforeDelete = await preferenceComponentsPage.countDeleteButtons();
    await preferenceComponentsPage.clickOnLastDeleteButton();

    preferenceDeleteDialog = new PreferenceDeleteDialog();
    expect(await preferenceDeleteDialog.getDialogTitle()).to.eq('twentyOnePointsApp.preference.delete.question');
    await preferenceDeleteDialog.clickOnConfirmButton();

    expect(await preferenceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
