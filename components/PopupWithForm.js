import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");

    if (!this._form) {
      throw new Error(
        `Form not found in popup with selector: ${popupSelector}`
      );
    }

    this._inputList = this._form.querySelectorAll(".popup__input");
  }

  // Special method to get the form element
  getForm() {
    return this._form;
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close(); // popup state is reset as needed
      this._form.reset(); // Reset the form fields after submission
    });
  }
}
