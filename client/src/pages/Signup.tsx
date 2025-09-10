import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { SignupFormData } from '../types';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  name: z.string().min(1, 'Name is required'),
  password: z.string().min(8, 'Password must be at least 8 characters').regex(/[A-Z]/, 'Password must contain at least one uppercase letter'),
  mobileNumber: z.string().regex(/^\d+$/, 'Mobile number must contain only digits').min(10, 'Mobile number must be at least 10 digits'),
  role: z.enum(['entrepreneur', 'investor']),
  companyName: z.string().optional(),
  investmentFocus: z.string().optional(),
}).refine((data) => {
  if (data.role === 'entrepreneur') {
    return data.companyName && data.companyName.length > 0;
  }
  if (data.role === 'investor') {
    return data.investmentFocus && data.investmentFocus.length > 0;
  }
  return true;
}, {
  message: 'Please provide the required field based on your role',
  path: ['companyName'], // or investmentFocus, but since it's conditional, maybe handle in component
});

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const role = watch('role');

  const onSubmit = (data: SignupFormData) => {
    console.log('Signup data:', data);
    
    // Create user object and auto-login
    const newUser = {
      username: data.username,
      name: data.name,
      email: data.email,
      role: data.role,
      mobileNumber: data.mobileNumber,
      companyName: data.companyName,
      investmentFocus: data.investmentFocus
    };
    
    login(newUser);
    navigate('/dashboard');
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem 1rem',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    },
    formContainer: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      padding: '3rem',
      width: '100%',
      maxWidth: '500px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      maxHeight: '90vh',
      overflowY: 'auto' as const
    },
    header: {
      textAlign: 'center' as const,
      marginBottom: '2rem'
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
      gap: '1.25rem'
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
    select: {
      width: '100%',
      padding: '0.875rem 1rem',
      fontSize: '1rem',
      border: '2px solid #e5e7eb',
      borderRadius: '12px',
      outline: 'none',
      transition: 'all 0.2s ease',
      boxSizing: 'border-box' as const,
      backgroundColor: '#ffffff'
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
    roleSelector: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '1rem',
      marginTop: '0.5rem'
    },
    roleOption: {
      padding: '1rem',
      border: '2px solid #e5e7eb',
      borderRadius: '12px',
      textAlign: 'center' as const,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      backgroundColor: '#ffffff'
    },
    roleOptionSelected: {
      borderColor: '#3b82f6',
      backgroundColor: '#eff6ff',
      color: '#3b82f6'
    },
    roleIcon: {
      fontSize: '2rem',
      marginBottom: '0.5rem'
    },
    roleTitle: {
      fontSize: '0.875rem',
      fontWeight: '600',
      margin: 0
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
    loginLink: {
      color: '#3b82f6',
      textDecoration: 'none',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'color 0.2s ease'
    },
    loginLinkHover: {
      color: '#2563eb'
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
          <h2 style={styles.title}>Create Your Account</h2>
          <p style={styles.subtitle}>Join the community and start your journey</p>
        </div>

        <form style={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              style={styles.input}
              placeholder="Enter your full name"
              {...register('name')}
              onFocus={(e) => Object.assign((e.target as HTMLElement).style, styles.inputFocus)}
              onBlur={(e) => {
                (e.target as HTMLElement).style.borderColor = '#e5e7eb';
                (e.target as HTMLElement).style.boxShadow = 'none';
              }}
            />
            {errors.name && <p style={styles.errorMessage}>{errors.name.message}</p>}
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              style={styles.input}
              placeholder="Choose a username"
              {...register('username')}
              onFocus={(e) => Object.assign((e.target as HTMLElement).style, styles.inputFocus)}
              onBlur={(e) => {
                (e.target as HTMLElement).style.borderColor = '#e5e7eb';
                (e.target as HTMLElement).style.boxShadow = 'none';
              }}
            />
            {errors.username && <p style={styles.errorMessage}>{errors.username.message}</p>}
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              style={styles.input}
              placeholder="Enter your email"
              {...register('email')}
              onFocus={(e) => Object.assign((e.target as HTMLElement).style, styles.inputFocus)}
              onBlur={(e) => {
                (e.target as HTMLElement).style.borderColor = '#e5e7eb';
                (e.target as HTMLElement).style.boxShadow = 'none';
              }}
            />
            {errors.email && <p style={styles.errorMessage}>{errors.email.message}</p>}
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              style={styles.input}
              placeholder="Create a strong password"
              {...register('password')}
              onFocus={(e) => Object.assign((e.target as HTMLElement).style, styles.inputFocus)}
              onBlur={(e) => {
                (e.target as HTMLElement).style.borderColor = '#e5e7eb';
                (e.target as HTMLElement).style.boxShadow = 'none';
              }}
            />
            {errors.password && <p style={styles.errorMessage}>{errors.password.message}</p>}
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Mobile Number</label>
            <input
              type="tel"
              style={styles.input}
              placeholder="Enter your mobile number"
              {...register('mobileNumber')}
              onFocus={(e) => Object.assign((e.target as HTMLElement).style, styles.inputFocus)}
              onBlur={(e) => {
                (e.target as HTMLElement).style.borderColor = '#e5e7eb';
                (e.target as HTMLElement).style.boxShadow = 'none';
              }}
            />
            {errors.mobileNumber && <p style={styles.errorMessage}>{errors.mobileNumber.message}</p>}
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>I am a</label>
            <select
              style={styles.select}
              {...register('role')}
              onFocus={(e) => Object.assign((e.target as HTMLElement).style, styles.inputFocus)}
              onBlur={(e) => {
                (e.target as HTMLElement).style.borderColor = '#e5e7eb';
                (e.target as HTMLElement).style.boxShadow = 'none';
              }}
            >
              <option value="">Select your role</option>
              <option value="entrepreneur">🚀 Entrepreneur</option>
              <option value="investor">💼 Investor</option>
            </select>
            {errors.role && <p style={styles.errorMessage}>{errors.role.message}</p>}
          </div>

          {role === 'entrepreneur' && (
            <div style={styles.inputGroup}>
              <label style={styles.label}>Company Name</label>
              <input
                type="text"
                style={styles.input}
                placeholder="Enter your company name"
                {...register('companyName')}
                onFocus={(e) => Object.assign((e.target as HTMLElement).style, styles.inputFocus)}
                onBlur={(e) => {
                  (e.target as HTMLElement).style.borderColor = '#e5e7eb';
                  (e.target as HTMLElement).style.boxShadow = 'none';
                }}
              />
              {errors.companyName && <p style={styles.errorMessage}>{errors.companyName.message}</p>}
            </div>
          )}

          {role === 'investor' && (
            <div style={styles.inputGroup}>
              <label style={styles.label}>Investment Focus</label>
              <input
                type="text"
                style={styles.input}
                placeholder="e.g. FinTech, HealthTech, AI"
                {...register('investmentFocus')}
                onFocus={(e) => Object.assign((e.target as HTMLElement).style, styles.inputFocus)}
                onBlur={(e) => {
                  (e.target as HTMLElement).style.borderColor = '#e5e7eb';
                  (e.target as HTMLElement).style.boxShadow = 'none';
                }}
              />
              {errors.investmentFocus && <p style={styles.errorMessage}>{errors.investmentFocus.message}</p>}
            </div>
          )}

          <button
            type="submit"
            style={styles.submitButton}
            onMouseEnter={(e) => Object.assign((e.target as HTMLElement).style, styles.submitButtonHover)}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.transform = 'translateY(0)';
              (e.target as HTMLElement).style.boxShadow = 'none';
            }}
          >
            Create Account
          </button>
        </form>

        <div style={styles.footer}>
          <p style={styles.footerText}>Already have an account?</p>
          <a
            style={styles.loginLink}
            onClick={() => navigate('/login')}
            onMouseEnter={(e) => (e.target as HTMLElement).style.color = styles.loginLinkHover.color}
            onMouseLeave={(e) => (e.target as HTMLElement).style.color = styles.loginLink.color}
          >
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
