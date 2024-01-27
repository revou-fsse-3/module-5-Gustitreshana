import '@testing-library/jest-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import RegisterPage from '.';
import fetchMock, { FetchMock } from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('RegisterPage', () => {

    it('renders correctly', () => {
        const { getByLabelText, getByTestId } = render(<RegisterPage />);
        
        expect(getByLabelText('Name')).toBeInTheDocument();
        expect(getByLabelText('Email')).toBeInTheDocument();
        expect(getByLabelText('Password')).toBeInTheDocument();
        
        expect(getByTestId('register-button')).toBeInTheDocument();
    });
    
    it('handles form submission', async () => {
    
    (fetch as FetchMock).mockResponseOnce(JSON.stringify({ success: true }));
    const { getByLabelText, getByTestId } = render(<RegisterPage />);

    fireEvent.change(getByLabelText('Name'), { target: { value: 'Gusti' } });
    fireEvent.change(getByLabelText('Email'), { target: { value: 'gusti@gmail.com' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'Test1234' } });
    fireEvent.click(getByTestId('register-button'));

    await waitFor(() => {
        fireEvent.click(getByTestId('register-button'));
      });
  });
});
