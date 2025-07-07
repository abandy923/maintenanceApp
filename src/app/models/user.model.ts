export interface User {
  uid: string;
  email: string;
  role: 'technician' | 'operator' | 'manager';
}