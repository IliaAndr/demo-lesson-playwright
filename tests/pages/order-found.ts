import { BasePage } from './base-page'
import { type Locator, type Page } from '@playwright/test'

export class OrderFound extends BasePage {
  readonly input: Locator
  readonly orderInformationName: Locator
  readonly orderInformationPhone: Locator
  readonly orderInformationComment: Locator
  readonly buttonStatus: Locator
  readonly buttonLogOut: Locator

  constructor(page: Page) {
    super(page)
    this.input = page.locator('input')
    //this.orderInformationName = page.locator('.order-details__input')
    //this.orderInformationPhone = page.locator('.order-list__title')
    //this.orderInformationComment = page.locator('.order-list__description')
    this.orderInformationName = page.getByTestId('order-item-0')
    this.orderInformationPhone = page.getByTestId('order-item-1')
    this.orderInformationComment = page.getByTestId('order-item-2')
    this.buttonStatus = page.locator('.header__button_check-order')
    this.buttonLogOut = page.locator('.header__button_exit')
  }
}
