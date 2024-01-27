import { render, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '.';

describe('LoginPage', () => {
  it('submits the form', async () => {
    const mockOnSubmit = jest.fn();
    const { getByLabelText, getByText } = render(<LoginPage onSubmit={mockOnSubmit} />);

    fireEvent.change(getByLabelText('Email'), { target: { value: 'test@email.com' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'Test@1234' } });
    fireEvent.click(getByText('Login now!'));

    await waitFor(() => expect(mockOnSubmit).toHaveBeenCalled());

    expect(mockOnSubmit).toHaveBeenCalledWith({
      email: 'gusti@gmail.com',
      password: 'Test1234',
    });
  });
});
