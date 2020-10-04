import payCompany from '../payCompany.js';

test.each([
  ['American Express', '378282246310005', 'american'],
  ['Master Card', '5105105105105100', 'mastercard'],
  ['Master Card', '145613828621613', false],
])(('Тест платежной системы %s'), (_, input, expected) => {
  expect(payCompany(input)).toBe(expected);
});
