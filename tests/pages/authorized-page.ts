import { BasePage } from './base-page'
import { type Locator, type Page } from '@playwright/test'

export class AuthorizedPage extends BasePage {
  readonly buttonStatus: Locator
  readonly buttonLogOut: Locator
  readonly inputOrderNumber: Locator
  readonly trackingOrderButton: Locator
  readonly popUpWindow: Locator

  constructor(page: Page) {
    super(page)
    this.buttonStatus = page.locator('.header__button_check-order')
    this.buttonLogOut = page.locator('.header__button_exit')
    this.inputOrderNumber = page.getByTestId('searchOrder-input')
    this.trackingOrderButton = page.getByTestId('searchOrder-submitButton')
    this.popUpWindow = page.getByTestId('orderSuccessfullyCreated-popup')
  }
}
