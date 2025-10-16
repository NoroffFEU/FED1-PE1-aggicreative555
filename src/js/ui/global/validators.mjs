//Username: Letters, numbers, spaces, dashes allowed
export function isValidUserName(val) {
  return /^[a-zA-Z0-9_]{1,30}$/.test(val.trim());
}

//Email: Noroff/stud.noroff only
export function isValidEmail(val) {
  return /^[\w\-.]+@(stud\.)?noroff\.no$/.test(val);
}

//Password: 8–30 chars
export function isValidPassword(val) {
  return typeof val === "string" && val.length >= 8 && val.length <= 30;
}

//Confirm Password: Matches original password
export function isValidConfirmPassword(confirmInput, originalInput) {
  return function () {
    return confirmInput.value === originalInput.value;
  };
}

//Name: Letters and a space allowed
export function isValidName(val) {
  return /^[A-Za-z ]{2,30}$/.test(val.trim());
}
