export interface SignupPageProps {
  onSwitchToLogin: () => void;
}
export interface LoginPageProps {
  onSwitchToSignup: () => void;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}
export interface Task {
  _id: string;
  title: string;
  description: string;
  assignedTo: User;
  createdBy: User;
  dueDate: string;
  status: string;
  priority: string;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  _id: string;
  userId: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
  __v: 0;
}
