import { BasePage } from './base-page'
import { type Locator, type Page } from '@playwright/test'

export class OrderNotFound extends BasePage {
  readonly orderNotFoundTitle: Locator
  readonly orderNotFoundMessage: Locator
  readonly orderNotFoundImage: Locator
  readonly buttonStatus: Locator
  readonly buttonLogOut: Locator

  constructor(page: Page) {
    super(page)
    this.orderNotFoundTitle = page.locator('.not-found__title')
    this.orderNotFoundMessage = page.locator('.not-found__description')
    this.orderNotFoundImage = page.locator('.not-found__image')
    this.buttonStatus = page.locator('.header__button_check-order')
    this.buttonLogOut = page.locator('.header__button_exit')
  }
}
