import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { faker } from '@faker-js/faker/locale/ar'
import { PASSWORD, USERNAME } from '../../config/env-data'
import { OrderNotFound } from '../pages/order-not-found'
import { AuthorizedPage } from '../pages/authorized-page'
import { OrderFound } from '../pages/order-found'

let authPage: LoginPage

test.beforeEach(async ({ page }) => {
  authPage = new LoginPage(page)
  await authPage.open()
})

test('signIn button disabled when incorrect data inserted', async ({}) => {
  await authPage.usernameField.fill(faker.lorem.word(2))
  await authPage.passwordField.fill(faker.lorem.word(7))
  await expect.soft(authPage.signInButton).toBeDisabled()
  await expect.soft(authPage.titleField).toBeVisible()
})

test('error message displayed when incorrect credentials used', async ({}) => {
  await authPage.usernameField.fill(faker.lorem.word(2))
  await authPage.passwordField.fill(faker.lorem.word(8))
  await authPage.signInButton.click()
  await expect.soft(authPage.popUpWindowWhenIncorrectData).toBeVisible()
  await expect.soft(authPage.popUpWindowWhenIncorrectData).toHaveText('×Incorrect credentials')
})

test('login with correct credentials and verify order creation page', async ({}) => {
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await expect.soft(orderCreationPage.statusButton).toBeVisible()
  await expect.soft(orderCreationPage.orderButton).toBeVisible()
  await expect.soft(orderCreationPage.name).toBeVisible()
  await expect.soft(orderCreationPage.phone).toBeVisible()
  await expect.soft(orderCreationPage.comment).toBeVisible()
  await expect.soft(orderCreationPage.logoutButton).toBeVisible()
  await expect.soft(orderCreationPage.logo).toBeVisible()
  await expect.soft(orderCreationPage.languageSwitcher).toBeVisible()
  await expect.soft(orderCreationPage.cookiePolicyLink).toBeVisible()
  await expect.soft(orderCreationPage.privacyPolicyLink).toBeVisible()
  await expect.soft(orderCreationPage.termsOfServiceLink).toBeVisible()
})

test('login and create order', async ({}) => {
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  const phoneNumber = '+' + faker.string.numeric(10)
  await orderCreationPage.name.fill(faker.lorem.word(6))
  await orderCreationPage.phone.fill(phoneNumber)
  await orderCreationPage.comment.fill(faker.lorem.word(4))
  await orderCreationPage.orderButton.click()
  await expect.soft(orderCreationPage.popUpWindow).toBeVisible()
  await expect
    .soft(orderCreationPage.popUpWindow)
    .toHaveText('×Order has been created!Tracking code: undefinedok')
})

test('logout', async ({}) => {
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.logoutButton.click()
  const userInputText = await authPage.usernameField.getAttribute('placeholder')
  await expect.soft(authPage.signInButton).toBeVisible()
  expect.soft(userInputText).toBe('Login')
})

test('order not found page elements are visible', async ({ page }) => {
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.statusButton.click()
  await orderCreationPage.orderSearchField.fill('0000')
  await orderCreationPage.searchOrderSubmitButton.click()
  const orderNotFoundPage = new OrderNotFound(page)
  await expect.soft(orderNotFoundPage.orderNotFoundTitle).toBeVisible()
})

test('created order is found by its number and the data corresponds to the order number', async ({
  page,
}) => {
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  const name = faker.lorem.word(6)
  const phoneNumber = '+' + faker.string.numeric(10)
  const comment = faker.lorem.word(4)
  await orderCreationPage.name.fill(name)
  await orderCreationPage.phone.fill(phoneNumber)
  await orderCreationPage.comment.fill(comment)
  await orderCreationPage.orderButton.click()
  await expect(orderCreationPage.popUpWindow).toBeVisible()
  await expect(orderCreationPage.trackingText).toHaveText(/Tracking code: \d+/)
  const trackingNumber = await orderCreationPage.trackingText.innerText()
  const match = trackingNumber.match(/\d+/)

  let trackingCode = null
  if (match) {
    trackingCode = match[0]
  }
  if (!trackingCode) throw new Error('Tracking code not found!')
  await orderCreationPage.okButtonInPopUpWindow.click()
  const authorizedPage = new AuthorizedPage(page)
  await authorizedPage.buttonStatus.click()
  await authorizedPage.inputOrderNumber.fill(trackingCode)
  await authorizedPage.trackingOrderButton.click()
  const orderFound = new OrderFound(page)
  await orderFound.orderInformationName.waitFor({ state: 'visible', timeout: 10000 })
  expect.soft(orderFound.orderInformationName).toContainText(name)
  expect.soft(orderFound.orderInformationPhone).toContainText(phoneNumber)
  expect.soft(orderFound.orderInformationComment).toContainText(comment)
})
