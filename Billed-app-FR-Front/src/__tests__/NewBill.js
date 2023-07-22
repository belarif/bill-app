/**
 * @jest-environment jsdom
 */

import NewBill from "../containers/NewBill";
import NewBillUI from "../views/NewBillUI";

describe('Given i am connected as an employee', () => {
  describe('When i am on new bill page', () => {
    test('That NewBill class is instantiable', () => {
      const html = NewBillUI()
      document.body.innerHTML = html
      const newBillObjet = new NewBill({ document, onNavigate : {}, store : {}, localStorage : {}});
      expect(newBillObjet).toBeInstanceOf(NewBill);
    })
  })
})