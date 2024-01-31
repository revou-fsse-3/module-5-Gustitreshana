import "@testing-library/jest-dom"
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import LoginPage from '.';
import fetchMock, { FetchMock } from 'jest-fetch-mock';

fetchMock.enableMocks();
const mockOnSubmit = jest.fn();

describe('LoginPage', () => {

  it('renders correctly', () => {

    render(<LoginPage onSubmit={mockOnSubmit}/>)

    const emailInput = screen.getByPlaceholderText("email")
    expect(emailInput).toBeDefined();

    const passInput = screen.getByPlaceholderText("password")
    expect(passInput).toBeDefined();

    const buttonLogin = screen.getByText("Login now!")
  });
  
  it('handles form submission', async () => {
    
    (fetch as FetchMock).mockResponseOnce(JSON.stringify({ success: true }));
    render(<LoginPage onSubmit={mockOnSubmit}/>)
  
    const emailInput = screen.getByPlaceholderText("email");
    const passInput = screen.getByPlaceholderText("password")
    const buttonLogin = screen.getByText("Login now!")

    fireEvent.change(emailInput, {target: {value: "gusti@gmail.com"}});
    fireEvent.change(passInput, {target: {value: "Test1234"}});
    fireEvent.click(buttonLogin);


    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
    });
      
      expect(mockOnSubmit).toHaveBeenCalledWith({
        email: 'gusti@gmail.com',
        password: 'Test1234',
    });
  });
});
