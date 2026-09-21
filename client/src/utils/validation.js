const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[6-9]\d{9}$/;

const emailRule = (v) => {
  if (!v.trim()) return 'Email is required';
  if (!EMAIL_RE.test(v.trim())) return 'Enter a valid email address';
  return '';
};

const collect = (rules, values) => {
  const errors = {};
  Object.keys(rules).forEach((name) => {
    const message = rules[name](values[name] ?? '', values);
    if (message) errors[name] = message;
  });
  return errors;
};

export const validateLogin = (values) =>
  collect(
    {
      email: emailRule,
      password: (v) => {
        if (!v) return 'Password is required';
        if (v.length < 6) return 'Password must be at least 6 characters';
        return '';
      }
    },
    values
  );

export const validateRegister = (values) =>
  collect(
    {
      name: (v) => {
        if (!v.trim()) return 'Full name is required';
        if (v.trim().length < 3) return 'Name must be at least 3 characters';
        return '';
      },
      email: emailRule,
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
    },
    values
  );
