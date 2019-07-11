export const updateObject = (oldObject, updatedValues) => {
  return {
    ...oldObject,
    ...updatedValues
  };
};

export const checkValidation = (value, rules) => {
  let isValid = true;
  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.isEmail) {
    const rule = /[@]/;
    isValid = rule.test(value) && isValid;
  }
  return isValid;
};

// const updatedControls = {
//   ...this.state.controls,
//   [controlName]: {
//     ...this.state.controls[controlName],
//     value: event.target.value,
//     valid: this.checkValidation(
//       event.target.value,
//       this.state.controls[controlName].validation
//     ),
//     touched: true
//   }
// };
// this.setState({ controls: updatedControls });

// const updatedOrderForm = { ...this.state.orderForm };
// const updatefFormElement = {
//   ...updatedOrderForm[inputIdentifier]
// };
// updatefFormElement.value = event.target.value;
// updatefFormElement.valid = this.checkValidation(
//   updatefFormElement.value,
//   updatefFormElement.validation
// );
// updatefFormElement.touched = true;
// updatedOrderForm[inputIdentifier] = updatefFormElement;
