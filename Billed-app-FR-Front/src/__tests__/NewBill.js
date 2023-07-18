/**
 * @jest-environment jsdom
 */

import { screen } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"

describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    test("should display, 'Envoyer une note de frais'", () => {
      const html = NewBillUI()
      document.body.innerHTML = html
      expect(screen.getByTestId("title").textContent).toEqual("Envoyer une note de frais")
    })
  })
})
