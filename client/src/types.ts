export interface LoginFormData {
  username: string;
  password: string;
}

export interface SignupFormData {
  email: string;
  username: string;
  name: string;
  password: string;
  mobileNumber: string;
  role: 'entrepreneur' | 'investor';
  companyName?: string;
  investmentFocus?: string;
}
