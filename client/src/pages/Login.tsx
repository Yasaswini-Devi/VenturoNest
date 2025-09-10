import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { LoginFormData } from '../types';
import { useUser } from '../context/UserContext';

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(8, 'Password must be at least 8 characters').regex(/[A-Z]/, 'Password must contain at least one uppercase letter'),
});

const Login = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log('Login data:', data);
    
    // Mock user data - in a real app, this would come from your backend
    const mockUser = {
      username: data.username,
      name: data.username,
      email: `${data.username}@example.com`,
      role: data.username.includes('investor') ? 'investor' as const : 'entrepreneur' as const,
    };
    
    login(mockUser);
    navigate('/dashboard');
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '1rem',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    },
    formContainer: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      padding: '3rem',
      width: '100%',
      maxWidth: '450px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },
    header: {
      textAlign: 'center' as const,
      marginBottom: '2.5rem'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.75rem',
      marginBottom: '1.5rem'
    },
    logoIcon: {
      width: '48px',
      height: '48px',
      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#ffffff',
      fontSize: '1.5rem',
      fontWeight: '700'
    },
    logoText: {
      fontSize: '1.75rem',
      fontWeight: '700',
      color: '#1e293b',
      margin: 0
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#1e293b',
      margin: '0 0 0.5rem 0'
    },
    subtitle: {
      fontSize: '1rem',
      color: '#64748b',
      margin: 0
    },
    form: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '1.5rem'
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '0.5rem'
    },
    label: {
      fontSize: '0.875rem',
      fontWeight: '600',
      color: '#374151',
      margin: 0
    },
    input: {
      width: '100%',
      padding: '0.875rem 1rem',
      fontSize: '1rem',
      border: '2px solid #e5e7eb',
      borderRadius: '12px',
      outline: 'none',
      transition: 'all 0.2s ease',
      boxSizing: 'border-box' as const
    },
    inputFocus: {
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
    },
    errorMessage: {
      color: '#ef4444',
      fontSize: '0.875rem',
      margin: '0.25rem 0 0 0'
    },
    submitButton: {
      width: '100%',
      padding: '1rem',
      fontSize: '1rem',
      fontWeight: '600',
      color: '#ffffff',
      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      marginTop: '1rem'
    },
    submitButtonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 10px 20px rgba(59, 130, 246, 0.3)'
    },
    footer: {
      textAlign: 'center' as const,
      marginTop: '2rem',
      paddingTop: '1.5rem',
      borderTop: '1px solid #e5e7eb'
    },
    footerText: {
      fontSize: '0.875rem',
      color: '#64748b',
      margin: '0 0 0.75rem 0'
    },
    signupLink: {
      color: '#3b82f6',
      textDecoration: 'none',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'color 0.2s ease'
    },
    signupLinkHover: {
      color: '#2563eb'
    },
    demoCredentials: {
      background: '#f8fafc',
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      padding: '1rem',
      marginBottom: '1.5rem'
    },
    demoTitle: {
      fontSize: '0.875rem',
      fontWeight: '600',
      color: '#374151',
      margin: '0 0 0.5rem 0'
    },
    demoItem: {
      fontSize: '0.75rem',
      color: '#64748b',
      margin: '0.25rem 0',
      fontFamily: 'monospace'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <div style={styles.header}>
          <div style={styles.logo}>
            <div style={styles.logoIcon}>V</div>
            <h1 style={styles.logoText}>VenturoNest</h1>
          </div>
          <h2 style={styles.title}>Welcome Back</h2>
          <p style={styles.subtitle}>Sign in to your account to continue</p>
        </div>

        <form style={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              style={styles.input}
              placeholder="Enter your username"
              {...register('username')}
              onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.boxShadow = 'none';
              }}
            />
            {errors.username && <p style={styles.errorMessage}>{errors.username.message}</p>}
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              style={styles.input}
              placeholder="Enter your password"
              {...register('password')}
              onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.boxShadow = 'none';
              }}
            />
            {errors.password && <p style={styles.errorMessage}>{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            style={styles.submitButton}
            onMouseEnter={(e) => Object.assign((e.target as HTMLElement).style, styles.submitButtonHover)}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.transform = 'translateY(0)';
              (e.target as HTMLElement).style.boxShadow = 'none';
            }}
          >
            Sign In
          </button>
        </form>

        <div style={styles.footer}>
          <p style={styles.footerText}>Don't have an account?</p>
          <a
            style={styles.signupLink}
            onClick={() => navigate('/signup')}
            onMouseEnter={(e) => (e.target as HTMLElement).style.color = styles.signupLinkHover.color}
            onMouseLeave={(e) => (e.target as HTMLElement).style.color = styles.signupLink.color}
          >
            Create Account
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
