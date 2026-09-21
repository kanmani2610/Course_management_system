const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[6-9]\d{9}$/;

const email = (v) => {
  if (!v.trim()) return 'Email is required';
  if (!EMAIL_RE.test(v.trim())) return 'Enter a valid email address';
  return '';
};

const loginRules = {
  email,
  password: (v) => {
    if (!v) return 'Password is required';
    if (v.length < 6) return 'Password must be at least 6 characters';
    return '';
  }
};

const registerRules = {
  name: (v) => {
    if (!v.trim()) return 'Full name is required';
    if (v.trim().length < 3) return 'Name must be at least 3 characters';
    return '';
  },
  email,
  phone: (v) => {
    if (!v.trim()) return 'Phone number is required';
    if (!PHONE_RE.test(v.trim())) return 'Enter a valid 10-digit mobile number';
    return '';
  },
  department: (v) => (v ? '' : 'Please select your department'),
  year: (v) => (v ? '' : 'Please select your year of study'),
  password: (v) => {
    if (!v) return 'Password is required';
    if (v.length < 8) return 'Password must be at least 8 characters';
    if (!/[A-Za-z]/.test(v) || !/\d/.test(v)) return 'Use both letters and numbers';
    return '';
  },
  confirmPassword: (v, all) => {
    if (!v) return 'Please confirm your password';
    if (v !== all.password) return 'Passwords do not match';
    return '';
  }
};

const ruleSets = { login: loginRules, register: registerRules };

export const validateField = (mode, name, value, values = {}) => {
  const rule = ruleSets[mode][name];
  return rule ? rule(value ?? '', values) : '';
};

export const validateForm = (mode, values) => {
  const errors = {};
  Object.keys(ruleSets[mode]).forEach((name) => {
    const message = validateField(mode, name, values[name], values);
    if (message) errors[name] = message;
  });
  return errors;
};
