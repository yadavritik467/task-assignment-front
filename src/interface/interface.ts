export interface SignupPageProps {
  onSwitchToLogin: () => void;
}
export interface LoginPageProps {
  onSwitchToSignup: () => void;
}

export interface User {
  id: string;
  name: string;
  email: string;
}
