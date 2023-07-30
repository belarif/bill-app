/**
 * @jest-environment jsdom
 */

import {screen, waitFor, fireEvent} from "@testing-library/dom"
import { bills } from "../fixtures/bills.js"
import Bills from "../containers/Bills.js";
import { ROUTES_PATH, ROUTES} from "../constants/routes.js";
import {localStorageMock} from "../__mocks__/localStorage.js";

import router from "../app/Router.js";
import BillsUI from "../views/BillsUI.js";

describe("Given I am connected as an employee", () => {
  describe("When I am on Bills Page", () => {
    test("Then window icon in vertical layout should be highlighted", async () => {
      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))
      const root = document.createElement("div")
      root.setAttribute("id", "root")
      document.body.append(root)
      router()
      window.onNavigate(ROUTES_PATH.Bills)
      await waitFor(() => screen.getByTestId('icon-window'))
      const windowIcon = screen.getByTestId('icon-window')
      expect(windowIcon).toBeTruthy()
    })

    test("Then bills should be ordered from earliest to latest", () => {
      const billsSorted = [...bills].sort((a, b) => {
        return new Date(a.date) < new Date(b.date) ? 1 : -1;
      });

      const storeMock = {
        bills: () => {
          return {
            list: () => {
              return {
                then: (fn) => fn(bills),
              };
            },
          };
        },
      };
      
      const billsObject = new Bills({
        document,
        onNavigate: {},
        store: storeMock,
        localStorage: {},
      });
      const testBillsSorted = billsObject.getBills();

      expect(testBillsSorted.map((bill) => bill.id)).toEqual(
        billsSorted.map((bill) => bill.id)
      );
    })

    test('That user is redirected to newBill page when he clicks on newBill button', () => {
      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))

      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname });
      };

      document.body.innerHTML = BillsUI({bills})
      const billsObjet = new Bills({ document, onNavigate, store : {}, localStorage : localStorageMock});
      const handleClick = jest.fn(billsObjet.handleClickNewBill)
      const buttonNewBill = screen.getByTestId('btn-new-bill')
      buttonNewBill.addEventListener('click', handleClick)
      fireEvent.click(buttonNewBill)
      expect(handleClick).toHaveBeenCalled()
    })
  })
})
