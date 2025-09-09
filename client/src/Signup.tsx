import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { SignupFormData } from './types';
import { useNavigate } from 'react-router-dom';

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
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const role = watch('role');

  const onSubmit = (data: SignupFormData) => {
    console.log('Signup data:', data);
    // Here you can send to backend
    navigate('/login');
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email:</label>
          <input type="email" {...register('email')} />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </div>
        <div>
          <label>Username:</label>
          <input type="text" {...register('username')} />
          {errors.username && <p className="error-message">{errors.username.message}</p>}
        </div>
        <div>
          <label>Name:</label>
          <input type="text" {...register('name')} />
          {errors.name && <p className="error-message">{errors.name.message}</p>}
        </div>
        <div>
          <label>Password:</label>
          <input type="password" {...register('password')} />
          {errors.password && <p className="error-message">{errors.password.message}</p>}
        </div>
        <div>
          <label>Mobile Number:</label>
          <input type="text" {...register('mobileNumber')} />
          {errors.mobileNumber && <p className="error-message">{errors.mobileNumber.message}</p>}
        </div>
        <div>
          <label>Role:</label>
          <select {...register('role')}>
            <option value="">Select Role</option>
            <option value="entrepreneur">Entrepreneur</option>
            <option value="investor">Investor</option>
          </select>
          {errors.role && <p className="error-message">{errors.role.message}</p>}
        </div>
        {role === 'entrepreneur' && (
          <div>
            <label>Company Name:</label>
            <input type="text" {...register('companyName')} />
            {errors.companyName && <p className="error-message">{errors.companyName.message}</p>}
          </div>
        )}
        {role === 'investor' && (
          <div>
            <label>Investment Focus:</label>
            <input type="text" {...register('investmentFocus')} />
            {errors.investmentFocus && <p className="error-message">{errors.investmentFocus.message}</p>}
          </div>
        )}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
