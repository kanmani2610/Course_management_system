import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormField from '../components/FormField';
import Alert from '../components/Alert';
import useForm from '../hooks/useForm';
import { validateRegister } from '../utils/validation';
import { registerUser } from '../utils/auth';

const departments = ['Computer Science', 'Information Technology', 'Electronics', 'Mechanical', 'Civil', 'Business'];
const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

export default function Register() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const { values, isValid, touchAll, getFieldProps } = useForm(
    { name: '', email: '', phone: '', department: '', year: '', password: '', confirmPassword: '' },
    validateRegister
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    setAlert(null);
    touchAll();

    if (!isValid) {
      setAlert({ type: 'error', message: 'Please fix the highlighted fields and try again.' });
      return;
    }

    setLoading(true);
    try {
      await registerUser(values);
      setAlert({ type: 'success', message: 'Registration successful! Redirecting to login...' });
      setTimeout(() => navigate('/login'), 900);
    } catch (error) {
      setAlert({ type: 'error', message: error.message });
      setLoading(false);
    }
  };

  return (
    <main className="form-page">
      <section className="form-card wide">
        <h1>Create Your Account</h1>
        <p className="sub">Fill in your student details to get started.</p>
        <form onSubmit={handleSubmit} noValidate>
          <Alert alert={alert} />
          <div className="form-row">
            <FormField label="Full Name" placeholder="Your full name" autoComplete="name" {...getFieldProps('name')} />
            <FormField label="Email" type="email" placeholder="you@example.com" autoComplete="email" {...getFieldProps('email')} />
          </div>
          <div className="form-row">
            <FormField label="Phone Number" type="tel" placeholder="10-digit mobile number" autoComplete="tel" {...getFieldProps('phone')} />
            <FormField label="Department" options={departments} {...getFieldProps('department')} />
          </div>
          <FormField label="Year of Study" options={years} {...getFieldProps('year')} />
          <div className="form-row">
            <FormField label="Password" type="password" placeholder="Min 8 chars, letters and numbers" autoComplete="new-password" {...getFieldProps('password')} />
            <FormField label="Confirm Password" type="password" placeholder="Re-enter password" autoComplete="new-password" {...getFieldProps('confirmPassword')} />
          </div>
          <button type="submit" className="btn btn-block" disabled={loading}>
            {loading ? 'Please wait...' : 'Register'}
          </button>
        </form>
        <p className="form-footer">Already registered? <Link to="/login">Login here</Link></p>
      </section>
    </main>
  );
}
