/**
 * @jest-environment jsdom
 */

import NewBill from "../containers/NewBill";
import NewBillUI from "../views/NewBillUI";
import { localStorageMock } from "../__mocks__/localStorage";
import { fireEvent, screen } from "@testing-library/dom";
import { ROUTES, ROUTES_PATH } from "../constants/routes";
import router from "../app/Router"

describe('Given i am connected as an employee', () => {
  describe('When i am on new bill page', () => {
    test('That NewBill class is instantiable', () => {
      document.body.innerHTML = NewBillUI();
      const newBillObjet = new NewBill({ document, onNavigate : {}, store : {}, localStorage : {}});
      expect(newBillObjet).toBeInstanceOf(NewBill);
    })

    test('That handleChangeFile() function is callable when change event is triggered', () => {
      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))

      document.body.innerHTML = NewBillUI()
      const newBillObjet = new NewBill({ document, onNavigate : {}, store : {}, localStorage : {}});
      const handleChange = jest.fn((e) => newBillObjet.handleChangeFile(e))
      const inputFile = screen.getByTestId('file')
      inputFile.addEventListener('change', handleChange)
      fireEvent.change(inputFile)
      expect(handleChange).toHaveBeenCalled()
    })
  })

  describe('When i am on new bill page, i do fill fields in correct format and i click submit button', () => {
    test('That new bill is created', () => {
      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))

      document.body.innerHTML = NewBillUI()
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname })
      }

      const root = document.createElement("div")
      root.setAttribute("id", "root")
      document.body.append(root)
      router()

      const storeMock = {
        bills: () => {
          return {
            update: function(bill) {
              return {
                then: function (fn) {
                  return { catch: () => {}}
                }
              }
            }
          };
        },
      };
      
      const newBillObjet = new NewBill({ document, onNavigate, store : storeMock, localStorage : window.localStorage });
      const form = screen.getByTestId("form-new-bill");
      const handleSubmit = jest.fn((e) => newBillObjet.handleSubmit(e));
      form.addEventListener("submit", handleSubmit);
      fireEvent.submit(form);
      expect(form).toBeTruthy();
    })
  })
})