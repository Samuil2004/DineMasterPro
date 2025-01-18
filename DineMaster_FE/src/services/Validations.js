const validateDecimal = (value) => {
  const decimalPattern = /^\d{1,4}(\.\d{1,2})?$/; // up to 4 digits, 2 decimals
  return (
    decimalPattern.test(value) ||
    "Must be a valid decimal with up to 4 digits total and 2 decimals."
  );
};

const validateDutchPhoneNumber = (value) => {
  const cleanedPhoneNumber = value.replace(/\s+/g, "");

  const dutchPhonePattern = /^\+31[0-9]{9}$/;
  return (
    dutchPhonePattern.test(cleanedPhoneNumber) ||
    "Invalid phone number. Must contain exactly 10 digits.\n eg:+31XXXXXXXXX"
  );
};

const validateDutchPostalCode = (value) => {
  const cleanedValue = value.replace(/\s+/g, "");

  const dutchPostalCode = /^[1-9][0-9]{3}\s?[A-Z]{2}$/;
  return (
    dutchPostalCode.test(cleanedValue) || "Must be a valid Dutch postal code."
  );
};
const requiredField = () => ({
  required: "This field is required",
});

const alphaPattern = () => ({
  pattern: {
    value: /^[A-Za-z\s,]+$/i,
    message: "Alphabetical characters only",
  },
});

const maxLength = (max) => ({
  maxLength: {
    value: max,
    message: `Cannot exceed ${max} characters`,
  },
});

const minMaxValue = (min, max) => ({
  min: { value: min, message: `Must be at least ${min}` },
  max: { value: max, message: `Must not exceed ${max}` },
});

const validateEmail = (value) => {
  const validEmailPattern =
    /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;
  return validEmailPattern.test(value) || "Invalid email format";
};

const validatePassword = (value) => {
  const validPasswordPattern =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;

  if (value.length < 8 || value.length > 16) {
    return "Password must be between 8 and 16 characters.";
  }
  if (!/[a-z]/.test(value)) {
    return "Password must include at least one lowercase letter.";
  }
  if (!/[A-Z]/.test(value)) {
    return "Password must include at least one uppercase letter.";
  }
  if (!/[0-9]/.test(value)) {
    return "Password must include at least one number.";
  }
  if (!/\W/.test(value)) {
    return "Password must include at least one special character.";
  }
  if (/\s/.test(value)) {
    return "Password must not contain any spaces.";
  }

  return validPasswordPattern.test(value);
};

export {
  validateDecimal,
  requiredField,
  alphaPattern,
  maxLength,
  minMaxValue,
  validateDutchPhoneNumber,
  validateDutchPostalCode,
  validateEmail,
  validatePassword,
};
