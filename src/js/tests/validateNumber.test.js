import validateNumber from '../validateNumber.js';

test.each([
  ['Успешная проверка номера', '378282246310005', true],
  ['Ошибка в номере', '37828224631', false],
])(('Тест проверки номера %s'), (_, input, expected) => {
  expect(validateNumber(input)).toBe(expected);
});
