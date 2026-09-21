import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormField from '../components/FormField';
import Alert from '../components/Alert';
import useForm from '../hooks/useForm';
import { validateLogin } from '../utils/validation';
import { loginUser } from '../utils/auth';

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const { values, isValid, touchAll, getFieldProps } = useForm(
    { email: '', password: '' },
    validateLogin
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
      const user = await loginUser(values.email, values.password);
      onLogin(user);
      navigate('/dashboard');
    } catch (error) {
      setAlert({ type: 'error', message: error.message });
      setLoading(false);
    }
  };

  return (
    <main className="form-page">
      <section className="form-card">
        <h1>Welcome Back</h1>
        <p className="sub">Login to access your student dashboard.</p>
        <form onSubmit={handleSubmit} noValidate>
          <Alert alert={alert} />
          <FormField label="Email" type="email" placeholder="you@example.com" autoComplete="email" {...getFieldProps('email')} />
          <FormField label="Password" type="password" placeholder="Enter your password" autoComplete="current-password" {...getFieldProps('password')} />
          <button type="submit" className="btn btn-block" disabled={loading}>
            {loading ? 'Please wait...' : 'Login'}
          </button>
        </form>
        <p className="form-footer">New here? <Link to="/register">Create an account</Link></p>
      </section>
    </main>
  );
}
