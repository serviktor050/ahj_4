export default function payCompany(digits) {
  let company = false;
  if (digits.search(/^(34|37)/) !== -1) {
    company = 'american';
  } else if (digits.search(/^(36|30[0-5]|3[89]|3095)/) !== -1) {
    company = 'club';
  } else if (digits.search(/^(6[45]|6011)/) !== -1) {
    company = 'discover';
  } else if (digits.search(/^(352[89]|35[3-8][0-9])/) !== -1) {
    company = 'jcb';
  } else if (digits.search(/^(5[1-5])/) !== -1) {
    company = 'mastercard';
  } else if (digits.search(/^(220[0-4])/) !== -1) {
    company = 'mir';
  } else if (digits.search(/^(4)/) !== -1) {
    company = 'visa';
  }
  return company;
}
