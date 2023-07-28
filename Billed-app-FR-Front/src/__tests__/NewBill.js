/**
 * @jest-environment jsdom
 */

import NewBill from "../containers/NewBill";
import NewBillUI from "../views/NewBillUI";
import { localStorageMock } from "../__mocks__/localStorage";
import { fireEvent, screen } from "@testing-library/dom";

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
})