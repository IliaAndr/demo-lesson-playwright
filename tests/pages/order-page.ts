import { type Locator, type Page } from '@playwright/test'
import { BasePage } from './base-page'

export class OrderPage extends BasePage {
  readonly statusButton: Locator
  readonly name: Locator
  readonly phone: Locator
  readonly comment: Locator
  readonly orderButton: Locator
  readonly logoutButton: Locator
  readonly logo: Locator
  readonly popUpWindow: Locator
  readonly okButtonInPopUpWindow: Locator
  readonly searchOrderSubmitButton: Locator
  readonly orderSearchField: Locator
  readonly titleField: Locator
  readonly trackingText: Locator

  constructor(page: Page) {
    super(page)
    this.statusButton = page.getByTestId('openStatusPopup-button')
    this.name = page.getByTestId('username-input')
    this.phone = page.getByTestId('phone-input')
    this.comment = page.getByTestId('comment-input')
    this.orderButton = page.getByTestId('createOrder-button')
    this.logoutButton = page.getByTestId('logout-button')
    this.logo = page.locator('.logo_main')
    this.popUpWindow = page.getByTestId('orderSuccessfullyCreated-popup')
    this.okButtonInPopUpWindow = page.getByTestId('orderSuccessfullyCreated-popup-ok-button')
    this.searchOrderSubmitButton = page.getByTestId('searchOrder-submitButton')
    this.orderSearchField = page.locator('.order-search-popup__input')
    this.titleField = page.locator('h1.title')
    this.trackingText = this.popUpWindow.locator('span.notification-popup__text')
  }
}
