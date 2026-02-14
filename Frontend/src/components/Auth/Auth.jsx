import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  signUpWithEmail,
  signInWithEmail,
  signInWithGoogle as googleSignIn
} from '../../services/authService';
import './Auth.css';

const Auth = () => {
  const [activeTab, setActiveTab] = useState('signup');
  const [showPassword, setShowPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Get redirect URL from query params
  const params = new URLSearchParams(location.search);
  const redirectUrl = params.get('redirect') || '/';

  const switchTab = (tab) => {
    setActiveTab(tab);
    setError('');
    setSuccessMessage('');
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    const formData = new FormData(e.target);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const password = formData.get('password');
    const role = formData.get('role') || 'user';

    const result = await signUpWithEmail(
      email,
      password,
      `${firstName} ${lastName}`,
      role
    );

    if (result.success) {
      // Clear the form
      e.target.reset();
      // Switch to signin tab with success message
      setSuccessMessage(result.message || 'Account created! Please login to continue.');
      setActiveTab('signin');
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    const result = await signInWithEmail(email, password);

    if (result.success) {
      // Redirect based on user role
      const userRole = result.user.role || 'User';
      if (redirectUrl && redirectUrl !== '/') {
        navigate(redirectUrl);
      } else {
        navigate(`/dashboard/${userRole.toLowerCase()}`);
      }
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    setSuccessMessage('');

    const result = await googleSignIn();

    if (result.success) {
      // Redirect based on user role
      const userRole = result.user.role || 'User';
      if (redirectUrl && redirectUrl !== '/') {
        navigate(redirectUrl);
      } else {
        navigate(`/dashboard/${userRole.toLowerCase()}`);
      }
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  const closeModal = () => {
    navigate('/');
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <button className="auth-close" onClick={closeModal} aria-label="Close">
          ×
        </button>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${activeTab === 'signup' ? 'active' : ''}`}
            onClick={() => switchTab('signup')}
          >
            Sign up
          </button>
          <button
            className={`auth-tab ${activeTab === 'signin' ? 'active' : ''}`}
            onClick={() => switchTab('signin')}
          >
            Sign in
          </button>
        </div>

        <div className={`auth-form ${activeTab === 'signup' ? 'active' : ''}`}>
          <h1 className="auth-title">Create an account</h1>
          {error && <p className="auth-error">{error}</p>}

          <form onSubmit={handleSignUp}>
            <div className="auth-input-row">
              <div className="auth-input-group">
                <div className="auth-input">
                  <input type="text" name="firstName" placeholder="John" required />
                </div>
              </div>
              <div className="auth-input-group">
                <div className="auth-input">
                  <input type="text" name="lastName" placeholder="Last name" required />
                </div>
              </div>
            </div>

            <div className="auth-input" style={{ marginBottom: '16px' }}>
              <div className="auth-input inline">
                <span>✉</span>
                <input type="email" name="email" placeholder="Enter your email" required />
              </div>
            </div>

            <div className="auth-input">
              <div className="auth-input inline">
                <input
                  type={showSignupPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  required
                />
                <span className="auth-eye" onClick={() => setShowSignupPassword(!showSignupPassword)}>
                  👁️
                </span>
              </div>
            </div>

            <div className="auth-input" style={{ marginBottom: '16px' }}>
              <div className="auth-input inline">
                <span>👤</span>
                <select name="role" required style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent', fontSize: '14px', color: '#333' }}>
                  <option value="user">User</option>
                  <option value="employee">Employee</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            <button type="submit" className="auth-primary" disabled={loading}>
              {loading ? 'Creating account...' : 'Create an account'}
            </button>
          </form>

          <div className="auth-divider">OR SIGN IN WITH</div>

          <button className="auth-social" onClick={handleGoogleSignIn} disabled={loading}>
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign in with Google
          </button>

          <div className="auth-terms">
            By creating an account, you agree to our <a href="#">Terms & Service</a>
          </div>
        </div>

        <div className={`auth-form ${activeTab === 'signin' ? 'active' : ''}`}>
          <h1 className="auth-title">Welcome back</h1>
          {successMessage && <p className="auth-success">{successMessage}</p>}
          {error && <p className="auth-error">{error}</p>}

          <form onSubmit={handleSignIn}>
            <div className="auth-input" style={{ marginBottom: '16px' }}>
              <div className="auth-input inline">
                <span>✉</span>
                <input type="email" name="email" placeholder="Enter your email" required />
              </div>
            </div>

            <div className="auth-input">
              <div className="auth-input inline">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  required
                />
                <span className="auth-eye" onClick={() => setShowPassword(!showPassword)}>
                  👁️
                </span>
              </div>
            </div>

            <div className="auth-forgot">
              <a href="#">Forgot password?</a>
            </div>

            <button type="submit" className="auth-primary" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="auth-divider">OR SIGN IN WITH</div>

          <button className="auth-social" onClick={handleGoogleSignIn} disabled={loading}>
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign in with Google
          </button>

          <div className="auth-terms">
            By signing in, you agree to our <a href="#">Terms & Service</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
