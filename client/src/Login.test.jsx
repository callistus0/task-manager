import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // ✅ import jest-dom
import Login from './Login'; // ✅ correct the import

describe('Login Component', () => {
  it('renders email and password inputs', () => {
    render(<Login onLogin={() => {}} toggleForm={() => {}} />);

    const emailInput = screen.getByPlaceholderText(/email address/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });
});
