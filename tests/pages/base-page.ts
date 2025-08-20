import { type Locator, type Page } from '@playwright/test'

export abstract class BasePage {
  readonly page: Page
  readonly languageSwitcher: Locator
  readonly privacyPolicyLink: Locator
  readonly cookiePolicyLink: Locator
  readonly termsOfServiceLink: Locator

  protected constructor(page: Page) {
    this.page = page
    this.languageSwitcher = page.locator('div.language')
    this.privacyPolicyLink = page.getByTestId('privacy-policy')
    this.cookiePolicyLink = page.getByTestId('cookie-policy')
    this.termsOfServiceLink = page.getByTestId('terms-of-service')
  }
}
