import validateNumber from '../validateNumber.js';
import payCompany from '../payCompany.js';
import chooseImg from '../chooseImg.js';

import american_express_curved from '../../img/american_express_curved.png';
import diners_club from '../../img/diners_club.png';
import discover_curved from '../../img/discover_curved.png';
import jcb from '../../img/jcb.png';
import mastercard_curved from '../../img/mastercard_curved.png';
import mir from '../../img/mir.png';
import visa_curved from '../../img/visa_curved.png';

export default class Widget {
  constructor(parent) {
    this.parentElement = parent;
    this.inputValue = '';
  }

  static get drawForm() {
    return `
      <div class='widget'>
      <form class='valid-form'>
        <div class='img'>
          <div class="image-card" id='american'><img src='${american_express_curved}'></div>
          <div class="image-card" id='diners-club'><img src='${diners_club}'></div>
          <div class="image-card" id='discover'><img src='${discover_curved}'></div>
          <div class="image-card" id='jcb'><img src='${jcb}'></div>
          <div class="image-card" id='mastercard'><img src='${mastercard_curved}'></div>
          <div class="image-card" id='mir'><img src='${mir}'></div>
          <div class="image-card" id='visa'><img src='${visa_curved}'></div>
        </div>
        <input type="text" id="input">
        <button id="valid-button">Click to Validate</button>
      </form>
    </div>
    `;
  }

  addToPage() {
    this.parentElement.innerHTML = this.constructor.drawForm;
    const form = this.parentElement.querySelector('.valid-form');
    this.inputValue = this.parentElement.querySelector('[id=input]');
    form.addEventListener('submit', (event) => {
      this.submitForm(event);
    });
    this.inputValue.addEventListener('keypress', (event) => {
      this.keyPressForm(event);
    });
    this.inputValue.addEventListener('input', () => {
      this.inputForm();
    });
  }

  validateCard(digits) {
    if (digits.length < 1 || !validateNumber(digits)) {
      this.inputValue.className = 'invalid';
      return;
    }
    this.inputValue.className = 'valid';
  }

  submitForm(event) {
    event.preventDefault();
    this.validateCard(this.inputValue.value);
  }

  keyPressForm(event) {
    event.preventDefault();
    if (event.key.search(/\d/) !== -1) {
      this.inputValue.value += event.key;
      chooseImg(payCompany(this.inputValue.value));
    }

    if (event.key === 'Enter') {
      this.validateCard(this.inputValue.value);
    }
  }
}
