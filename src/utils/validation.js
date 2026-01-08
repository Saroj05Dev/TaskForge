// Validation regex patterns matching backend
export const VALIDATION_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{8,}$/,
  // Allow letters, spaces, hyphens, apostrophes - must start and end with letter
  fullName: /^[A-Za-z]+(?:[\s'-][A-Za-z]+)*$/,
};

// Validation error messages
export const VALIDATION_MESSAGES = {
  email: {
    required: "Email address is required",
    invalid: "Please enter a valid email address",
  },
  password: {
    required: "Password is required",
    invalid:
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character",
    minLength: "Password must be at least 8 characters long",
  },
  fullName: {
    required: "Full name is required",
    invalid:
      "Full name must contain only letters, spaces, hyphens, and apostrophes",
    minLength: "Full name must be at least 2 characters",
  },
};

// Validate email
export const validateEmail = (email) => {
  if (!email || email.trim() === "") {
    return { isValid: false, error: VALIDATION_MESSAGES.email.required };
  }
  if (!VALIDATION_PATTERNS.email.test(email)) {
    return { isValid: false, error: VALIDATION_MESSAGES.email.invalid };
  }
  return { isValid: true, error: null };
};

// Validate password
export const validatePassword = (password) => {
  if (!password || password.trim() === "") {
    return { isValid: false, error: VALIDATION_MESSAGES.password.required };
  }
  if (password.length < 8) {
    return { isValid: false, error: VALIDATION_MESSAGES.password.minLength };
  }
  if (!VALIDATION_PATTERNS.password.test(password)) {
    return { isValid: false, error: VALIDATION_MESSAGES.password.invalid };
  }
  return { isValid: true, error: null };
};

// Validate full name
export const validateFullName = (fullName) => {
  if (!fullName || fullName.trim() === "") {
    return { isValid: false, error: VALIDATION_MESSAGES.fullName.required };
  }
  if (!VALIDATION_PATTERNS.fullName.test(fullName.trim())) {
    return { isValid: false, error: VALIDATION_MESSAGES.fullName.invalid };
  }
  return { isValid: true, error: null };
};

// Get password strength
export const getPasswordStrength = (password) => {
  if (!password) return { strength: 0, label: "None", color: "gray" };

  let strength = 0;
  const checks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  strength = Object.values(checks).filter(Boolean).length;

  if (strength <= 2)
    return { strength, label: "Weak", color: "red", percentage: 33 };
  if (strength <= 4)
    return { strength, label: "Medium", color: "yellow", percentage: 66 };
  return { strength, label: "Strong", color: "green", percentage: 100 };
};
